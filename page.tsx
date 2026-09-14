"use client";

import { useMemo, useState } from "react";

const services = [
  { id: "website", number: "01", title: "Websites", text: "A clear, credible home for your business, idea or community.", tag: "Digital presence" },
  { id: "brand", number: "02", title: "Brand & design", text: "A visual identity that helps people recognise and remember you.", tag: "Make it memorable" },
  { id: "campaign", number: "03", title: "Campaigns", text: "Focused creative support for launches, events and growth.", tag: "Move people" },
  { id: "support", number: "04", title: "Ongoing support", text: "A reliable partner to improve, update and keep things moving.", tag: "Stay current" },
];

export default function Home() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const chosen = useMemo(() => services.filter((service) => selected.includes(service.id)), [selected]);

  function toggleService(id: string) {
    setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <main>
      <nav className="nav wrap">
        <a className="brand" href="#top" aria-label="BridgeX Studio home"><span>Bridge</span><i>X</i> <small>STUDIO</small></a>
        <div className="nav-links"><a href="#services">Services</a><a href="#work">Selected work</a><a className="nav-cta" href="#start">Start a project <span>↗</span></a></div>
      </nav>

      <section className="hero wrap" id="top">
        <div className="eyebrow"><span className="eyebrow-dot" /> BridgeX Studio / project desk</div>
        <h1>Good work<br /><em>starts with clarity.</em></h1>
        <div className="hero-bottom"><p>Choose the kind of support you need. We&apos;ll help shape the right scope, then come back with a thoughtful quote.</p><a className="circle-arrow" href="#services" aria-label="Explore services">↓</a></div>
      </section>

      <section className="services-section" id="services">
        <div className="wrap section-head"><div><span className="kicker">01 / Find your starting point</span><h2>What are you building?</h2></div><p>Select one or more areas. Every project starts with a conversation, not a fixed package.</p></div>
        <div className="service-grid wrap">
          {services.map((service) => {
            const active = selected.includes(service.id);
            return <button key={service.id} className={`service-card ${active ? "active" : ""}`} onClick={() => toggleService(service.id)} aria-pressed={active}>
              <div className="card-top"><span>{service.number}</span><span className="card-check">{active ? "✓" : "+"}</span></div><span className="service-tag">{service.tag}</span><h3>{service.title}</h3><p>{service.text}</p><span className="card-link">{active ? "Selected" : "Add to brief"} <b>↗</b></span>
            </button>;
          })}
        </div>
      </section>

      <section className="brief-section wrap" id="start">
        <div className="brief-copy"><span className="kicker">02 / Shape the brief</span><h2>Your next step,<br /><em>made simple.</em></h2><p>Tell us what caught your attention. Prices are currently prepared case by case, so you get a quote that fits the real work.</p></div>
        <div className="brief-panel"><div className="panel-label">Your starting brief</div>{chosen.length === 0 ? <div className="empty-state">Your selected services will appear here.<br /><span>Start by choosing a service above.</span></div> : <div className="chosen-list">{chosen.map((service) => <div className="chosen-row" key={service.id}><span>{service.title}</span><small>待报价</small></div>)}</div>}<button className="primary-button" onClick={() => setShowForm(true)} disabled={chosen.length === 0}>Continue with this brief <span>→</span></button><div className="panel-note">No commitment. We&apos;ll review your needs before preparing a quote.</div></div>
      </section>

      <section className="work-section" id="work"><div className="wrap work-inner"><div><span className="kicker">03 / Selected work</span><h2>Proof over promises.</h2></div><p>Successful projects will live here — a growing library of thoughtful work, practical outcomes and lessons learned.</p><div className="work-placeholder"><span>Case studies<br />coming soon</span><b>↗</b></div></div></section>

      <footer className="footer wrap"><a className="brand" href="#top"><span>Bridge</span><i>X</i> <small>STUDIO</small></a><p>Make something useful.</p><span>© 2026 BridgeX Studio</span></footer>

      {showForm && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Start your project"><div className="modal"><button className="modal-close" onClick={() => setShowForm(false)} aria-label="Close">×</button><span className="kicker">Start a project</span><h2>Tell us a little<br /><em>about your idea.</em></h2><p>We&apos;ll use your brief to prepare the next conversation. This preview does not submit anything yet.</p><label>Your name<input placeholder="How should we address you?" /></label><label>What are you hoping to build?<textarea placeholder="A few words is enough for now." /></label><button className="primary-button" onClick={() => setShowForm(false)}>Save preview brief <span>→</span></button></div></div>}
    </main>
  );
}
