import { useState, useEffect, useRef } from "react";
import { ArrowRight, X, Menu, MapPin } from "lucide-react";

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
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
  
  :root {
    --color-bg: #09090b;
    --color-text: #fafafa;
  }
  
  body {
    background-color: var(--color-bg);
    color: var(--color-text);
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
  
  .font-serif {
    font-family: 'Playfair Display', serif;
  }
  
  .main-wrapper {
    position: relative;
    z-index: 10;
    background-color: #09090b;
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
    background: #09090b;
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

  .marquee-item {
    flex-shrink: 0;
    margin-right: 1.25rem;
    border-radius: 12px;
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

export default function App() {
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
      className="relative bg-[#09090b] w-full min-h-screen"
    >
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />

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
            <div className="hidden md:flex items-center gap-10 text-sm font-medium text-zinc-300">
              <a href="#" className="hover:text-white transition-colors">
                Empreendimentos
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Sobre Nós
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Sustentabilidade
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contato
              </a>
            </div>
            <div className="hidden md:block">
              <button className="text-xs font-medium uppercase tracking-wider text-white border-b border-[#84907a] pb-1 hover:text-[#84907a] transition-colors">
                Agendar Visita
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
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-[#09090b]"></div>
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-20">
            <span className="gsap-fade-up uppercase tracking-[0.3em] text-xs font-semibold text-[#84907a] mb-6 block">
              Alto Padrão em Cada Detalhe
            </span>
            <h1 className="gsap-fade-up font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
              A Arte de <br className="hidden md:block" /> Viver Bem.
            </h1>
            <p className="gsap-fade-up text-zinc-300 text-lg md:text-xl max-w-2xl font-light mb-10">
              Arquitetura contemporânea e sofisticação atemporal para você
              construir o seu legado.
            </p>
            <button className="gsap-fade-up group flex items-center gap-4 bg-white text-zinc-950 px-8 py-4 rounded-full font-medium hover:bg-zinc-200 transition-colors">
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
          ref={horizSlider2Ref}
          data-section="1"
          className="relative bg-[#09090b] overflow-hidden"
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
                  className="horiz-slide-card relative w-full h-full rounded-2xl overflow-hidden"
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
              <span className="block mt-6 text-xs uppercase tracking-wider text-[#84907a]">
                ( Arraste para os lados )
              </span>
            </div>

            <div ref={slider2Ref} className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-8 no-scrollbar w-full pl-4 md:pl-0">
              {imoveis.map((imovel) => (
                <div
                  key={imovel.id}
                  className="gsap-fade-up flex flex-col group cursor-pointer flex-none w-[85vw] md:w-[60vw] lg:w-[45vw] snap-center md:snap-start"
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
                      <button className="text-xs uppercase tracking-wider font-semibold border-b border-zinc-600 pb-1 hover:border-white text-white transition-colors">
                        Conhecer Imóvel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section data-section="3" className="py-24 md:py-32 bg-[#09090b] relative z-10 overflow-hidden">
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
          className="relative bg-[#09090b] overflow-hidden border-t border-zinc-900"
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
                  className="horiz-slide-card w-full h-full rounded-2xl overflow-hidden flex flex-col md:flex-row"
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

                    <button className="group flex items-center gap-4 text-[9px] uppercase tracking-[0.22em] font-semibold border-b border-zinc-700 pb-2 hover:border-[#84907a] text-white transition-all duration-300 w-fit">
                      Explorar Projeto
                      <ArrowRight
                        size={13}
                        className="text-[#84907a] group-hover:translate-x-2 transition-transform duration-300"
                      />
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

        <section data-section="5" className="py-24 md:py-32 px-6 bg-[#09090b] relative z-10">
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
                    className="bg-transparent w-full outline-none text-white placeholder:text-zinc-700"
                  />
                </div>
                <div className="flex flex-col border-b border-zinc-700 pb-2 focus-within:border-[#84907a] transition-colors">
                  <label className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
                    Telefone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="(00) 00000-0000"
                    className="bg-transparent w-full outline-none text-white placeholder:text-zinc-700"
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
                  className="bg-transparent w-full outline-none text-white placeholder:text-zinc-700"
                />
              </div>

              <div className="mt-6 text-center md:text-right">
                <button className="group flex items-center justify-center md:justify-end w-full md:w-auto gap-4 bg-white text-zinc-950 px-8 py-4 rounded-full font-medium hover:bg-zinc-200 transition-colors ml-auto">
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

      {/* Footer Reveal (mantido como estava) */}
      <footer className="footer-reveal flex flex-col">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600607688969-a5bfcd64bd0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Footer Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/75"></div>
        </div>
        <div className="relative z-10 flex-1 flex items-center justify-center px-4">
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white text-center leading-tight max-w-5xl">
            Vem realizar o seu
            <br className="hidden md:block" /> sonho com a gente.
          </h2>
        </div>
        <div className="relative z-10 py-8 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-400 border-t border-white/10">
          <p>© 2026 Construtora Horizonte. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a
              href="#"
              className="hover:text-white transition-colors flex items-center gap-2"
            >
              <InstagramIcon size={18} /> Instagram
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Política de Privacidade
            </a>
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
    </div>
  );
}
