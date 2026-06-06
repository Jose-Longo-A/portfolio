import { useState, useEffect, useRef } from 'react'
import './NotFound.css'

const CHANNELS = [
  {
    id: 0,
    key: 'static',
    name: 'STATIC',
    bg: '#060606',
    color: '#e8e8e8',
    accent: '#666',
    subtitle: { pt: 'Página não encontrada', en: 'Page not found' },
  },
  {
    id: 1,
    key: 'minecraft',
    name: 'MC',
    bg: '#0a0f05',
    color: '#5a8c3c',
    accent: '#8b6914',
    subtitle: { pt: 'Bloco não encontrado', en: 'Block not found' },
  },
  {
    id: 2,
    key: 'overwatch',
    name: 'OW',
    bg: '#040c18',
    color: '#f99e1a',
    accent: '#4a9fc8',
    subtitle: { pt: 'Herói não encontrado', en: 'HERO NOT FOUND' },
  },
  {
    id: 3,
    key: 'stardew',
    name: 'SDV',
    bg: '#0f1a08',
    color: '#a8d88a',
    accent: '#f4a0b4',
    subtitle: { pt: 'Esta área não existe... ainda.', en: "This area doesn't exist... yet." },
  },
  {
    id: 4,
    key: 'horizon',
    name: 'HFW',
    bg: '#020c14',
    color: '#00b4cc',
    accent: '#ff6b2b',
    subtitle: { pt: 'Sinal perdido — Território desconhecido', en: 'Signal Lost — Unknown Territory' },
  },
  {
    id: 5,
    key: 'hollow',
    name: 'HK',
    bg: '#06080f',
    color: '#8bacc8',
    accent: '#3a5070',
    subtitle: { pt: 'O caminho à frente está selado.', en: 'The path ahead is sealed.' },
  },
]

export default function NotFound() {
  const lang = localStorage.getItem('lang') || 'pt'
  const [channel, setChannel] = useState(0)
  const [displayCh, setDisplayCh] = useState(0)
  const [switching, setSwitching] = useState(false)
  const [powered, setPowered] = useState(true)
  const [showOnAnim, setShowOnAnim] = useState(false)
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    if (displayCh !== 0) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      return
    }
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const draw = () => {
      const { width: w, height: h } = canvas
      const img = ctx.createImageData(w, h)
      const d = img.data
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() > 0.45 ? Math.floor(Math.random() * 180 + 60) : 0
        d[i] = d[i + 1] = d[i + 2] = v
        d[i + 3] = Math.floor(Math.random() * 55 + 15)
      }
      ctx.putImageData(img, 0, 0)
      rafRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [displayCh])

  const switchTo = (idx) => {
    if (idx === channel || switching) return
    setSwitching(true)
    setTimeout(() => setDisplayCh(idx), 190)
    setTimeout(() => { setChannel(idx); setSwitching(false) }, 400)
  }

  const nextChannel = () => switchTo((channel + 1) % CHANNELS.length)

  const ch = CHANNELS[displayCh]

  return (
    <div className="nf-root">
      <div className="nf-grain" aria-hidden="true" />
      <a href="/" className="nf-brand">J.L</a>

      <main className="nf-main">

        {/* TV with image */}
        <div className="tv-wrapper">
          <img src="/images/oldTV.png" alt="Televisão antiga" className="tv-img" />

          {/* Screen overlay — sits over the white screen area of the image */}
          <div
            className={`tv-screen-overlay tv-screen--${ch.key}${switching ? ' is-switching' : ''}`}
            style={{ '--ch-bg': ch.bg, '--ch-color': ch.color, '--ch-accent': ch.accent }}
          >
            {/* Static noise canvas */}
            {displayCh === 0 && (
              <canvas ref={canvasRef} className="tv-static" width="80" height="60" />
            )}

            {/* Content */}
            <div className="tv-content">
              {displayCh === 2 && (
                <div className="ow-frame ow-frame--top"><span /><span /></div>
              )}
              {displayCh === 4 && (
                <div className="hz-ornament">— ◈ —</div>
              )}
              <div className={`tv-404 tv-404--${ch.key}`}>404</div>
              <p className={`tv-sub tv-sub--${ch.key}`}>{ch.subtitle[lang]}</p>
              {displayCh === 2 && (
                <div className="ow-frame ow-frame--bottom"><span /><span /></div>
              )}
            </div>

            {/* Channel label */}
            <span className="tv-ch-label">
              CH {String(displayCh + 1).padStart(2, '0')} / {CHANNELS.length}
            </span>

            {/* Scanlines */}
            <div className="tv-scanlines" aria-hidden="true" />

            {/* Sweep transition */}
            {switching && <div className="tv-sweep" aria-hidden="true" />}

            {/* CRT power-off overlay — stays black while off AND during on-animation */}
            {!powered && (
              <div className="tv-off-overlay">
                <div className="tv-off-beam" />
              </div>
            )}

            {/* CRT power-on overlay */}
            {showOnAnim && <div className="tv-on-beam" />}
          </div>
          {/* Invisible knob button — easter egg */}
          <button
            className="tv-knob-btn"
            onClick={nextChannel}
            aria-label="Mudar canal"
          />

          {/* Power button — turns screen off/on */}
          <button
            className="tv-power-btn"
            onClick={() => {
              if (powered) {
                setPowered(false)
              } else {
                setShowOnAnim(true)
                setTimeout(() => setPowered(true), 440)
                setTimeout(() => setShowOnAnim(false), 580)
              }
            }}
            aria-label={powered ? 'Desligar TV' : 'Ligar TV'}
          />

        </div>

        {/* Back link */}
        <a href="/" className="nf-back">
          ← {lang === 'pt' ? 'Voltar ao início' : 'Back to home'}
        </a>

      </main>
    </div>
  )
}
