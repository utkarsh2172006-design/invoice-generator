import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FileText, ArrowLeft, User, Briefcase, Calendar,
  Hash, Mail, MessageSquare, Globe, AlertCircle, ChevronRight, CheckCircle2, Lock
} from 'lucide-react'

/* ── Currency options ──────────────────────────────────────── */
const CURRENCIES = [
  { code: 'USD', symbol: '$',    label: 'US Dollar' },
  { code: 'EUR', symbol: '€',    label: 'Euro' },
  { code: 'GBP', symbol: '£',    label: 'British Pound' },
  { code: 'INR', symbol: '₹',    label: 'Indian Rupee' },
  { code: 'CAD', symbol: 'CA$',  label: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$',   label: 'Australian Dollar' },
  { code: 'AED', symbol: 'AED',  label: 'UAE Dirham' },
]

function generateInvoiceNumber() {
  const year = new Date().getFullYear()
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `INV-${year}-${rand}`
}
function today() { return new Date().toISOString().split('T')[0] }

const initialForm = {
  freelancerName: '',
  freelancerEmail: '',
  clientName: '',
  service: '',
  amount: '',
  currency: 'USD',
  date: today(),
  invoiceNumber: generateInvoiceNumber(),
  notes: '',
}

/* ── Sub-components ────────────────────────────────────────── */
function Field({ id, label, required, icon, error, children }) {
  return (
    <div className="field">
      <label htmlFor={id} className="field-label">
        {label}{required && <span className="required"> *</span>}
      </label>
      <div className="field-icon-wrap">
        {icon && <span className="field-icon">{icon}</span>}
        {children}
      </div>
      {error && (
        <span className="field-error">
          <AlertCircle size={12} />
          {error}
        </span>
      )}
    </div>
  )
}

function Input({ id, name, icon, error, className = '', ...rest }) {
  return (
    <input
      id={id}
      name={name}
      className={`field-input ${icon ? 'has-icon' : ''} ${error ? 'is-error' : ''} ${className}`}
      {...rest}
    />
  )
}

function Textarea({ id, name, icon, rows = 3, ...rest }) {
  return (
    <div className="field-icon-wrap">
      {icon && <span className="field-icon-top">{icon}</span>}
      <textarea
        id={id}
        name={name}
        rows={rows}
        className={`field-input ${icon ? 'has-icon' : ''}`}
        style={{ resize: 'none', paddingTop: 11 }}
        {...rest}
      />
    </div>
  )
}

/* ── Stepper ───────────────────────────────────────────────── */
const STEPS = ['Your Info', 'Invoice Details', 'Preview & Export']

function Stepper({ active = 0 }) {
  return (
    <div className="stepper" style={{ flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: 4 }}>
      {STEPS.map((label, i) => {
        const state = i < active ? 'done' : i === active ? 'active' : 'pending'
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <div className="step-item">
              <div className={`step-num is-${state}`}>
                {state === 'done' ? <CheckCircle2 size={13} /> : i + 1}
              </div>
              <span className={`step-label is-${state}`} style={{ whiteSpace: 'nowrap' }}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`step-line ${i < active ? 'is-done' : ''}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ── Main page ─────────────────────────────────────────────── */
export default function FormPage() {
  const navigate = useNavigate()
  const [form, setForm]       = useState(initialForm)
  const [errors, setErrors]   = useState({})
  const [submitting, setSubmitting] = useState(false)

  const currency = CURRENCIES.find(c => c.code === form.currency) || CURRENCIES[0]

  function handleChange(e) {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }))
  }

  function validate() {
    const e = {}
    if (!form.freelancerName.trim()) e.freelancerName = 'Your name is required'
    if (form.freelancerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.freelancerEmail))
      e.freelancerEmail = 'Enter a valid email'
    if (!form.clientName.trim())  e.clientName = 'Client name is required'
    if (!form.service.trim())     e.service    = 'Service description is required'
    if (!form.amount || isNaN(+form.amount) || +form.amount <= 0)
      e.amount = 'Enter a valid positive amount'
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitting(true)
    setTimeout(() => {
      sessionStorage.setItem('invoiceData', JSON.stringify({ ...form, currencySymbol: currency.symbol }))
      navigate('/invoice')
    }, 500)
  }

  return (
    <div className="page-shell">

      {/* ── Page header ───────────────────────────── */}
      <div className="page-header">
        <div className="container page-header-inner">
          <button className="btn btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6 }} onClick={() => navigate('/')} id="back-btn">
            <ArrowLeft size={15} />
            Home
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <div className="nav-logo-icon" style={{ width: 30, height: 30, borderRadius: 8 }}>
              <FileText size={15} color="#fff" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--gray-900)' }}>InvoiceFlow</span>
          </div>

          <div style={{ width: 80 }} /> {/* spacer keeps logo centred */}
        </div>
      </div>

      {/* ── Main content ──────────────────────────── */}
      <div style={{ padding: '36px 0 60px' }}>
        <div className="container-sm">

          {/* Stepper */}
          <div style={{ marginBottom: 28 }}>
            <Stepper active={0} />
          </div>

          {/* Card */}
          <div className="card anim-fade-up" style={{ padding: 0, overflow: 'hidden' }}>

            {/* Card header stripe */}
            <div style={{ padding: '22px 28px', borderBottom: '1px solid var(--border)', background: 'var(--gray-50)' }}>
              <h1 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--gray-900)', letterSpacing: '-0.02em', marginBottom: 3 }}>
                Invoice Details
              </h1>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                Fill in the fields below — your PDF will be ready instantly.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate style={{ padding: '28px' }}>

              {/* ── Section: Your Information ──────── */}
              <div className="form-section-label">Your Information</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
                <Field id="freelancerName" label="Your Name" required icon={<User size={14} />} error={errors.freelancerName}>
                  <Input id="freelancerName" name="freelancerName" icon placeholder="Alex Morgan"
                    value={form.freelancerName} onChange={handleChange} error={errors.freelancerName} />
                </Field>
                <Field id="freelancerEmail" label="Email Address" icon={<Mail size={14} />} error={errors.freelancerEmail}>
                  <Input id="freelancerEmail" name="freelancerEmail" type="email" icon placeholder="alex@example.com"
                    value={form.freelancerEmail} onChange={handleChange} error={errors.freelancerEmail} />
                </Field>
              </div>

              {/* ── Section: Client & Service ──────── */}
              <div className="form-section-label">Client & Service</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
                <Field id="clientName" label="Client Name" required icon={<Briefcase size={14} />} error={errors.clientName}>
                  <Input id="clientName" name="clientName" icon placeholder="Acme Corp"
                    value={form.clientName} onChange={handleChange} error={errors.clientName} />
                </Field>
                <Field id="service" label="Service Provided" required icon={<Briefcase size={14} />} error={errors.service}>
                  <Input id="service" name="service" icon placeholder="Website Redesign"
                    value={form.service} onChange={handleChange} error={errors.service} />
                </Field>
              </div>

              {/* Amount + Currency row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, marginBottom: 28 }}>
                {/* Amount */}
                <div className="field">
                  <label htmlFor="amount" className="field-label">Amount Charged<span className="required"> *</span></label>
                  <div className="field-icon-wrap">
                    <span className="field-icon" style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--brand)' }}>
                      {currency.symbol}
                    </span>
                    <input
                      id="amount" name="amount" type="number" min="0" step="0.01" placeholder="0.00"
                      value={form.amount} onChange={handleChange}
                      className={`field-input has-icon ${errors.amount ? 'is-error' : ''}`}
                    />
                  </div>
                  {errors.amount && <span className="field-error"><AlertCircle size={12} />{errors.amount}</span>}
                </div>

                {/* Currency select */}
                <div className="field" style={{ minWidth: 130 }}>
                  <label htmlFor="currency" className="field-label">
                    <Globe size={11} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
                    Currency
                  </label>
                  <div className="field-icon-wrap">
                    <select id="currency" name="currency" value={form.currency} onChange={handleChange}
                      className="field-input" style={{ cursor: 'pointer' }}>
                      {CURRENCIES.map(c => (
                        <option key={c.code} value={c.code}>{c.code} {c.symbol}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* ── Section: Invoice Meta ──────────── */}
              <div className="form-section-label">Invoice Meta</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
                <Field id="invoiceNumber" label="Invoice Number" icon={<Hash size={14} />}>
                  <Input id="invoiceNumber" name="invoiceNumber" icon placeholder="INV-2026-0001"
                    value={form.invoiceNumber} onChange={handleChange} />
                </Field>
                <Field id="date" label="Invoice Date" icon={<Calendar size={14} />}>
                  <Input id="date" name="date" type="date" icon value={form.date} onChange={handleChange} />
                </Field>
              </div>

              {/* Notes */}
              <div className="field" style={{ marginBottom: 28 }}>
                <label htmlFor="notes" className="field-label">
                  <MessageSquare size={11} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
                  Notes / Payment Terms
                  <span style={{ marginLeft: 6, fontWeight: 400, color: 'var(--gray-400)', textTransform: 'none', letterSpacing: 0 }}>
                    (optional)
                  </span>
                </label>
                <Textarea id="notes" name="notes" placeholder="Payment due within 30 days. Preferred: bank transfer."
                  value={form.notes} onChange={handleChange} />
              </div>

              {/* Submit */}
              <button
                id="generate-btn"
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: '0.975rem', borderRadius: 12, gap: 8 }}
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Generating Invoice…
                  </>
                ) : (
                  <>
                    <FileText size={17} />
                    Preview My Invoice
                    <ChevronRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Privacy note */}
          <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-subtle)', marginTop: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
            <Lock size={11} strokeWidth={2.5} />
            Your data stays in your browser — we never store or share it.
          </p>
        </div>
      </div>
    </div>
  )
}
