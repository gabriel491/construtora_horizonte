import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function SharedHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Empreendimentos', to: isHome ? '#lancamentos' : '/#lancamentos', isAnchor: true },
    { label: 'Nossos Projetos', to: '/projetos', isAnchor: false },
    { label: 'Sustentabilidade', to: isHome ? '#detalhes' : '/#detalhes', isAnchor: true },
    { label: 'Contato', to: isHome ? '#contato' : '/#contato', isAnchor: true },
  ];

  const handleAnchorClick = (e, hash) => {
    if (isHome) {
      e.preventDefault();
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    // If not on home, the link will navigate to /#hash and the browser handles the scroll
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled || !isHome
            ? 'bg-zinc-950/95 backdrop-blur-md py-4 shadow-lg shadow-black/20'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="text-2xl font-serif text-white tracking-wider font-bold no-underline" style={{ textDecoration: 'none' }}>
            HORIZONTE.
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-zinc-400">
            {navLinks.map((link) =>
              link.isAnchor ? (
                <a
                  key={link.label}
                  href={link.to}
                  onClick={(e) => handleAnchorClick(e, link.to.replace('/', ''))}
                  className="hover:text-white transition-colors"
                  style={{ textDecoration: 'none' }}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`hover:text-white transition-colors ${location.pathname.startsWith(link.to) ? 'text-white' : ''}`}
                  style={{ textDecoration: 'none' }}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="tel:+551140028922"
              className="text-xs font-medium text-zinc-500 hover:text-white transition-colors tracking-wider"
              style={{ textDecoration: 'none' }}
            >
              Agendar Visita
            </a>
            <Link to={isHome ? '#contato' : '/#contato'} className="nav-cta-btn" style={{ textDecoration: 'none' }}>
              Falar com um Corretor
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white bg-transparent border-none cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[45] bg-zinc-950/98 backdrop-blur-lg flex flex-col items-center justify-center gap-8"
          style={{ paddingTop: '80px' }}
        >
          {navLinks.map((link) =>
            link.isAnchor ? (
              <a
                key={link.label}
                href={link.to}
                onClick={(e) => {
                  setMobileOpen(false);
                  handleAnchorClick(e, link.to.replace('/', ''));
                }}
                className="text-2xl font-serif text-white hover:text-[#84907a] transition-colors"
                style={{ textDecoration: 'none' }}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                className="text-2xl font-serif text-white hover:text-[#84907a] transition-colors"
                style={{ textDecoration: 'none' }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            to="/#contato"
            className="mt-8 nav-cta-btn"
            style={{ textDecoration: 'none' }}
            onClick={() => setMobileOpen(false)}
          >
            Falar com um Corretor
          </Link>
        </div>
      )}
    </>
  );
}
