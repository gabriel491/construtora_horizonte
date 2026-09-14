import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

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

export default function SharedFooter({ reveal = true }) {
  return (
    <footer className={reveal ? 'footer-reveal flex flex-col' : 'relative flex flex-col bg-[#111111]'}>
      {reveal && (
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600607688969-a5bfcd64bd0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Footer Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/82"></div>
        </div>
      )}

      {/* CTA principal */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4" style={{ minHeight: reveal ? undefined : '40vh' }}>
        <div className="text-center" style={{ padding: reveal ? undefined : '4rem 0' }}>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#84907a] mb-6 block">
            Construindo Legados Desde 2003
          </span>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white text-center leading-tight max-w-5xl mb-10">
            Realize o seu{' '}
            <br className="hidden md:block" />
            <em>patrimônio.</em>
          </h2>
          <a
            href="tel:+551140028922"
            className="inline-flex items-center gap-4 border border-white/30 text-white text-[10px] uppercase tracking-[0.2em] font-semibold px-8 py-4 hover:bg-white hover:text-zinc-950 transition-all duration-300"
            style={{ textDecoration: 'none' }}
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
            <Link to="/" className="font-serif text-xl text-white mb-3 block" style={{ textDecoration: 'none' }}>
              HORIZONTE.
            </Link>
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
  );
}
