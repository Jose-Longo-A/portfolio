import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import './App.css'


// Documents
import cvPdf from './assets/CV.pdf?url'

// ── Data ──────────────────────────────────────────────────────────────────

const projects = [
  {
    title: 'Lets Fit',
    subtitle: 'Plataforma Web',
    img: '/images/letsfit.png',
    tags: ['HTML', 'CSS', 'JavaScript'],
    description: 'Meu primeiro projeto web desenvolvido com HTML e CSS, criado como uma plataforma fitness para criação, busca e compartilhamento de treinos personalizados. O projeto reúne modalidades como musculação, calistenia e alongamento, com foco em acessibilidade, interface responsiva e uma experiência simples para usuários que treinam em casa ou na academia.',
    link: null,
    github: 'https://github.com/Jose-Longo-A/inter-2sem-2024-treinos',
    linkedin: 'https://www.linkedin.com/posts/jos%C3%A9-longo_hoje-foi-o-dia-no-qual-eu-e-meu-grupo-apresentamos-activity-7275178962962550785-xtlY?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEtYAZsB-3Ac80rK1vWv7eqlcpPodgjsdJw',
  },
  {
    title: 'Toilet View',
    subtitle: 'Sistema Web IoT',
    img: '/images/toiletview.png',
    tags: ['Python', 'Flask', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'Chart.js'],
    description: 'Sistema web IoT para monitoramento inteligente de banheiros, desenvolvido em parceria com a empresa Absolut Technologies. A solução permite acompanhar em tempo real a ocupação de cabines e a qualidade do ar por meio de sensores, exibindo dados em dashboards para melhorar a experiência dos usuários e otimizar a rotina de limpeza em ambientes públicos ou corporativos.',
    link: null,
    github: 'https://github.com/Jose-Longo-A/inter-3sem-2025-toilet-view',
    linkedin: 'https://www.linkedin.com/posts/jos%C3%A9-longo_muito-feliz-em-compartilhar-a-apresenta%C3%A7%C3%A3o-activity-7338716812508864512-dG5Y?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEtYAZsB-3Ac80rK1vWv7eqlcpPodgjsdJw',
  },
  {
    title: 'Review Center',
    subtitle: 'Dashboard analítico WEB SCRAPING',
    img: '/images/reviewcenter.png',
    tags: ['Web Scraping', 'Banco de Dados Relacional', 'API', 'Front-end Web'],
    description: 'Sistema de relatórios automatizados com atualização diária, drill-down por região e categoria, e exportação programada para stakeholders. Eliminou relatórios manuais em Excel da equipe e acelerou a tomada de decisão.',
    link: null,
    github: 'https://github.com/tech-espm/inter-4sem-2025-review-center',
    linkedin: 'https://www.linkedin.com/posts/jos%C3%A9-longo_hoje-foi-um-grande-dia-apresentamos-o-nosso-activity-7407569995578261504-06sD?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEtYAZsB-3Ac80rK1vWv7eqlcpPodgjsdJw',
  },
  {
    title: 'Machine Learning',
    subtitle: 'Repositório técnico',
    img: '/images/machinelearning.png',
    tags: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'GitHub Pages'],
    description: 'Repositório técnico desenvolvido para documentar estudos e entregas da disciplina de Machine Learning. O projeto reúne experimentos com modelos como Árvore de Decisão, KNN, K-Means, Random Forest e SVM, incluindo exploração de dados, pré-processamento, treinamento, avaliação de métricas e visualizações. O conteúdo foi organizado em um site interativo com MkDocs Material e publicado via GitHub Pages.',
    link: 'https://jose-longo-a.github.io/Machine-Learning/',
    github: 'https://github.com/Jose-Longo-A/Machine-Learning',
    linkedin: null,
  },
  {
    title: 'Zincoligas',
    subtitle: 'AUTOMAÇÃO OCR',
    img: '/images/zincoligasocr.png',
    tags: ['Python', 'Streamlit', 'Tesseract OCR', 'pytesseract', 'pdf2image', 'Poppler', 'Pillow', 'Pandas', 'OpenPyXL', 'Regex', 'Excel'],
    description: 'Ferramenta interna desenvolvida em Python para automatizar a extração de dados de pedidos de compra em PDF. A aplicação utiliza OCR para capturar informações de documentos escaneados, organiza os dados em uma interface de revisão e salva automaticamente as informações estruturadas em planilhas Excel, reduzindo retrabalho manual e aumentando a padronização dos registros.',
    link: null,
    github: null,
    linkedin: null,
    wip: true,
  },
]

const trajectory = [
  {
    company: 'Motorola Solutions',
    location: 'São Paulo, BR',
    period: '2026 — NOW',
    role: 'Deals Desk Intern',
    current: true,
  },
  {
    company: 'ESPM Overbite',
    location: 'São Paulo, BR',
    period: '2024 — 2025',
    role: 'Performance Analyst / E-sports Player',
    current: false,
  },
  {
    company: 'Zincoligas',
    location: 'Itaquaquecetuba - SP',
    period: '2023 — 2024',
    role: 'Assistente Administrativo',
    current: false,
  },
]

const tools = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: 'Análise de Dados',
    description: 'Utilizo Python, SQL e R para extrair, limpar e analisar dados — desde exploração inicial até modelos de Machine Learning. Tenho experiência prática em projetos acadêmicos com Scikit-learn e Pandas, e no ambiente corporativo da Motorola Solutions.',
    tags: ['Python', 'SQL', 'R', 'Pandas', 'NumPy', 'Scikit-learn', 'Excel'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Automação de Processos',
    description: 'Desenvolvo scripts e ferramentas que eliminam trabalho manual repetitivo. Criei uma solução OCR em Python que automatiza extração de dados de PDFs para Excel, e na Motorola mantenho scripts em Google Apps Script para o ecossistema interno de aprovações.',
    tags: ['Python', 'Google Apps Script', 'Streamlit', 'Tesseract OCR', 'Pandas', 'Regex'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    title: 'Visualização & BI',
    description: 'Construo dashboards que traduzem grandes volumes de dados em decisões claras. Na Motorola, integro múltiplas fontes — Salesforce, SAP, Snowflake — em painéis Tableau para apoiar análises estratégicas de precificação e vendas.',
    tags: ['Tableau', 'Power BI', 'Excel', 'Chart.js', 'SQL', 'Salesforce'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    title: 'Desenvolvimento Web',
    description: 'Construo interfaces e sistemas web funcionais, desde plataformas front-end até aplicações com backend e banco de dados. Trabalhei com Flask e MySQL em sistemas IoT reais, e com HTML, CSS e JavaScript em múltiplos projetos acadêmicos.',
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Flask', 'MySQL', 'Chart.js'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
      </svg>
    ),
    title: 'Estratégia & Performance',
    description: 'Aplico raciocínio analítico e foco em métricas tanto no ambiente corporativo quanto competitivo. No Deals Desk da Motorola analiso cotações e estruturo exceções de preço; no e-sports analisei partidas para identificar pontos de melhoria coletivos.',
    tags: ['Scrum', 'Jira', 'Salesforce', 'KPIs', 'Excel', 'Análise Competitiva'],
  },
]

// ── Project Modal ─────────────────────────────────────────────────────────

function ProjectModal({ project, index, onClose }) {
  const [closing, setClosing] = useState(false)
  const closingRef = useRef(false)

  const handleClose = () => {
    if (closingRef.current) return
    closingRef.current = true
    setClosing(true)
    setTimeout(onClose, 300)
  }

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [])

  const num = String(index + 1).padStart(2, '0')

  return (
    <div className={`modal-overlay${closing ? ' closing' : ''}`} onClick={handleClose}>
      <div className={`modal-panel${closing ? ' closing' : ''}`} onClick={(e) => e.stopPropagation()}>

        {/* ── Esquerda: imagem ── */}
        <div className="modal-img-col">
          {project.img && <img src={project.img} alt={project.title} className="modal-img" />}
          {project.wip && (
            <div className="modal-img-wip-overlay" aria-hidden="true">
              <div className="modal-wip-img-labels">
                <span className="modal-wip-img-label">Em</span>
                <span className="modal-wip-img-label">Desenvolvimento</span>
              </div>
            </div>
          )}
          <div className="modal-img-gradient" />
          <div className="modal-img-footer">
            <span className="modal-img-num">{num}</span>
            <span className="modal-img-category">{project.subtitle}</span>
          </div>
        </div>

        {/* ── Direita: conteúdo ── */}
        <div className="modal-content-col">
          <button className="modal-close" onClick={handleClose} aria-label="Fechar">
            <span>ESC</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="modal-eyebrow">
            <span className="modal-eyebrow-line" />
            PROJETO
          </div>

          <h2 className="modal-title">{project.title}</h2>

          <div className="modal-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="modal-tag">{tag}</span>
            ))}
          </div>

          <p className="modal-desc">{project.description}</p>

          <div className="modal-divider" />

          <div className="modal-actions">
            {project.wip && !project.link && !project.github && !project.linkedin && (
              <div className="modal-wip-badge">
                <span className="modal-wip-dot" />
                Em desenvolvimento
              </div>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer" className="modal-btn modal-btn-primary">
                Ver projeto online →
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="modal-btn modal-btn-ghost modal-btn-github">
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}
            {project.linkedin && (
              <a href={project.linkedin} target="_blank" rel="noreferrer" className="modal-btn modal-btn-ghost modal-btn-linkedin">
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

// ── Subcomponents ─────────────────────────────────────────────────────────

function SectionLabel({ pt, en, className = '' }) {
  return (
    <div className={`section-label${className ? ' ' + className : ''}`}>
      <span><span className="label-dash" />{pt}</span>
      <span>[ {en} ]</span>
    </div>
  )
}

function Accordion({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="accordion reveal reveal-delay-2">
      {items.map((item, i) => (
        <div key={i} className={`acc-item ${open === i ? 'open' : ''}`}>
          <button className="acc-header" onClick={() => setOpen(open === i ? -1 : i)}>
            <span className="acc-topic-icon">{item.icon}</span>
            <span className="acc-question">{item.title}</span>
            <span className="acc-toggle">
              {open === i ? <span>&lt;</span> : <span>&lt;/&gt;</span>}
            </span>
          </button>
          <div className="acc-content">
            <div className="acc-inner">
              <p className="acc-answer">{item.description}</p>
              <div className="acc-tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="acc-tag">{tag}</span>
                ))}
              </div>
              <div className="acc-close-tag">/&gt;</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── App ───────────────────────────────────────────────────────────────────

export default function App() {
  const [form, setForm] = useState({ nome: '', email: '', mensagem: '' })
  const [formStatus, setFormStatus] = useState('idle') // idle | sending | sent | error
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.nome || !form.email || !form.mensagem) return
    setFormStatus('sending')
    emailjs.send(
      'service_xlxe5q9',
      'template_s1fdvrg',
      { name: form.nome, email: form.email, message: form.mensagem },
      'uo2ovH3vL64HHrRyn'
    ).then(() => {
      setFormStatus('sent')
      setForm({ nome: '', email: '', mensagem: '' })
    }).catch(() => {
      setFormStatus('error')
    })
  }

  const [selectedIdx, setSelectedIdx] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [navHidden, setNavHidden] = useState(false)
  const [atTop, setAtTop] = useState(true)
  const lastScrollY = useRef(0)
  const projectsOuterRef = useRef(null)
  const projectsTrackRef = useRef(null)
  const trajOuterRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setAtTop(y < 60)
      if (y > lastScrollY.current && y > 60) {
        setNavHidden(true)
      } else {
        setNavHidden(false)
      }
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const outer = projectsOuterRef.current
    const track = projectsTrackRef.current
    if (!outer || !track) return

    let targetX = 0
    let currentX = 0
    let rafId = null

    const LERP = 0.038 // fator de interpolação — menor = mais atraso visível

    const getOverflow = () => Math.max(track.scrollWidth - window.innerWidth, 0)

    const recalc = () => {
      outer.style.height = `calc(100vh + ${getOverflow()}px)`
    }

    const tick = () => {
      currentX += (targetX - currentX) * LERP

      const overflow = getOverflow()
      currentX = Math.max(-overflow, Math.min(0, currentX))

      track.style.transform = `translateX(${currentX}px)`

      if (Math.abs(targetX - currentX) > 0.1) {
        rafId = requestAnimationFrame(tick)
      } else {
        currentX = targetX
        track.style.transform = `translateX(${targetX}px)`
        rafId = null
      }
    }

    const DEAD_ZONE = 0.18 // primeiros 18% do scroll: cards ficam parados

    const onScroll = () => {
      const outerTop = outer.getBoundingClientRect().top + window.scrollY
      const scrolled = window.scrollY - outerTop
      const maxScroll = outer.offsetHeight - window.innerHeight
      if (maxScroll <= 0) return
      const raw = Math.max(0, Math.min(1, scrolled / maxScroll))
      const progress = raw < DEAD_ZONE ? 0
        : raw > 1 - DEAD_ZONE ? 1
          : (raw - DEAD_ZONE) / (1 - DEAD_ZONE * 2)
      targetX = -progress * getOverflow()
      if (!rafId) rafId = requestAnimationFrame(tick)
    }

    // Run recalc immediately, then again after paint + after images load
    recalc()
    requestAnimationFrame(recalc)
    const imgs = track.querySelectorAll('img')
    imgs.forEach(img => {
      if (img.complete) recalc()
      else img.addEventListener('load', recalc)
    })

    window.addEventListener('resize', recalc)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      imgs.forEach(img => img.removeEventListener('load', recalc))
      window.removeEventListener('resize', recalc)
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    const outer = trajOuterRef.current
    if (!outer) return

    const section = outer.querySelector('.traj-section')
    const entries = [...outer.querySelectorAll('.traj-entry')]
    const n = entries.length

    const LERP = 0.07
    const STEP = 420                        // px de scroll por entrada
    const SLIDE = window.innerHeight * 0.58  // entradas 1+ começam aqui abaixo

    // entry 0 fica parada, entradas 1+ precisam de (n-1) steps
    outer.style.height = `calc(100vh + ${(n - 1) * STEP + 240}px)`

    // apenas entradas 1+ são animadas pelo JS
    const currentY = entries.map(() => SLIDE)
    const targetY = entries.map(() => SLIDE)
    let rafId = null

    // entry 0: sem inline style — CSS controla via .in-view
    // entries 1+: começam abaixo da tela
    entries.forEach((entry, i) => {
      if (i === 0) return
      entry.style.willChange = 'transform, opacity'
      entry.style.transform = `translateY(${SLIDE}px)`
      entry.style.opacity = '0'
    })

    const tick = () => {
      let running = false
      entries.forEach((entry, i) => {
        if (i === 0) return          // entry 0 fica no lugar, CSS trata opacity
        const diff = targetY[i] - currentY[i]
        if (Math.abs(diff) > 0.15) {
          currentY[i] += diff * LERP
          running = true
        } else {
          currentY[i] = targetY[i]
        }
        const pct = 1 - currentY[i] / SLIDE
        entry.style.transform = `translateY(${currentY[i]}px)`
        entry.style.opacity = String(Math.min(1, pct * 1.6))
      })
      rafId = running ? requestAnimationFrame(tick) : null
    }

    const onScroll = () => {
      const scrolled = -outer.getBoundingClientRect().top

      if (scrolled >= -window.innerHeight * 0.18) {
        section.classList.add('in-view')
      }

      // threshold deslocado: entry i (i>0) começa no scroll de (i-1)*STEP
      entries.forEach((_, i) => {
        if (i === 0) return
        const start = (i - 1) * STEP
        const progress = Math.max(0, Math.min(1, (scrolled - start) / STEP))
        targetY[i] = SLIDE * (1 - progress)
      })

      if (!rafId) rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="portfolio">

      {/* ── Grain overlay ── */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* ── Nav ── */}
      <nav className={`nav${navHidden && !menuOpen ? ' nav--hidden' : ''}${atTop && !menuOpen ? ' nav--transparent' : ''}`}>
        <a href="#hero" className="nav-brand" onClick={() => setMenuOpen(false)}>J.L</a>
        <div className="nav-links">
          <a href="#sobre" className="nav-link">Sobre</a>
          <a href="#projetos" className="nav-link">Projetos</a>
          <a href="#trajetoria" className="nav-link">Trajetória</a>
          <a href="#ferramentas" className="nav-link">Ferramentas</a>
          <a href={cvPdf} target="_blank" rel="noreferrer" className="nav-link nav-link--cv">CV ↗</a>
        </div>
        <div className="nav-end">
          <a href="#contato" className="nav-cta">Contato →</a>
          <button
            className={`nav-hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      <div className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-header">
          <span className="mobile-menu-eyebrow">[ Menu ]</span>
          <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Fechar menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <nav className="mobile-menu-links">
          {[
            { href: '#sobre', label: 'Sobre' },
            { href: '#projetos', label: 'Projetos' },
            { href: '#trajetoria', label: 'Trajetória' },
            { href: '#ferramentas', label: 'Ferramentas' },
            { href: '#contato', label: 'Contato' },
          ].map(({ href, label }) => (
            <a key={href} href={href} className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <a href={cvPdf} target="_blank" rel="noreferrer" className="mobile-menu-link mobile-menu-link--cv" onClick={() => setMenuOpen(false)}>
            Currículo ↗
          </a>
        </nav>
        <div className="mobile-menu-footer">
          <span>[ José Longo Neto ]</span>
          <span>© 2026</span>
        </div>
      </div>

      {/* ── 1. Hero ── */}
      <section className="hero" id="hero" style={{ backgroundImage: "url('/images/hero-bg.png')" }}>
        <div className="hero-overlay" />
        <div className="hero-inner">
          <div className="hero-body">
            <h1 className="hero-name">
              <span className="hero-name-italic">José</span>
              <span className="hero-name-bold">Longo</span>
            </h1>
            <div className="hero-sub">
              <span className="hero-role">Dados · Automação · Estratégia</span>
              <p className="hero-bio">
                Transformo dados e sistemas em soluções<br />
                claras, funcionais e bem construídas.
              </p>
            </div>
          </div>
        </div>
        <a href="#sobre" className="hero-arrow" aria-label="Scroll para baixo">
          <svg className="hero-arrow-chevron" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
          <svg className="hero-arrow-chevron hero-arrow-chevron--delay" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </a>
      </section>

      {/* ── 2. Quem sou eu ── */}
      <section className="about" id="sobre">
        <SectionLabel pt="SOBRE" en="About" className="reveal" />
        <div className="about-body">
          <div className="about-left">
            <h2 className="about-title reveal">
              Quem <em>sou eu</em>
            </h2>
            <div className="about-info-list reveal reveal-delay-1">
              <div className="about-info-item">
                <span className="info-label">LOCALIZAÇÃO</span>
                <span className="info-value">São Paulo, Brasil</span>
              </div>
              <div className="about-info-item">
                <span className="info-label">FORMAÇÃO</span>
                <span className="info-value">ESPM — Ciência de Dados e Negócios</span>
              </div>
              <div className="about-info-item">
                <span className="info-label">ATUAÇÃO ATUAL</span>
                <span className="info-value">Deals Desk Intern @ Motorola Solutions</span>
              </div>
            </div>
            <a href={cvPdf} target="_blank" rel="noreferrer" className="about-cv-btn reveal reveal-delay-2">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Ver Currículo
            </a>
          </div>
          <div className="about-right">
            <p className="about-bio reveal">
              Sou José Longo, estudante de Ciência de Dados e Negócios, interessado em
              transformar ideias, dados e sistemas em soluções claras, funcionais e bem
              construídas.
            </p>
            <p className="about-bio reveal reveal-delay-1">
              Tenho experiência em projetos acadêmicos e em ambiente corporativo,
              atuando com análise de dados, integração de sistemas e construção de
              dashboards. Atualmente, no Deals Desk da Motorola Solutions, trabalho com
              lógica de negócio, automação e apoio a decisões estratégicas.
            </p>
            <p className="about-bio reveal reveal-delay-2">
              Gosto de explorar a interseção entre tecnologia, design e resolução de
              problemas, buscando sempre criar soluções que sejam não apenas
              eficientes, mas também intuitivas e bem pensadas.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. Meus Projetos ── */}
      <div className="projects-scroll-outer" id="projetos" ref={projectsOuterRef}>
        <section className="projects-sticky">
          <SectionLabel pt="PROJETOS" en="Projects" className="reveal" />
          <h2 className="projects-title reveal">
            Meus <em>projetos</em>
          </h2>
          <span className="projects-count reveal reveal-delay-1">[{projects.length} PROJETOS EM DESTAQUE]</span>
          <div className="projects-track" ref={projectsTrackRef}>
            {projects.map((p, i) => (
              <div className={`project-card${p.wip ? ' project-card--wip' : ''}`} key={i} onClick={() => setSelectedIdx(i)}>
                <div className="project-img">
                  {p.img ? (
                    <>
                      <img src={p.img} alt={p.title} className="img-bg" />
                      {!p.wip && <img src={p.img} alt={p.title} className="img-front" />}
                    </>
                  ) : null}
                  {p.wip && (
                    <div className="wip-overlay" aria-label="Em desenvolvimento">
                      <div className="wip-overlay-labels">
                        <span className="wip-label">Em</span>
                        <span className="wip-label">Desenvolvimento</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="project-meta">
                  <span className="project-name">{p.title}</span>
                  <span className="project-sub">{p.subtitle}</span>
                </div>
              </div>
            ))}
            <div className="projects-track-end" aria-hidden="true" />
          </div>
        </section>
      </div>

      {/* ── 4. Trajetória ── */}
      <div className="traj-outer" id="trajetoria" ref={trajOuterRef}>
        <section className="traj-section">
          <SectionLabel pt="TRAJETÓRIA" en="Trajectory" />
          <div className="traj-body">
            <div className="traj-left">
              <h2 className="traj-title">
                <span className="traj-title-serif">O caminho</span>
                <span className="traj-title-bold">até hoje</span>
              </h2>
              <p>A história até aqui — de onde vem cada projeto e cada decisão.</p>
            </div>
            <div className="traj-right">
              {trajectory.map((t, i) => (
                <div className="traj-entry" key={i}>
                  <div className="traj-company">
                    <strong>{t.company}</strong>
                    <span>[{t.location}]</span>
                  </div>
                  <div className="traj-period-wrap">
                    <span className="traj-period">{t.period}</span>
                    <span className="traj-role">
                      {t.current && <span className="traj-dot" />}
                      {t.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── 5. Ferramentas ── */}
      <section className="tools-section" id="ferramentas">
        <SectionLabel pt="Ferramentas" en="Tools" className="reveal" />
        <h2 className="tools-heading reveal reveal-delay-1">
          Analiso dados,<br />
          <em>construo soluções.</em>
        </h2>
        <Accordion items={tools} />
      </section>

      {/* ── 6. Contato ── */}
      <section className="contact" id="contato">
        <SectionLabel pt="CONTATO" en="Contact" className="reveal" />

        <div className="contact-header">
          <h2 className="contact-title reveal">
            Vamos <em>conversar.</em>
          </h2>
          <p className="contact-desc reveal reveal-delay-1">
            Estou aberto a oportunidades,<br />
            colaborações e novos projetos.<br />
            Fale comigo.
          </p>
        </div>

        <div className="contact-form-section reveal reveal-delay-1">
          {formStatus === 'sent' ? (
            <div className="form-success">
              <span className="form-success-icon">✓</span>
              <p>Mensagem enviada! Responderei em breve.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label>Nome</label>
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={form.nome}
                    onChange={set('nome')}
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="email@gmail.com"
                    value={form.email}
                    onChange={set('email')}
                    required
                  />
                </div>
              </div>
              <div className="form-field">
                <label>Mensagem</label>
                <textarea
                  placeholder="Serviços, Trabalho, etc..."
                  rows={5}
                  value={form.mensagem}
                  onChange={set('mensagem')}
                  required
                />
              </div>
              {formStatus === 'error' && (
                <p className="form-error">Algo deu errado. Tente novamente.</p>
              )}
              <button type="submit" className="btn-submit" disabled={formStatus === 'sending'}>
                {formStatus === 'sending' ? 'Enviando...' : 'Enviar'}
              </button>
            </form>
          )}
        </div>

        <div className="contact-cards">
          <div className="contact-card reveal">
            <div className="contact-card-top">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <span>Email</span>
            </div>
            <a href="mailto:joselongoneto@gmail.com" className="contact-card-value">
              joselongoneto@gmail.com
            </a>
            <p className="contact-card-note">Respondendo em até 24h</p>
          </div>

          <div className="contact-card reveal reveal-delay-1">
            <div className="contact-card-top">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span>LinkedIn</span>
            </div>
            <a href="https://www.linkedin.com/in/jos%C3%A9-longo/" target="_blank" rel="noreferrer" className="contact-card-value">
              /josé-longo
            </a>
            <p className="contact-card-note">Conecte-se comigo</p>
          </div>

          <div className="contact-card reveal reveal-delay-2">
            <div className="contact-card-top">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>WhatsApp</span>
            </div>
            <a href="https://wa.me/5511992581927" target="_blank" rel="noreferrer" className="contact-card-value">
              +55 11 99258-1927
            </a>
            <p className="contact-card-note">Disponível seg – sáb</p>
          </div>
        </div>

        <footer className="footer">
          <span>[ José Longo Neto ]</span>
          <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="scroll-arrow">↑</span>
            <span>Topo</span>
          </button>
          <span className="footer-right">[ © 2026 ]</span>
        </footer>
      </section>

      {selectedIdx !== null && (
        <ProjectModal
          project={projects[selectedIdx]}
          index={selectedIdx}
          onClose={() => setSelectedIdx(null)}
        />
      )}

    </div>
  )
}

