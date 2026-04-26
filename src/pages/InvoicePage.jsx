import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Download, Edit2, FileText, CheckCircle2, Check } from 'lucide-react'

/* ── Helpers ───────────────────────────────────────────────── */
function fmtDate(s) {
  if (!s) return ''
  const d = new Date(s + 'T00:00:00')
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
function fmtAmt(amount, symbol) {
  const n = parseFloat(amount) || 0
  return `${symbol}${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

/* ── Stepper (step 2 active) ───────────────────────────────── */
const STEPS = ['Your Info', 'Invoice Details', 'Preview & Export']
function Stepper({ active = 1 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', overflowX: 'auto', paddingBottom: 4 }}>
      {STEPS.map((label, i) => {
        const state = i < active ? 'done' : i === active ? 'active' : 'pending'
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div className={`step-num is-${state}`}>
                {state === 'done' ? <CheckCircle2 size={12} /> : i + 1}
              </div>
              <span className={`step-label is-${state}`} style={{ whiteSpace: 'nowrap' }}>{label}</span>
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

/* ── Main ──────────────────────────────────────────────────── */
export default function InvoicePage() {
  const navigate   = useNavigate()
  const invoiceRef = useRef(null)
  const [data,        setData]        = useState(null)
  const [downloading, setDownloading] = useState(false)
  const [downloaded,  setDownloaded]  = useState(false)

  useEffect(() => {
    const raw = sessionStorage.getItem('invoiceData')
    if (!raw) { navigate('/create'); return }
    setData(JSON.parse(raw))
  }, [navigate])

  async function handleDownload() {
    if (!invoiceRef.current) return
    setDownloading(true)
    try {
      const html2pdf = (await import('html2pdf.js')).default
      await html2pdf().set({
        margin: 0,
        filename: `${data.invoiceNumber || 'invoice'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 3, useCORS: true, backgroundColor: '#ffffff', logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      }).from(invoiceRef.current).save()
      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 3000)
    } catch (err) { console.error(err) }
    finally { setDownloading(false) }
  }

  if (!data) return null

  const sym  = data.currencySymbol || '$'
  const amt  = fmtAmt(data.amount, sym)
  const date = fmtDate(data.date)

  /* ── invoice colour tokens (inline, PDF-safe) */
  const C = {
    brand:      '#2563eb',
    brandLight: '#eff6ff',
    brandBorder:'#bfdbfe',
    gray50:     '#f9fafb',
    gray100:    '#f3f4f6',
    gray200:    '#e5e7eb',
    gray400:    '#9ca3af',
    gray500:    '#6b7280',
    gray700:    '#374151',
    gray900:    '#111827',
  }

  return (
    <div className="page-shell">

      {/* ── Page header ──────────────────────────── */}
      <div className="page-header">
        <div className="container-md page-header-inner">
          <button
            id="edit-invoice-btn"
            className="btn btn-ghost"
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            onClick={() => navigate('/create')}
          >
            <ArrowLeft size={14} />
            <Edit2 size={13} />
            Edit
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <div className="nav-logo-icon" style={{ width: 30, height: 30, borderRadius: 8 }}>
              <FileText size={15} color="#fff" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--gray-900)' }}>InvoiceFlow</span>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              id="new-invoice-btn"
              className="btn btn-outline"
              style={{ padding: '8px 14px', fontSize: '0.84rem' }}
              onClick={() => navigate('/')}
            >
              New Invoice
            </button>
            <button
              id="download-pdf-btn"
              className="btn btn-primary"
              style={{ padding: '8px 18px', fontSize: '0.84rem', gap: 6 }}
              onClick={handleDownload}
              disabled={downloading}
            >
              {downloading ? (
                <>
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Exporting…
                </>
              ) : downloaded ? (
                <><Check size={14} /> Downloaded!</>
              ) : (
                <><Download size={14} /> Download PDF</>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Main content ──────────────────────────── */}
      <div style={{ padding: '32px 0 60px' }}>
        <div className="container-md">

          {/* Stepper */}
          <div style={{ marginBottom: 24 }}>
            <Stepper active={1} />
          </div>

          {/* Success alert */}
          <div className="alert alert-success anim-fade-up" style={{ marginBottom: 20 }}>
            <CheckCircle2 size={16} />
            Your invoice is ready! Review it below, then click <strong>Download PDF</strong>.
          </div>

          {/* Invoice wrapper — shadow gives depth */}
          <div
            className="anim-scale-in"
            style={{
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 24px 64px rgba(0,0,0,0.06)',
            }}
          >
            {/* ════════════════════════════════════════
                PRINTABLE INVOICE DOCUMENT
                All styles are inline for PDF fidelity
                ════════════════════════════════════════ */}
            <div
              ref={invoiceRef}
              id="invoice-doc"
              style={{
                background: '#ffffff',
                fontFamily: "'Inter', Arial, Helvetica, sans-serif",
                color: C.gray900,
                fontSize: 14,
                lineHeight: 1.5,
                minHeight: '297mm',
                width: '100%',
              }}
            >
              {/* ── Header band ───────────────────── */}
              <div style={{ background: C.brand, padding: '36px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                </div>
                {/* Invoice label + number */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Your Invoice</div>
                  <div style={{ color: '#fff', fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em' }}>{data.invoiceNumber}</div>
                </div>
              </div>

              {/* ── Body ──────────────────────────── */}
              <div style={{ padding: '40px 48px' }}>

                {/* FROM / BILL TO row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 36 }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: C.gray400, marginBottom: 8 }}>From</div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: C.gray900, marginBottom: 3 }}>{data.freelancerName}</div>
                    {data.freelancerEmail && (
                      <div style={{ fontSize: 13, color: C.gray500 }}>{data.freelancerEmail}</div>
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: C.gray400, marginBottom: 8 }}>Bill To</div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: C.gray900 }}>{data.clientName}</div>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: C.gray100, marginBottom: 28 }} />

                {/* Meta info pills */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 36 }}>
                  {[
                    { label: 'Invoice Date', value: date },
                    { label: 'Invoice Number', value: data.invoiceNumber },
                    { label: 'Currency', value: data.currency || 'USD' },
                  ].map((m, i) => (
                    <div key={i} style={{ background: C.gray50, border: `1px solid ${C.gray100}`, borderRadius: 10, padding: '12px 16px' }}>
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.gray400, marginBottom: 6 }}>{m.label}</div>
                      <div style={{ fontWeight: 600, fontSize: 13, color: C.gray900 }}>{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* ── Services table ──────────────── */}
                <div style={{ marginBottom: 32 }}>
                  {/* Table header */}
                  <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 120px 140px',
                    background: C.gray900, borderRadius: '10px 10px 0 0',
                    padding: '11px 20px',
                  }}>
                    {['Description', 'Type', 'Amount'].map((h, i) => (
                      <div key={i} style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)', textAlign: i === 2 ? 'right' : 'left' }}>{h}</div>
                    ))}
                  </div>

                  {/* Table row */}
                  <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 120px 140px',
                    border: `1px solid ${C.gray200}`, borderTop: 'none',
                    padding: '18px 20px', alignItems: 'center',
                    background: '#fff',
                  }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: C.gray900, marginBottom: 3 }}>{data.service}</div>
                      <div style={{ fontSize: 12, color: C.gray400 }}>Professional Services</div>
                    </div>
                    <div style={{ fontSize: 12, color: C.gray500 }}>Service</div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: C.brand, textAlign: 'right' }}>{amt}</div>
                  </div>

                  {/* Table footer */}
                  <div style={{ border: `1px solid ${C.gray200}`, borderTop: 'none', borderRadius: '0 0 10px 10px', background: C.gray50, padding: '12px 20px', display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ width: 260 }}>
                      {/* Subtotal */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${C.gray200}` }}>
                        <span style={{ fontSize: 13, color: C.gray500 }}>Subtotal</span>
                        <span style={{ fontSize: 13, fontWeight: 500, color: C.gray900 }}>{amt}</span>
                      </div>
                      {/* Tax */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${C.gray200}` }}>
                        <span style={{ fontSize: 13, color: C.gray500 }}>Tax</span>
                        <span style={{ fontSize: 13, color: C.gray400 }}>—</span>
                      </div>
                      {/* Total */}
                      <div style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        marginTop: 10, padding: '12px 14px',
                        background: C.brandLight, border: `1px solid ${C.brandBorder}`,
                        borderRadius: 8,
                      }}>
                        <span style={{ fontWeight: 700, fontSize: 13, color: C.gray900 }}>Total Due</span>
                        <span style={{ fontWeight: 800, fontSize: 18, color: C.brand }}>{amt}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {data.notes && (
                  <div style={{
                    background: C.gray50, border: `1px solid ${C.gray200}`,
                    borderRadius: 10, padding: '16px 20px', marginBottom: 32,
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.gray400, marginBottom: 8 }}>
                      Notes & Payment Terms
                    </div>
                    <p style={{ fontSize: 13, color: C.gray700, lineHeight: 1.7 }}>{data.notes}</p>
                  </div>
                )}

                {/* Footer */}
                <div style={{ borderTop: `1px solid ${C.gray100}`, paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: C.gray900, marginBottom: 3 }}>
                      Thank you for your business :)
                    </div>
                    <div style={{ fontSize: 12, color: C.gray400 }}>
                      {data.freelancerEmail || 'Please reach out if you have any questions.'}
                    </div>
                  </div>
                  <div style={{ fontSize: 10, color: C.gray400, textAlign: 'right', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Generated by InvoiceFlow
                  </div>
                </div>

              </div>{/* /body */}
            </div>{/* /invoice-doc */}
          </div>{/* /wrapper */}

          {/* Bottom action bar */}
          <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              You can always create a new invoice — it's free
            </p>
            <button
              id="bottom-download-btn"
              className="btn btn-primary"
              style={{ padding: '12px 28px', fontSize: '0.95rem', gap: 8, borderRadius: 12 }}
              onClick={handleDownload}
              disabled={downloading}
            >
              <Download size={16} />
              Download PDF
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
