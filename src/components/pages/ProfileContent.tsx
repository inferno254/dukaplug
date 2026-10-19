'use client';

import { useAppContext } from '@/context/AppContext';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';

export default function ProfileContent({ go }: { go: (p: string) => void }) {
  return (
    <main className="profile-page">
      <section className="profile-card">
        <div className="profile-avatar">AM</div>
        <div>
          <span className="kicker">KARIBU BACK</span>
          <h1>Amina M.</h1>
          <p>+254 712 345 678</p>
        </div>
        <button>Edit profile</button>
      </section>
      <div className="profile-grid">
        <section>
          <h2>Your DukaPlug</h2>
          {[
            ["pin", "Saved addresses", "Home, Campus"],
            ["receipt", "Order history", "12 tasty orders"],
            ["heart", "Favourite shops", "6 saved spots"],
          ].map(([icon, title, copy]) => (
            <button key={title} className="profile-link">
              <span><Icon name={icon} /></span>
              <div>
                <b>{title}</b>
                <small>{copy}</small>
              </div>
              <Icon name="chevron" />
            </button>
          ))}
        </section>
        <section className="recent-orders">
          <h2>Recent order</h2>
          <div className="recent-card">
            <img src="https://images.unsplash.com/photo-1726177974666-88e937fa8e59?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200" alt="" />
            <div>
              <span className="delivered">Delivered</span>
              <h3>Mama Njeri's Kitchen</h3>
              <p>2 items · KES 860</p>
              <small>Saturday, 12:58 PM</small>
              <Button variant="ghost" onClick={() => go('/shop')}>
                Order again
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}