import { useState, useEffect, useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { ArrowRight, X, Menu, MapPin } from "lucide-react";
import { AuthProvider } from "./contexts/AuthContext";
import { ProjectsProvider } from "./contexts/ProjectsContext";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ProjectsShowcasePage from "./pages/ProjectsShowcasePage";
import ProjectDetailPage from "./pages/ProjectDetailPage";

const InstagramIcon = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
  
  :root {
    --color-bg: #111111;
    --color-text: #fafafa;
    --color-text-muted: #A8A8A8;
    --color-accent: #84907a;
  }
  
  body {
    background-color: var(--color-bg);
    color: var(--color-text);
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }
  
  .font-serif {
    font-family: 'Playfair Display', serif;
  }
  
  .main-wrapper {
    position: relative;
    z-index: 10;
    background-color: #111111;
    margin-bottom: 100vh;
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  }
  
  .footer-reveal {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 1;
  }
  
  /* Esconder barras de rolagem para uma experiência mais limpa */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #111111;
  }
  ::-webkit-scrollbar-thumb {
    background: #3f3f46;
    border-radius: 4px;
  }
  
  /* Classe para esconder a barra de rolagem dos sliders */
  .no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }

  /* Horizontal Pinned Slider */
  .horiz-track {
    will-change: transform;
    display: flex;
  }
  
  .horiz-slide-card {
    background: rgba(255, 255, 255, 0.015);
    border: 1px solid rgba(255, 255, 255, 0.07);
    transition: border-color 0.4s ease;
  }

  .horiz-slide-num {
    font-family: 'Playfair Display', serif;
    font-size: 6rem;
    line-height: 1;
    color: white;
    opacity: 0.06;
    position: absolute;
    bottom: 1.5rem;
    right: 2rem;
    pointer-events: none;
    user-select: none;
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .slide-fade-in {
    animation: fadeInUp 0.5s ease forwards;
  }

  /* ── Infinite Marquee Carousel ── */
  @keyframes marquee-scroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .marquee-track {
    display: flex;
    width: max-content;
    animation: marquee-scroll 28s linear infinite;
    will-change: transform;
  }

  .marquee-track.paused {
    animation-play-state: paused;
  }

  .marquee-wrapper {
    overflow: hidden;
    mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
  }

  /* border-radius: 0 — linguagem arquitetural, cantos limpos */
  .marquee-item {
    flex-shrink: 0;
    margin-right: 1.25rem;
    border-radius: 0;
    overflow: hidden;
    position: relative;
    cursor: zoom-in;
    transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                box-shadow 0.5s ease;
  }

  .marquee-item:hover {
    transform: scale(1.03);
    box-shadow: 0 20px 60px rgba(0,0,0,0.6);
  }

  .marquee-item img {
    display: block;
    width: 340px;
    height: 240px;
    object-fit: cover;
    transition: transform 0.7s ease;
  }

  .marquee-item:hover img {
    transform: scale(1.08);
  }

  .marquee-item-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 55%, transparent 100%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1.25rem 1.25rem;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .marquee-item:hover .marquee-item-overlay {
    opacity: 1;
  }

  /* ── WhatsApp FAB ── */
  @keyframes fab-pulse {
    0%, 100% { box-shadow: 0 4px 24px rgba(37,211,102,0.3), 0 0 0 0 rgba(37,211,102,0.35); }
    55%       { box-shadow: 0 4px 24px rgba(37,211,102,0.3), 0 0 0 12px rgba(37,211,102,0); }
  }

  .whatsapp-fab {
    position: fixed;
    bottom: 2rem;
    left: 2rem;
    z-index: 70;
    width: 56px;
    height: 56px;
    background: #25D366;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    animation: fab-pulse 3s ease-in-out infinite;
    transition: transform 0.25s ease, background 0.25s ease;
    text-decoration: none;
  }

  .whatsapp-fab:hover {
    transform: scale(1.1);
    background: #1ebe5d;
    animation-play-state: paused;
  }

  /* ── Secondary CTA Button — cantos retos, linguagem arquitetural ── */
  .secondary-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    border: 1px solid rgba(255,255,255,0.25);
    color: #fff;
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-weight: 600;
    padding: 12px 20px;
    background: transparent;
    cursor: pointer;
    transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    font-family: 'Inter', sans-serif;
  }

  .secondary-cta-btn:hover {
    background: #fff;
    color: #111111;
    border-color: #fff;
  }

  .secondary-cta-btn .arrow-icon {
    transition: transform 0.3s ease;
    flex-shrink: 0;
  }

  .secondary-cta-btn:hover .arrow-icon {
    transform: translateX(5px);
  }

  /* ── Nav CTA Button — alto contraste ── */
  .nav-cta-btn {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    background: #fff;
    color: #111111;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease;
    white-space: nowrap;
    font-family: 'Inter', sans-serif;
  }

  .nav-cta-btn:hover {
    background: #e0e0e0;
  }

  /* ── Form Inputs — anti-zoom iOS (font-size >= 16px) ── */
  .form-input-field {
    font-size: 16px;
    background: transparent;
    width: 100%;
    outline: none;
    color: #fff;
    border: none;
    padding: 0;
    font-family: 'Inter', sans-serif;
  }

  .form-input-field::placeholder {
    color: #4a4a4a;
  }

  .form-input-field:focus {
    color: #fff;
  }

  .form-input-field:focus::placeholder {
    color: #333;
  }
`;

const fachadas = [
  {
    id: 1,
    title: "Casa Horizonte",
    category: "Projeto",
    img: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Vista do Vale",
    category: "Em Obras",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Jardins de Monet",
    category: "Entregue",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Edifício Lumina",
    category: "Lançamento",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Casa Horizonte",
    category: "Projeto",
    img: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const imoveis = [
  {
    id: 1,
    name: "Cobertura Duplex",
    location: "Jardins, SP",
    price: "Sob Consulta",
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Mansão Suspenso",
    location: "Itaim Bibi, SP",
    price: "R$ 8.5M",
    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Casa de Campo Contemporânea",
    location: "Fazenda Boa Vista, SP",
    price: "R$ 12.0M",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Villa Botânica",
    location: "Alto de Pinheiros, SP",
    price: "R$ 9.2M",
    img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const acabamentos = [
  {
    id: 1,
    title: "Mármore Carrara",
    badge: "Premium",
    img: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Madeira Nobre",
    badge: "Novo",
    img: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Design Biofílico",
    badge: "Sustentável",
    img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const empreendimentos = [
  {
    id: 1,
    name: "Reserva Figueiras",
    location: "Nova Lima, MG",
    status: "Pronto para Morar",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Uma síntese de design contemporâneo e integração com a natureza. Espaços amplos que redefinem o conceito de liberdade habitacional.",
  },
  {
    id: 2,
    name: "Corporate Vanguarda",
    location: "Faria Lima, SP",
    status: "Lançamento",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description:
      "O novo marco arquitetônico corporativo. Fachada em pele de vidro, certificação sustentável internacional e lajes de altíssimo padrão.",
  },
  {
    id: 3,
    name: "Península Oceânica",
    location: "Balneário Camboriú, SC",
    status: "Em Obras",
    img: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description:
      "A exclusividade de viver de frente para o mar com infraestrutura de resort. Apartamentos desenhados para o máximo conforto e vistas panorâmicas.",
  },
];

function HomePage() {
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [projectType, setProjectType] = useState("construcao"); // Estado para o Formulário Inteligente
  const [activeSlide, setActiveSlide] = useState(0);   // slide ativo — Empreendimentos
  const [activeSlide2, setActiveSlide2] = useState(0); // slide ativo — Lançamentos
  const [activeSection, setActiveSection] = useState(0); // seção ativa global
  const containerRef = useRef(null);
  const horizSliderRef = useRef(null);   // empreendimentos pin
  const horizSlider2Ref = useRef(null);  // lançamentos pin

  // Refs para os sliders horizontais legados (mantidos por segurança)
  const slider1Ref = useRef(null);
  const slider2Ref = useRef(null);

  // Lógica de drag-to-scroll para desktop
  useEffect(() => {
    const sliders = [slider1Ref.current, slider2Ref.current].filter(Boolean);
    const cleanups = [];
    
    sliders.forEach(slider => {
      let isDown = false;
      let startX;
      let scrollLeft;

      const onMouseDown = (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        slider.style.scrollSnapType = 'none'; // Desabilita o snap durante o arraste
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      };
      const onMouseLeave = () => {
        isDown = false;
        slider.style.cursor = 'grab';
        slider.style.scrollSnapType = 'x mandatory'; // Reativa o snap
      };
      const onMouseUp = () => {
        isDown = false;
        slider.style.cursor = 'grab';
        slider.style.scrollSnapType = 'x mandatory'; // Reativa o snap
      };
      const onMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5; // Velocidade do scroll
        slider.scrollLeft = scrollLeft - walk;
      };

      slider.style.cursor = 'grab';
      slider.addEventListener('mousedown', onMouseDown);
      slider.addEventListener('mouseleave', onMouseLeave);
      slider.addEventListener('mouseup', onMouseUp);
      slider.addEventListener('mousemove', onMouseMove);

      cleanups.push(() => {
        slider.removeEventListener('mousedown', onMouseDown);
        slider.removeEventListener('mouseleave', onMouseLeave);
        slider.removeEventListener('mouseup', onMouseUp);
        slider.removeEventListener('mousemove', onMouseMove);
      });
    });

    return () => cleanups.forEach(c => c());
  }, []);

  // ── Monitorar Scroll para Navbar ──
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Rastrear seção ativa (sidebar global) via IntersectionObserver ──
  useEffect(() => {
    const sectionEls = document.querySelectorAll('[data-section]');
    if (!sectionEls.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(parseInt(entry.target.dataset.section, 10));
          }
        });
      },
      { threshold: 0.25 }
    );
    sectionEls.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Carregar GSAP de forma segura via injeção de script
  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    Promise.all([
      loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js",
      ),
    ])
      .then(() => {
        return loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js",
        );
      })
      .then(() => {
        setGsapLoaded(true);
      })
      .catch((err) => console.error("Error loading GSAP:", err));
  }, []);

  // Inicializar Animações quando GSAP estiver pronto
  useEffect(() => {
    if (!gsapLoaded || !containerRef.current) return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      // Efeito Parallax no fundo da seção Hero
      gsap.to(".hero-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Elementos surgindo suavemente ao rolar a página (Fade-up)
      gsap.utils.toArray(".gsap-fade-up").forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // ── Pin horizontal — Lançamentos Exclusivos ──
      if (horizSlider2Ref.current) {
        const slider2 = horizSlider2Ref.current;
        const track2 = slider2.querySelector('.horiz-track-2');
        if (track2) {
          gsap.to(track2, {
            x: () => -(track2.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: slider2,
              start: "top top",
              end: () => "+=" + (track2.scrollWidth - window.innerWidth),
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                const total = fachadas.length;
                const idx = Math.min(
                  Math.floor(self.progress * total),
                  total - 1
                );
                setActiveSlide2(idx);
              },
            },
          });
        }
      }

      // ── Pin horizontal — Nossos Empreendimentos ──
      if (horizSliderRef.current) {
        const slider = horizSliderRef.current;
        const track = slider.querySelector('.horiz-track');
        if (track) {
          gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: slider,
              start: "top top",
              end: () => "+=" + (track.scrollWidth - window.innerWidth),
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                const total = empreendimentos.length;
                const idx = Math.min(
                  Math.floor(self.progress * total),
                  total - 1
                );
                setActiveSlide(idx);
              },
            },
          });
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [gsapLoaded]);

  // Labels das seções para o sidebar global
  const pageSections = [
    { label: 'INÍCIO' },
    { label: 'LANÇAMENTOS' },
    { label: 'IMÓVEIS' },
    { label: 'DETALHES' },
    { label: 'PROJETOS' },
    { label: 'CONTATO' },
  ];

  return (
    <div
      ref={containerRef}
      className="relative bg-[#111111] w-full min-h-screen"
    >


      {/* ══ Sidebar Global de Seções (fixo, fora do main-wrapper) ══ */}
      <div className="fixed right-5 md:right-8 top-1/2 -translate-y-1/2 z-[60] hidden md:flex flex-col items-center gap-5 pointer-events-none">
        <span
          className="text-[8px] font-mono text-zinc-700 uppercase tracking-widest mb-2"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          SEÇÕES
        </span>
        <div className="relative flex flex-col items-center gap-[14px]">
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-zinc-800/60" />
          {pageSections.map((sec, i) => (
            <div key={i} className="relative z-10 flex items-center gap-[7px]">
              <span
                className={`text-[10px] font-mono transition-all duration-500 ${
                  i === activeSection ? 'text-white' : 'text-zinc-700'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              {i === activeSection && (
                <span className="w-[5px] h-[5px] rounded-full bg-[#84907a] flex-none transition-all duration-300" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="main-wrapper">
        <nav
          className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-zinc-950/95 backdrop-blur-md py-4 shadow-lg shadow-black/20" : "bg-transparent py-6"}`}
        >
          <div className="container mx-auto px-6 flex items-center justify-between">
            <div className="text-2xl font-serif text-white tracking-wider font-bold">
              HORIZONTE.
            </div>
            <div className="hidden md:flex items-center gap-10 text-sm font-medium text-zinc-400">
              <a href="#lancamentos" className="hover:text-white transition-colors">
                Empreendimentos
              </a>
              <Link to="/projetos" className="hover:text-white transition-colors" style={{ textDecoration: 'none' }}>
                Nossos Projetos
              </Link>
              <a href="#detalhes" className="hover:text-white transition-colors">
                Sustentabilidade
              </a>
              <a href="#contato" className="hover:text-white transition-colors">
                Contato
              </a>
            </div>
            <div className="hidden md:flex items-center gap-5">
              <a
                href="tel:+551140028922"
                className="text-xs font-medium text-zinc-500 hover:text-white transition-colors tracking-wider"
              >
                Agendar Visita
              </a>
              <button className="nav-cta-btn">
                Falar com um Corretor
              </button>
            </div>
            <button className="md:hidden text-white">
              <Menu size={24} />
            </button>
          </div>
        </nav>

        {}
        <section data-section="0" className="hero-section relative h-screen w-full overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <div
              className="hero-bg w-full h-[130%] bg-cover bg-center absolute top-[-15%]"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
              }}
            ></div>
            {/* Vignette sutil — preserva a textura e iluminação real da foto */}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(to top, rgba(17,17,17,0.98) 0%, rgba(17,17,17,0.45) 30%, rgba(0,0,0,0) 60%)'
            }} />
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.38) 100%)'
            }} />
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-20">
            <span className="gsap-fade-up uppercase tracking-[0.3em] text-xs font-semibold text-[#84907a] mb-6 block">
              Alto Padrão em Cada Detalhe
            </span>
            <h1 className="gsap-fade-up font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
              A Arte de <br className="hidden md:block" /> Viver Bem.
            </h1>
            <p className="gsap-fade-up text-[#B0B0B0] text-lg md:text-xl max-w-2xl font-light mb-10">
              Arquitetura contemporânea e sofisticação atemporal para você
              construir o seu legado.
            </p>
            {/* border-radius: 0 — segue a linguagem das linhas retas da arquitetura */}
            <button className="gsap-fade-up group flex items-center gap-4 bg-white text-zinc-950 px-8 py-4 font-semibold tracking-wide text-sm hover:bg-zinc-100 transition-colors">
              Conhecer Empreendimentos
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </section>

        {/* ══ Lançamentos Exclusivos — Horizontal Pin Slider ══ */}
        <section
          id="lancamentos"
          ref={horizSlider2Ref}
          data-section="1"
          className="relative bg-[#111111] overflow-hidden"
          style={{ height: '100vh' }}
        >
          {/* Top Header Bar */}
          <div className="absolute top-0 left-0 right-0 z-30 flex justify-between items-center px-8 md:px-12 py-6 border-b border-white/[0.05]">
            <span className="text-[9px] font-mono uppercase tracking-[0.28em] text-zinc-500">
              02. LANÇAMENTOS EXCLUSIVOS
            </span>
            <span
              key={activeSlide2}
              className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/70 slide-fade-in hidden md:block"
            >
              {fachadas[activeSlide2]?.title}
            </span>
          </div>

          {/* Horizontal Track */}
          <div className="horiz-track-2 h-full" style={{ display: 'flex', willChange: 'transform' }}>
            {fachadas.map((item, index) => (
              <div
                key={item.id}
                className="flex-none w-screen h-screen flex items-center justify-center"
                style={{ padding: '6rem 4rem 4rem' }}
              >
                {/* Card — imagem full com overlay de texto */}
                <div
                  className="horiz-slide-card relative w-full h-full overflow-hidden"
                  style={{ maxHeight: '75vh' }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

                  {/* Text overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end px-10 md:px-16 py-12 md:py-16">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="h-px w-6 bg-[#84907a] flex-none" />
                      <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#84907a]">
                        {item.category}
                      </span>
                    </div>
                    <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.05]" style={{ maxWidth: '700px' }}>
                      {item.title}
                    </h2>
                    <button className="group flex items-center gap-4 text-[9px] uppercase tracking-[0.22em] font-semibold border-b border-zinc-600 pb-2 hover:border-[#84907a] text-white transition-all duration-300 w-fit">
                      Ver Projeto
                      <ArrowRight size={13} className="text-[#84907a] group-hover:translate-x-2 transition-transform duration-300" />
                    </button>
                  </div>

                  {/* Ghost index */}
                  <span className="horiz-slide-num">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Counter */}
          <div className="absolute bottom-6 left-8 md:left-12 z-30">
            <span className="font-mono text-sm">
              <span className="text-white font-medium">{String(activeSlide2 + 1).padStart(2, '0')}</span>
              <span className="text-zinc-700 mx-1">/</span>
              <span className="text-zinc-600">{String(fachadas.length).padStart(2, '0')}</span>
            </span>
          </div>
        </section>

        <section data-section="2" className="py-24 md:py-32 px-6 bg-zinc-900 border-y border-zinc-800 relative z-10">
          <div className="container mx-auto">
            <div className="text-center mb-16 md:mb-24 gsap-fade-up">
              <h2 className="font-serif text-4xl md:text-5xl mb-4 text-white">
                Imóveis em Destaque
              </h2>
              <p className="text-zinc-400 font-light max-w-xl mx-auto">
                Obras primas selecionadas para os clientes mais exigentes, com
                vistas deslumbrantes e design inigualável.
              </p>

            </div>

            <div ref={slider2Ref} className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-8 no-scrollbar w-full pl-4 md:pl-0">
              {imoveis.map((imovel) => (
                <div
                  key={imovel.id}
                  className="gsap-fade-up flex flex-col group cursor-pointer flex-none w-[82vw] md:w-[58vw] lg:w-[43vw] snap-center md:snap-start"
                >
                  <div className="relative overflow-hidden h-[350px] md:h-[500px] mb-6">
                    <img
                      src={imovel.img}
                      alt={imovel.name}
                      draggable={false}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-serif mb-2 text-white">
                        {imovel.name}
                      </h3>
                      <p className="text-zinc-400 flex items-center gap-2 font-light text-sm">
                        <MapPin size={14} /> {imovel.location}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-[#84907a] mb-2 font-medium">
                        {imovel.price}
                      </p>
                      <button className="secondary-cta-btn">
                        Conhecer Imóvel
                        <ArrowRight size={12} className="arrow-icon" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="detalhes" data-section="3" className="py-24 md:py-32 bg-[#111111] relative z-10 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="mb-16 gsap-fade-up">
              <h2 className="font-serif text-4xl md:text-5xl mb-4 text-white">
                Atenção aos Detalhes
              </h2>
              <p className="text-zinc-400 font-light max-w-lg">
                Nosso padrão de acabamento é reconhecido mundialmente. Materiais
                nobres e execução impecável.
              </p>
            </div>
          </div>

          {/* ── Infinite Marquee Carousel ── */}
          <div
            className="marquee-wrapper"
            onMouseEnter={e => e.currentTarget.querySelector('.marquee-track').classList.add('paused')}
            onMouseLeave={e => e.currentTarget.querySelector('.marquee-track').classList.remove('paused')}
          >
            <div className="marquee-track">
              {/* original set */}
              {[...acabamentos, ...acabamentos, ...acabamentos].map((item, i) => (
                <div
                  key={`a-${i}`}
                  className="marquee-item"
                  onClick={() => setLightboxImg(item.img)}
                >
                  <img src={item.img} alt={item.title} />
                  <div className="marquee-item-overlay">
                    <span
                      style={{
                        fontSize: '9px',
                        fontFamily: 'monospace',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        background: '#84907a',
                        color: '#fff',
                        padding: '2px 8px',
                        marginBottom: '6px',
                        alignSelf: 'flex-start',
                      }}
                    >
                      {item.badge}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '1.1rem',
                        color: '#fff',
                      }}
                    >
                      {item.title}
                    </span>
                  </div>
                </div>
              ))}
              {/* duplicate set for seamless loop */}
              {[...acabamentos, ...acabamentos, ...acabamentos].map((item, i) => (
                <div
                  key={`b-${i}`}
                  className="marquee-item"
                  onClick={() => setLightboxImg(item.img)}
                >
                  <img src={item.img} alt={item.title} />
                  <div className="marquee-item-overlay">
                    <span
                      style={{
                        fontSize: '9px',
                        fontFamily: 'monospace',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        background: '#84907a',
                        color: '#fff',
                        padding: '2px 8px',
                        marginBottom: '6px',
                        alignSelf: 'flex-start',
                      }}
                    >
                      {item.badge}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '1.1rem',
                        color: '#fff',
                      }}
                    >
                      {item.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ Nossos Empreendimentos — Horizontal Pin Slider ══ */}
        <section
          ref={horizSliderRef}
          data-section="4"
          className="relative bg-[#111111] overflow-hidden border-t border-zinc-900"
          style={{ height: '100vh' }}
        >
          {/* ── Top Header Bar ── */}
          <div className="absolute top-0 left-0 right-0 z-30 flex justify-between items-center px-8 md:px-12 py-6 border-b border-white/[0.05]">
            <span className="text-[9px] font-mono uppercase tracking-[0.28em] text-zinc-500">
              05. NOSSOS EMPREENDIMENTOS
            </span>
            <span
              key={activeSlide}
              className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/70 slide-fade-in hidden md:block"
            >
              {empreendimentos[activeSlide]?.name}
            </span>
          </div>

          {/* ── Horizontal Track ── */}
          <div className="horiz-track h-full">
            {empreendimentos.map((emp, index) => (
              <div
                key={emp.id}
                className="flex-none w-screen h-screen flex items-center justify-center"
                style={{ padding: '5rem 2.5rem 2.5rem' }}
              >
                {/* Card */}
                <div
                  className="horiz-slide-card w-full h-full overflow-hidden flex flex-col md:flex-row"
                  style={{ maxWidth: '1400px' }}
                >
                  {/* Image Side */}
                  <div className="relative flex-none w-full md:w-[58%] h-52 md:h-full overflow-hidden">
                    <img
                      src={emp.img}
                      alt={emp.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden" />
                    {/* Status badge */}
                    <div className="absolute top-6 left-6">
                      <span className="text-[8px] font-mono uppercase tracking-[0.22em] bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 text-[#84907a] border border-[#84907a]/40">
                        {emp.status}
                      </span>
                    </div>
                    {/* Ghost index number */}
                    <span className="horiz-slide-num">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Text Side */}
                  <div className="flex-1 flex flex-col justify-center px-8 md:px-14 py-8 md:py-16 overflow-auto">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="h-px w-6 bg-[#84907a] flex-none" />
                      <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-zinc-500 flex items-center gap-2">
                        <MapPin size={10} className="text-[#84907a] flex-none" />
                        {emp.location}
                      </span>
                    </div>

                    <h2 className="font-serif text-3xl md:text-[2.8rem] lg:text-5xl text-white mb-6 leading-[1.1]">
                      {emp.name}
                    </h2>

                    <p className="text-zinc-400 font-light leading-relaxed mb-10 text-sm md:text-base" style={{ maxWidth: '360px' }}>
                      {emp.description}
                    </p>

                    <button className="secondary-cta-btn">
                      Explorar Projeto
                      <ArrowRight size={12} className="arrow-icon" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Bottom Counter ── */}
          <div className="absolute bottom-6 left-8 md:left-12 z-30">
            <span className="font-mono text-sm">
              <span className="text-white font-medium">
                {String(activeSlide + 1).padStart(2, '0')}
              </span>
              <span className="text-zinc-700 mx-1">/</span>
              <span className="text-zinc-600">
                {String(empreendimentos.length).padStart(2, '0')}
              </span>
            </span>
          </div>
        </section>

        <section id="contato" data-section="5" className="py-24 md:py-32 px-6 bg-[#111111] relative z-10">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16 gsap-fade-up">
              <span className="uppercase tracking-[0.2em] text-xs font-semibold text-[#84907a] mb-4 block">
                Inicie seu Legado
              </span>
              <h2 className="font-serif text-4xl md:text-5xl mb-4 text-white">
                Conte-nos sobre o seu projeto
              </h2>
              <p className="text-zinc-400 font-light max-w-xl mx-auto">
                Nossa equipe de especialistas está pronta para transformar a sua
                visão em uma obra de arte habitável.
              </p>
            </div>

            <form
              className="gsap-fade-up flex flex-col gap-10"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col border-b border-zinc-700 pb-2 focus-within:border-[#84907a] transition-colors">
                  <label className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    placeholder="Como deseja ser chamado?"
                    className="form-input-field"
                  />
                </div>
                <div className="flex flex-col border-b border-zinc-700 pb-2 focus-within:border-[#84907a] transition-colors">
                  <label className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
                    Telefone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="(00) 00000-0000"
                    className="form-input-field"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-xs uppercase tracking-wider text-zinc-500">
                  Tipo de Projeto
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={() => setProjectType("construcao")}
                    className={`flex-1 py-4 px-6 text-sm font-medium tracking-wide transition-all duration-300 border ${projectType === "construcao" ? "border-[#84907a] text-white bg-[#84907a]/10" : "border-zinc-800 text-zinc-400 hover:border-zinc-600"}`}
                  >
                    Construção do Zero
                  </button>
                  <button
                    type="button"
                    onClick={() => setProjectType("reforma")}
                    className={`flex-1 py-4 px-6 text-sm font-medium tracking-wide transition-all duration-300 border ${projectType === "reforma" ? "border-[#84907a] text-white bg-[#84907a]/10" : "border-zinc-800 text-zinc-400 hover:border-zinc-600"}`}
                  >
                    Reforma de Alto Padrão
                  </button>
                </div>
              </div>

              <div className="flex flex-col border-b border-zinc-700 pb-2 focus-within:border-[#84907a] transition-colors">
                <label className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
                  Metragem Estimada
                </label>
                  <input
                    type="text"
                    placeholder="Ex: 500m²"
                    className="form-input-field"
                  />
              </div>

              <div className="mt-8">
                {/* Botão full-width — fricção zero, contraste máximo */}
                <button className="group flex items-center justify-center w-full gap-4 bg-white text-zinc-950 px-8 py-5 font-semibold tracking-wide text-sm hover:bg-zinc-100 transition-colors">
                  Enviar Solicitação
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>

      {/* Footer Reveal — credibilidade institucional */}
      <footer className="footer-reveal flex flex-col">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600607688969-a5bfcd64bd0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Footer Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/82"></div>
        </div>

        {/* CTA principal */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#84907a] mb-6 block">
              Construindo Legados Desde 2003
            </span>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white text-center leading-tight max-w-5xl mb-10">
              Realize o seu{" "}
              <br className="hidden md:block" />
              <em>patrimônio.</em>
            </h2>
            <a
              href="tel:+551140028922"
              className="inline-flex items-center gap-4 border border-white/30 text-white text-[10px] uppercase tracking-[0.2em] font-semibold px-8 py-4 hover:bg-white hover:text-zinc-950 transition-all duration-300"
            >
              Falar com um Especialista
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Barra de credenciais */}
        <div className="relative z-10 border-t border-white/10">
          <div className="px-6 md:px-12 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Identidade */}
            <div>
              <div className="font-serif text-xl text-white mb-3">HORIZONTE.</div>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-[220px]">
                Arquitetura contemporânea e sofisticação atemporal.
                Presença em SP, MG e SC.
              </p>
            </div>

            {/* Certificações */}
            <div>
              <div className="text-[9px] font-mono uppercase tracking-[0.25em] text-zinc-600 mb-4">
                Certificações &amp; Registro
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="border border-zinc-700 text-zinc-400 text-[9px] font-mono uppercase tracking-wider px-3 py-1.5">
                  PBQP-H Nível A
                </span>
                <span className="border border-zinc-700 text-zinc-400 text-[9px] font-mono uppercase tracking-wider px-3 py-1.5">
                  ISO 9001:2015
                </span>
                <span className="border border-zinc-700 text-zinc-400 text-[9px] font-mono uppercase tracking-wider px-3 py-1.5">
                  ISO 14001
                </span>
              </div>
              <p className="text-[11px] text-zinc-500">
                CRECI-SP J-12.847 &nbsp;|&nbsp; CRECI-MG J-9.203
              </p>
            </div>

            {/* Escritório */}
            <div>
              <div className="text-[9px] font-mono uppercase tracking-[0.25em] text-zinc-600 mb-4">
                Escritório Central
              </div>
              <address className="text-[11px] text-zinc-400 leading-relaxed not-italic">
                Av. Brigadeiro Faria Lima, 3.477 — 14º andar<br />
                Itaim Bibi, São Paulo — SP, 04538-133<br />
                <a
                  href="tel:+551140028922"
                  className="hover:text-white transition-colors mt-1 inline-block"
                >
                  (11) 4002-8922
                </a>
              </address>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="px-6 md:px-12 py-5 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600 border-t border-white/[0.05]">
            <p>© 2026 Construtora Horizonte. Todos os direitos reservados.</p>
            <div className="flex items-center gap-6 mt-3 md:mt-0">
              <a
                href="#"
                className="hover:text-zinc-300 transition-colors flex items-center gap-2"
              >
                <InstagramIcon size={16} /> Instagram
              </a>
              <a href="#" className="hover:text-zinc-300 transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-zinc-300 transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8">
          <button
            className="absolute top-6 right-6 md:top-8 md:right-8 text-white/70 hover:text-white transition-colors z-50 bg-black/50 p-2 rounded-full"
            onClick={() => setLightboxImg(null)}
          >
            <X size={24} />
          </button>
          <img
            src={lightboxImg}
            alt="Detalhe Acabamento Ampliado"
            className="max-w-full max-h-full object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* ── WhatsApp FAB — canal direto, sempre visível ── */}
      <a
        id="whatsapp-fab"
        href="https://wa.me/5511940028922?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20empreendimentos%20da%20Construtora%20Horizonte."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        title="Conversar pelo WhatsApp"
        aria-label="Abrir conversa no WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="24"
          height="24"
        >
          <path fillRule="evenodd" clipRule="evenodd" d="M20.463 3.488C18.217 1.24 15.231 0 12.05 0 5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.304-1.654a11.881 11.881 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.479-8.413zm-8.413 18.297a9.862 9.862 0 0 1-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.889 9.884zm5.43-7.403c-.298-.149-1.758-.867-2.03-.967-.272-.099-.47-.148-.669.15-.198.296-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.15-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        </svg>
      </a>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProjectsProvider>
        <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projetos" element={<ProjectsShowcasePage />} />
          <Route path="/projetos/:id" element={<ProjectDetailPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/cadastro" element={<AdminDashboardPage />} />
        </Routes>
      </ProjectsProvider>
    </AuthProvider>
  );
}
