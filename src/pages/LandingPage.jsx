import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { FileText, Zap, Shield, Download, ChevronRight, Star, Check, ArrowRight, CheckCircle2, Heart } from 'lucide-react'

/* ── Static data ───────────────────────────────────────────── */
const features = [
  {
    icon: <Zap size={20} />,
    title: 'Instant Generation',
    desc: 'Fill a short form and get a polished invoice PDF in under 60 seconds — no account needed.',
  },
  {
    icon: <Shield size={20} />,
    title: 'Professional Design',
    desc: 'Clean, business-grade layout that builds trust with every client you bill.',
  },
  {
    icon: <Download size={20} />,
    title: 'One-Click PDF Export',
    desc: 'Download a print-ready A4 PDF instantly. Share by email or print directly.',
  },
]

const steps = [
  { num: '1', label: 'Fill your details', desc: 'Your info, client info, service, and amount.' },
  { num: '2', label: 'Preview invoice',   desc: 'See exactly what your client will receive.' },
  { num: '3', label: 'Download PDF',      desc: 'One click — crisp, print-ready document.' },
]

const testimonials = [
  {
    initials: 'SK',
    name: 'Sarah K.',
    role: 'UI/UX Designer',
    text: 'I send invoices every week. This makes me look 10× more professional — clients actually pay faster now.',
  },
  {
    initials: 'JM',
    name: 'James M.',
    role: 'Web Developer',
    text: 'Clean, simple, and exactly what I needed. Clients always comment on how professional my invoices look.',
  },
  {
    initials: 'PR',
    name: 'Priya R.',
    role: 'Content Strategist',
    text: 'Finally a free tool that actually looks premium. Repeat business went up after I started using it.',
  },
]

/* ── Component ─────────────────────────────────────────────── */
export default function LandingPage() {
  const navigate = useNavigate()

  /* Scroll-reveal: fade-up sections on enter */
  useEffect(() => {
    const els = document.querySelectorAll('.scroll-reveal')
    if (!els.length) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="page-shell">

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav className="nav">
        <div className="container nav-inner">
          <a className="nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <div className="nav-logo-icon">
              <FileText size={17} color="#fff" />
            </div>
            <span className="nav-logo-text">InvoiceFlow</span>
          </a>

          <button
            id="nav-cta"
            className="btn btn-primary"
            style={{ padding: '9px 20px', fontSize: '0.875rem' }}
            onClick={() => navigate('/create')}
          >
            Generate Invoice
          </button>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="hero-section">
        <div className="container-sm">

          {/* Eyebrow */}
          <div className="hero-eyebrow anim-fade-up">
            <span className="badge badge-blue">
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#22c55e', display: 'inline-block'
              }} />
              Free Forever · No Sign-Up Required
            </span>
          </div>

          {/* Heading */}
          <h1 className="hero-heading anim-fade-up-d1">
            Create <span className="accent">Professional Invoices</span>
            <br />in Seconds
          </h1>

          {/* Subtext */}
          <p className="hero-subtext anim-fade-up-d2">
            Impress clients, build trust, and get paid faster.
            Fill a quick form and download a stunning invoice PDF — completely free.
          </p>

          {/* Actions */}
          <div className="hero-actions anim-fade-up-d3">
            <button
              id="hero-cta"
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/create')}
            >
              Generate Invoice
              <ArrowRight size={17} />
            </button>
            <div className="hero-speed-badge">
              <CheckCircle2 size={13} strokeWidth={2.5} />
              Takes less than 2 minutes
            </div>
          </div>
        </div>

        {/* ── Mock Invoice Preview ─────────────────────────── */}
        <div className="container-sm">
          <div className="hero-card-wrap anim-scale-in anim-float">
            <div className="hero-card-shadow" />
            <div className="card hero-card" style={{ padding: '28px 32px', textAlign: 'left' }}>
              {/* Invoice top */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gray-400)', marginBottom: 4 }}>
                    Invoice
                  </div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-0.03em' }}>
                    #INV-2026-0042
                  </div>
                </div>
                <span className="badge badge-blue">Sent</span>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: 'var(--gray-100)', marginBottom: 20 }} />

              {/* From / To */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gray-400)', marginBottom: 6 }}>From</div>
                  <div style={{ fontWeight: 700, color: 'var(--gray-900)', fontSize: '0.9rem' }}>Alex Morgan</div>
                  <div style={{ color: 'var(--gray-500)', fontSize: '0.82rem' }}>alex@studio.co</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gray-400)', marginBottom: 6 }}>Billed To</div>
                  <div style={{ fontWeight: 700, color: 'var(--gray-900)', fontSize: '0.9rem' }}>Acme Corp</div>
                  <div style={{ color: 'var(--gray-500)', fontSize: '0.82rem' }}>Due: Jan 15, 2026</div>
                </div>
              </div>

              {/* Service row */}
              <div style={{ background: 'var(--gray-50)', borderRadius: 10, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--gray-900)', fontSize: '0.875rem' }}>Website Redesign</div>
                  <div style={{ color: 'var(--gray-400)', fontSize: '0.78rem' }}>Professional Services</div>
                </div>
                <div style={{ fontWeight: 800, color: 'var(--brand)', fontSize: '1.1rem' }}>$2,400.00</div>
              </div>

              {/* Total */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', background: 'var(--blue-50)', borderRadius: 10, border: '1px solid var(--blue-100)' }}>
                <span style={{ fontWeight: 700, color: 'var(--gray-900)', fontSize: '0.875rem' }}>Total Due</span>
                <span style={{ fontWeight: 800, color: 'var(--brand)', fontSize: '1.2rem' }}>$2,400.00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────── */}
      <section className="scroll-reveal" style={{ padding: '80px 0' }}>
        <div className="container">
          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label">Why InvoiceFlow</div>
            <h2 className="section-heading">Everything a freelancer needs</h2>
            <p className="section-subtext" style={{ maxWidth: 440, margin: '0 auto' }}>
              Simple by design. Powerful where it counts.
            </p>
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {features.map((f, i) => (
              <div key={i} className="card card-hover" style={{ padding: '28px 24px' }}>
                <div className="feature-icon-wrap">{f.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--gray-900)', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────── */}
      <section className="scroll-reveal" style={{ padding: '80px 0', background: 'var(--card-bg)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label">Process</div>
            <h2 className="section-heading">Three steps, done</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, maxWidth: 800, margin: '0 auto' }}>
            {steps.map((s, i) => (
              <div key={i} className="card card-hover" style={{ padding: '28px 24px' }}>
                <div className="how-step-num">{s.num}</div>
                <h3 style={{ fontWeight: 700, fontSize: '0.975rem', color: 'var(--gray-900)', marginBottom: 6 }}>{s.label}</h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────── */}
      <section className="scroll-reveal" style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label">Testimonials</div>
            <h2 className="section-heading">Loved by freelancers</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {testimonials.map((t, i) => (
              <div key={i} className="card card-hover" style={{ padding: '24px' }}>
                {/* Stars */}
                <div className="stars">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--gray-700)', lineHeight: 1.7, marginBottom: 16 }}>
                  "{t.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="avatar-initials">{t.initials}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.84rem', color: 'var(--gray-900)' }}>{t.name}</div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────── */}
      <section className="scroll-reveal" style={{ padding: '0 0 80px' }}>
        <div className="container">
          <div className="cta-banner">
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: 12 }}>
                Ready to look more professional?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', marginBottom: 32, lineHeight: 1.6 }}>
                Create your first invoice right now. Completely free, forever.
              </p>
              <button
                id="bottom-cta"
                className="btn"
                style={{ background: '#fff', color: 'var(--brand)', padding: '14px 36px', fontSize: '1rem', fontWeight: 700, borderRadius: 12, gap: 8 }}
                onClick={() => navigate('/create')}
              >
                Create My Invoice
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="footer">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 6 }}>
          <div className="nav-logo-icon" style={{ width: 26, height: 26, borderRadius: 7 }}>
            <FileText size={13} color="#fff" />
          </div>
          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--gray-900)' }}>InvoiceFlow</span>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
          Free professional invoice generator for freelancers. Built with
          <Heart size={12} fill="#ef4444" color="#ef4444" />
        </p>
      </footer>
    </div>
  )
}
