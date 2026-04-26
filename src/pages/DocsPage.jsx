import { useNavigate } from 'react-router-dom'
import {
  FileText, Zap, Shield, Download, Clock, ArrowRight,
  Github, ExternalLink, Code2, Layers, Terminal,
  CheckCircle2, BookOpen, Users, Lock,
} from 'lucide-react'

/* ── Static data ───────────────────────────────────────────── */
const features = [
  {
    icon: <Zap size={18} />,
    title: 'Invoice in under 2 minutes',
    desc: 'Fill 4 fields — your name, client, service, and amount — and your invoice is instantly ready.',
  },
  {
    icon: <Download size={18} />,
    title: 'One-click PDF export',
    desc: 'Download a crisp, print-ready A4 PDF powered by html2pdf.js — works offline, no server needed.',
  },
  {
    icon: <Shield size={18} />,
    title: 'Professional design',
    desc: 'Clean business layout with proper typography and structured alignment that clients respect.',
  },
  {
    icon: <Lock size={18} />,
    title: 'Zero data storage',
    desc: 'Everything stays in your browser session. No account, no cloud sync, no privacy risk.',
  },
  {
    icon: <Users size={18} />,
    title: '7 currencies supported',
    desc: 'USD, EUR, GBP, INR, CAD, AUD, and AED — pick your currency from the form.',
  },
  {
    icon: <CheckCircle2 size={18} />,
    title: 'Auto invoice numbering',
    desc: 'Invoices are numbered automatically: INV-YYYY-XXXX. Editable if you need a custom format.',
  },
]

const steps = [
  {
    num: '01',
    title: 'Click Generate Invoice',
    desc: 'From the landing page, click the Generate Invoice button to open the form.',
  },
  {
    num: '02',
    title: 'Fill in your details',
    desc: 'Enter your name, email (optional), client name, service provided, and amount charged.',
  },
  {
    num: '03',
    title: 'Pick a currency & date',
    desc: 'Select your currency from 7 options. The invoice date and number are pre-filled automatically.',
  },
  {
    num: '04',
    title: 'Preview your invoice',
    desc: 'Click "Preview My Invoice" to see a professional, print-ready invoice rendered instantly.',
  },
  {
    num: '05',
    title: 'Download the PDF',
    desc: 'Click Download PDF to save a high-quality A4 PDF directly to your device.',
  },
]

const stack = [
  { icon: <Code2 size={16} />, label: 'Framework', value: 'React 19' },
  { icon: <Zap size={16} />,    label: 'Build Tool', value: 'Vite 8' },
  { icon: <Layers size={16} />, label: 'Styling', value: 'Tailwind CSS v4 + CSS' },
  { icon: <FileText size={16} />, label: 'Icons', value: 'Lucide React' },
  { icon: <Download size={16} />, label: 'PDF Export', value: 'html2pdf.js' },
  { icon: <Terminal size={16} />, label: 'Routing', value: 'React Router v7' },
]

/* ── Component ─────────────────────────────────────────────── */
export default function DocsPage() {
  const navigate = useNavigate()

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

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              className="btn btn-outline"
              style={{ padding: '8px 14px', fontSize: '0.84rem', display: 'flex', alignItems: 'center', gap: 6 }}
              onClick={() => window.open('https://github.com/YOUR_USERNAME/freelancer-invoice-generator', '_blank')}
            >
              <Github size={14} />
              GitHub
            </button>
            <button
              className="btn btn-primary"
              style={{ padding: '8px 18px', fontSize: '0.875rem' }}
              onClick={() => navigate('/create')}
            >
              Generate Invoice
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section style={{ padding: '72px 0 56px', textAlign: 'center' }}>
        <div className="container-sm">
          <div className="anim-fade-up" style={{ marginBottom: 16 }}>
            <span className="badge badge-blue">
              <BookOpen size={11} />
              Documentation
            </span>
          </div>
          <h1 className="hero-heading anim-fade-up-d1" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: 16 }}>
            About <span className="accent">InvoiceFlow</span>
          </h1>
          <p className="hero-subtext anim-fade-up-d2" style={{ marginBottom: 32 }}>
            A free, fast, and professional invoice generator built for freelancers who want
            to impress clients without wasting time.
          </p>
          <div className="anim-fade-up-d3" style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/create')}
            >
              Try It Now
              <ArrowRight size={15} />
            </button>
            <button
              className="btn btn-outline"
              style={{ display: 'flex', alignItems: 'center', gap: 7 }}
              onClick={() => window.open('https://github.com/YOUR_USERNAME/freelancer-invoice-generator', '_blank')}
            >
              <Github size={15} />
              View on GitHub
              <ExternalLink size={12} />
            </button>
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ─────────────────────────────────────── */}
      <section style={{ padding: '56px 0', background: 'var(--card-bg)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container-md">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 40, alignItems: 'center' }}>
            <div>
              <div className="section-label">The Problem</div>
              <h2 className="section-heading">Freelancers deserve better tools</h2>
              <p className="section-subtext" style={{ marginBottom: 16 }}>
                After finishing a project, many freelancers send invoices as plain email text or
                poorly formatted spreadsheets. This hurts client trust and reduces the chance of
                repeat business.
              </p>
              <p className="section-subtext">
                InvoiceFlow solves this by generating a clean, structured, business-grade invoice PDF
                in under 2 minutes — entirely in your browser, no data ever leaves your device.
              </p>
            </div>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { value: '< 2 min', label: 'To create an invoice' },
                { value: '7',       label: 'Currencies supported' },
                { value: '100%',    label: 'Browser-based, private' },
                { value: 'Free',    label: 'Forever, no sign-up' },
              ].map((s, i) => (
                <div key={i} className="card" style={{ padding: '20px 18px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--brand)', letterSpacing: '-0.04em', marginBottom: 4 }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────── */}
      <section style={{ padding: '72px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label">Features</div>
            <h2 className="section-heading">Everything you need, nothing you don't</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
            {features.map((f, i) => (
              <div key={i} className="card card-hover" style={{ padding: '24px 22px' }}>
                <div className="feature-icon-wrap" style={{ marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--gray-900)', marginBottom: 7 }}>{f.title}</h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO USE ──────────────────────────────────────── */}
      <section style={{ padding: '72px 0', background: 'var(--card-bg)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container-md">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label">How to Use</div>
            <h2 className="section-heading">Step-by-step guide</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {steps.map((s, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '64px 1fr',
                  gap: 24,
                  padding: '24px 0',
                  borderBottom: i < steps.length - 1 ? '1px solid var(--border)' : 'none',
                  alignItems: 'flex-start',
                }}
              >
                {/* Step number */}
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: 'var(--blue-50)', border: '1.5px solid var(--blue-100)',
                  color: 'var(--brand)', fontWeight: 800, fontSize: '1rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  letterSpacing: '-0.02em', flexShrink: 0,
                }}>
                  {s.num}
                </div>
                {/* Text */}
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.975rem', color: 'var(--gray-900)', marginBottom: 5 }}>
                    {s.title}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                    {s.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ──────────────────────────────────────── */}
      <section style={{ padding: '72px 0' }}>
        <div className="container-md">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label">Tech Stack</div>
            <h2 className="section-heading">Built with modern tools</h2>
            <p className="section-subtext" style={{ maxWidth: 420, margin: '0 auto' }}>
              Fast, lightweight, and dependency-minimal by design.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
            {stack.map((t, i) => (
              <div key={i} className="card" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'var(--blue-50)', color: 'var(--brand)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {t.icon}
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: 2 }}>
                    {t.label}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--gray-900)' }}>
                    {t.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN SOURCE ─────────────────────────────────────── */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="container">
          <div className="cta-banner">
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: 10 }}>
                Open Source & Free Forever
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.975rem', marginBottom: 28, lineHeight: 1.65, maxWidth: 480, margin: '0 auto 28px' }}>
                InvoiceFlow is fully open source. Star it on GitHub, contribute improvements,
                or fork it to build your own version.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  className="btn"
                  style={{ background: '#fff', color: 'var(--brand)', padding: '12px 28px', fontWeight: 700, borderRadius: 12, gap: 8 }}
                  onClick={() => window.open('https://github.com/YOUR_USERNAME/freelancer-invoice-generator', '_blank')}
                >
                  <Github size={16} />
                  View on GitHub
                </button>
                <button
                  className="btn"
                  style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.3)', padding: '12px 28px', fontWeight: 600, borderRadius: 12, gap: 8 }}
                  onClick={() => navigate('/create')}
                >
                  Try the App
                  <ArrowRight size={15} />
                </button>
              </div>
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
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Free professional invoice generator for freelancers.
        </p>
      </footer>
    </div>
  )
}
