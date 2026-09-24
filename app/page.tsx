"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// Pricing stays "待报价" until Tony approves real pricing rules (see AGENTS.md).
// To publish prices, replace `price` / `unit` on each service below — nothing else needs to change.
const QUOTE_PENDING = "待报价";

const services = [
  {
    id: "website",
    number: "01",
    title: "Websites",
    text: "A clear, credible home for your business, idea or community.",
    tag: "Digital presence",
    price: QUOTE_PENDING,
    unit: "per project",
    timeline: "Typically 2–6 weeks",
    includes: ["Structure & copy guidance", "Responsive design & build", "Launch support"],
  },
  {
    id: "brand",
    number: "02",
    title: "Brand & design",
    text: "A visual identity that helps people recognise and remember you.",
    tag: "Make it memorable",
    price: QUOTE_PENDING,
    unit: "per project",
    timeline: "Typically 2–4 weeks",
    includes: ["Logo & visual direction", "Colour & type system", "Core brand assets"],
  },
  {
    id: "campaign",
    number: "03",
    title: "Campaigns",
    text: "Focused creative support for launches, events and growth.",
    tag: "Move people",
    price: QUOTE_PENDING,
    unit: "per campaign",
    timeline: "Scoped to your launch date",
    includes: ["Campaign concept", "Key visuals & assets", "Channel-ready formats"],
  },
  {
    id: "support",
    number: "04",
    title: "Ongoing support",
    text: "A reliable partner to improve, update and keep things moving.",
    tag: "Stay current",
    price: QUOTE_PENDING,
    unit: "per month",
    timeline: "Monthly, flexible",
    includes: ["Updates & improvements", "Priority requests", "Monthly check-in"],
  },
];

function isPending(price: string) {
  return price === QUOTE_PENDING;
}

export default function Home() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [idea, setIdea] = useState("");
  const [copied, setCopied] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const chosen = useMemo(() => services.filter((service) => selected.includes(service.id)), [selected]);

  function toggleService(id: string) {
    setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function closeForm() {
    setShowForm(false);
    setCopied(false);
  }

  useEffect(() => {
    if (!showForm) return;
    firstFieldRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowForm(false);
        setCopied(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [showForm]);

  function briefText() {
    return [
      "BridgeX Studio — project brief",
      name && `Name: ${name}`,
      `Services: ${chosen.map((service) => `${service.title} (${service.price})`).join(", ")}`,
      idea && `Idea: ${idea}`,
    ].filter(Boolean).join("\n");
  }

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(briefText());
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main>
      <nav className="nav wrap" aria-label="Main">
        <a className="brand" href="#top" aria-label="BridgeX Studio home"><span>Bridge</span><i>X</i> <small>STUDIO</small></a>
        <div className="nav-links"><a href="#services">Services</a><a href="#pricing">Pricing</a><a href="#work">Selected work</a><a className="nav-cta" href="#start">Start a project <span aria-hidden="true">↗</span></a></div>
      </nav>

      <section className="hero wrap" id="top">
        <div className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" /> BridgeX Studio / project desk</div>
        <h1>Good work<br /><em>starts with clarity.</em></h1>
        <div className="hero-bottom"><p>Choose the kind of support you need. We&apos;ll help shape the right scope, then come back with a clear, written quote.</p><a className="circle-arrow" href="#services" aria-label="Explore services">↓</a></div>
      </section>

      <section className="services-section" id="services">
        <div className="wrap section-head"><div><span className="kicker">01 / Find your starting point</span><h2>What are you building?</h2></div><p>Select one or more areas. Every project starts with a conversation, not a fixed package.</p></div>
        <div className="service-grid wrap">
          {services.map((service) => {
            const active = selected.includes(service.id);
            return <button type="button" key={service.id} className={`service-card ${active ? "active" : ""}`} onClick={() => toggleService(service.id)} aria-pressed={active}>
              <span className="card-top"><span>{service.number}</span><span className="card-check" aria-hidden="true">{active ? "✓" : "+"}</span></span>
              <span className="service-tag">{service.tag}</span>
              <span className="card-title">{service.title}</span>
              <span className="card-text">{service.text}</span>
              <span className="card-link">{active ? "Selected" : "Add to brief"} <b aria-hidden="true">↗</b></span>
            </button>;
          })}
        </div>
      </section>

      <section className="pricing-section wrap" id="pricing">
        <div className="section-head"><div><span className="kicker">02 / Pricing</span><h2>Transparent from<br /><em>the first call.</em></h2></div><p>Every quote is itemised in writing before any work begins — no surprises, no lock-in.</p></div>
        <div className="pricing-grid">
          {services.map((service) => (
            <article className="price-card" key={service.id}>
              <span className="price-label">{service.number} / {service.title}</span>
              <div className={`price-value ${isPending(service.price) ? "pending" : ""}`}>{service.price}</div>
              <span className="price-unit">{isPending(service.price) ? "Quote prepared case by case" : service.unit}</span>
              <ul>{service.includes.map((item) => <li key={item}>{item}</li>)}</ul>
              <span className="price-timeline">{service.timeline}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="brief-section wrap" id="start">
        <div className="brief-copy"><span className="kicker">03 / Shape the brief</span><h2>Your next step,<br /><em>made simple.</em></h2><p>Tell us what caught your attention. Prices are prepared case by case, so you get a quote that fits the real work.</p></div>
        <div className="brief-panel">
          <div className="panel-label">Your starting brief</div>
          {chosen.length === 0
            ? <div className="empty-state">Your selected services will appear here.<br /><span>Start by choosing a service above.</span></div>
            : <div className="chosen-list" aria-live="polite">{chosen.map((service) => <div className="chosen-row" key={service.id}><span>{service.title}</span><small>{service.price}</small></div>)}</div>}
          <button type="button" className="primary-button" onClick={() => setShowForm(true)} disabled={chosen.length === 0}>Continue with this brief <span aria-hidden="true">→</span></button>
          <div className="panel-note">No commitment. We&apos;ll review your needs before preparing a quote.</div>
        </div>
      </section>

      <section className="work-section" id="work"><div className="wrap work-inner"><div><span className="kicker">04 / Selected work</span><h2>Proof over promises.</h2></div><p>Successful projects will live here — a growing library of thoughtful work, practical outcomes and lessons learned.</p><div className="work-placeholder"><span>Case studies<br />coming soon</span><b aria-hidden="true">↗</b></div></div></section>

      <footer className="footer wrap"><a className="brand" href="#top"><span>Bridge</span><i>X</i> <small>STUDIO</small></a><p>Make something useful.</p><span>© 2026 BridgeX Studio</span></footer>

      {showForm && <div className="modal-backdrop">
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="brief-title">
          <button type="button" className="modal-close" onClick={closeForm} aria-label="Close">×</button>
          <span className="kicker">Start a project</span>
          <h2 id="brief-title">Tell us a little<br /><em>about your idea.</em></h2>
          <p>Selected: {chosen.map((service) => service.title).join(", ")}. Nothing is sent from this page — copy your brief and share it with us directly.</p>
          <form onSubmit={(event) => { event.preventDefault(); copyBrief(); }}>
            <label>Your name<input ref={firstFieldRef} name="name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="How should we address you?" /></label>
            <label>What are you hoping to build?<textarea name="idea" value={idea} onChange={(event) => setIdea(event.target.value)} placeholder="A few words is enough for now." /></label>
            <button type="submit" className="primary-button">{copied ? "Brief copied" : "Copy my brief"} <span aria-hidden="true">{copied ? "✓" : "→"}</span></button>
          </form>
        </div>
      </div>}
    </main>
  );
}
