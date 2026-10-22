// src/components/AiAssistant.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import { useAppContext } from '@/context/AppContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Sasa! 👋 I am your DukaPlug Assistant. Need help finding a meal, fresh groceries, or tracking an order?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { location, cartCount } = useAppContext();

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          context: { location: location.name, cartCount },
        }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply || 'Pole, I ran into an error.' }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-assistant-wrapper">
      {!isOpen ? (
        <button
          className="ai-fab"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Assistant"
        >
          <span className="ai-fab-icon">🤖</span>
          <span className="ai-fab-text">Ask AI</span>
        </button>
      ) : (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <div className="ai-header-title">
              <span className="ai-avatar">🤖</span>
              <div>
                <b>DukaPlug AI</b>
                <small>Online · Ready to help</small>
              </div>
            </div>
            <button className="ai-close" onClick={() => setIsOpen(false)} aria-label="Close assistant">
              ✕
            </button>
          </div>

          <div className="ai-chat-body">
            {messages.map((m, idx) => (
              <div key={idx} className={`ai-bubble ${m.role}`}>
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="ai-bubble assistant typing">
                <span>.</span><span>.</span><span>.</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="ai-chat-footer">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about food, groceries..."
              disabled={loading}
              aria-label="Message assistant"
            />
            <button type="submit" disabled={loading || !input.trim()}>
              <Icon name="arrow" size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}