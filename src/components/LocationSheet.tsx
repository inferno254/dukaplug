'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import { useAppContext } from '@/context/AppContext';

interface DeliveryLocation {
  name: string;
  detail: string;
}

interface LocationSheetProps {
  current: DeliveryLocation;
  close: () => void;
  select: (location: DeliveryLocation) => void;
}

export default function LocationSheet({ current, close, select }: LocationSheetProps) {
  const [query, setQuery] = useState("");
  const [detecting, setDetecting] = useState(false);
  const [error, setError] = useState("");
  const { deliveryAreas } = useAppContext();
  
  const results = deliveryAreas.filter((area) => 
    `${area.name} ${area.detail}`.toLowerCase().includes(query.toLowerCase())
  );

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError("Location is not supported on this device.");
      return;
    }
    setDetecting(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      () => {
        setDetecting(false);
        select({ 
          name: "Current location", 
          detail: "Pinned from your device · Rongai area" 
        });
      },
      () => {
        setDetecting(false);
        setError("We couldn't access your location. Check permission or choose an area below.");
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  return (
    <div className="sheet-backdrop location-backdrop" onClick={close}>
      <section className="location-sheet" onClick={(event) => event.stopPropagation()}>
        <div className="location-handle" />
        <button className="sheet-close" onClick={close}>×</button>
        <span className="kicker">DELIVERY LOCATION</span>
        <h2>Where are you?</h2>
        <p>We’ll show shops that can reach you fast.</p>
        
        <div className="location-search">
          <Icon name="search" />
          <input 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="Search area, estate or landmark" 
            autoFocus 
          />
        </div>
        
        <button 
          className="detect-button" 
          onClick={detectLocation} 
          disabled={detecting}
        >
          <span><Icon name="pin" /></span>
          <div>
            <b>{detecting ? "Finding your location..." : "Use my current location"}</b>
            <small>Allow precise location for a better ETA</small>
          </div>
          {detecting ? <i className="mini-loader" /> : <Icon name="chevron" />}
        </button>
        
        {error && <div className="location-error">{error}</div>}
        
        <div className="location-current">
          <span>DELIVERING HERE</span>
          <b>{current.name}</b>
          <small>{current.detail}</small>
          <i><Icon name="check" size={15} /> In our delivery zone</i>
        </div>
        
        <div className="location-list-head">
          <b>{query ? "Search results" : "Saved & nearby"}</b>
          <small>{results.length} areas</small>
        </div>
        
        <div className="location-list">
          {results.map((area, index) => (
            <button 
              key={area.name} 
              onClick={() => select(area)}
            >
              <span className={index < 2 && !query ? "saved" : ""}>
                <Icon 
                  name={index === 0 && !query ? "home" : "pin"} 
                />
              </span>
              <div>
                <b>{area.name}</b>
                <small>{area.detail}</small>
              </div>
              <Icon name="chevron" />
            </button>
          ))}
          
          {results.length === 0 && (
            <div className="location-empty">
              <Icon name="pin" size={30} />
              <b>We couldn’t find that area</b>
              <small>Try a nearby landmark or estate name.</small>
            </div>
          )}
        </div>
        
        <div className="location-map-mini">
          <div className="mini-road one" />
          <div className="mini-road two" />
          <span><Icon name="pin" /></span>
          <p>
            <b>Smart delivery radius</b>
            <small>Location helps us calculate accurate fees and ETAs.</small>
          </p>
        </div>
      </section>
    </div>
  );
}