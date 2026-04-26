import { useEffect, useRef } from 'react'

/**
 * CustomCursor
 * A subtle, premium cursor: small dot + larger trailing ring.
 * Follows mouse smoothly via requestAnimationFrame lerp.
 * Hidden on touch/mobile devices automatically.
 */
export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Don't activate on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    let mouseX = window.innerWidth  / 2
    let mouseY = window.innerHeight / 2
    let ringX  = mouseX
    let ringY  = mouseY
    let rafId

    function onMouseMove(e) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    function onMouseEnterButton() {
      dot.style.transform  = 'translate(-50%, -50%) scale(1.8)'
      ring.style.transform = 'translate(-50%, -50%) scale(1.6)'
      ring.style.borderColor = 'var(--brand)'
      ring.style.opacity   = '0.6'
    }

    function onMouseLeaveButton() {
      dot.style.transform  = 'translate(-50%, -50%) scale(1)'
      ring.style.transform = 'translate(-50%, -50%) scale(1)'
      ring.style.borderColor = 'var(--brand)'
      ring.style.opacity   = '0.35'
    }

    function tick() {
      // Dot: snaps instantly to mouse
      dot.style.left = mouseX + 'px'
      dot.style.top  = mouseY + 'px'

      // Ring: lerps toward mouse (smooth trailing)
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.left = ringX + 'px'
      ring.style.top  = ringY + 'px'

      rafId = requestAnimationFrame(tick)
    }

    // Attach hover listeners to all interactive elements
    function attachListeners() {
      const els = document.querySelectorAll('button, a, input, textarea, select, [role="button"]')
      els.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterButton)
        el.addEventListener('mouseleave', onMouseLeaveButton)
      })
      return els
    }

    window.addEventListener('mousemove', onMouseMove)
    const els = attachListeners()
    rafId = requestAnimationFrame(tick)

    // Re-attach on DOM changes (route changes)
    const observer = new MutationObserver(() => {
      els.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnterButton)
        el.removeEventListener('mouseleave', onMouseLeaveButton)
      })
      attachListeners()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Dot — snaps to cursor position */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 99999,
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: 'var(--brand)',
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.15s ease',
          top: 0,
          left: 0,
        }}
      />
      {/* Ring — trails behind */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 99998,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid var(--brand)',
          opacity: 0.35,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.2s ease, border-color 0.2s ease, opacity 0.2s ease',
          top: 0,
          left: 0,
        }}
      />
    </>
  )
}
