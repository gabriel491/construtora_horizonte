import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProjects } from '../contexts/ProjectsContext';
import SharedHeader from '../components/SharedHeader';
import SharedFooter from '../components/SharedFooter';
import { ArrowRight, ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const { getProject } = useProjects();
  const navigate = useNavigate();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const project = getProject(id);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setLoaded(true), 100);
  }, [id]);

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback((e) => {
    if (lightboxIndex === null) return;
    const allImages = [project.coverImage, ...(project.galleryImages || [])];
    if (e.key === 'Escape') setLightboxIndex(null);
    if (e.key === 'ArrowRight') setLightboxIndex(prev => (prev + 1) % allImages.length);
    if (e.key === 'ArrowLeft') setLightboxIndex(prev => (prev - 1 + allImages.length) % allImages.length);
  }, [lightboxIndex, project]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!project) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#111111',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', sans-serif",
        color: '#fff',
        gap: '1.5rem',
      }}>
        <span style={{ fontSize: '4rem', opacity: 0.3 }}>🔍</span>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '2rem',
        }}>
          Projeto não encontrado
        </h1>
        <Link
          to="/projetos"
          style={{
            fontSize: '12px',
            color: '#84907a',
            textDecoration: 'none',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <ArrowLeft size={14} /> Voltar à vitrine
        </Link>
      </div>
    );
  }

  const allImages = [project.coverImage, ...(project.galleryImages || [])];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#111111',
      fontFamily: "'Inter', sans-serif",
      color: '#fff',
    }}>
      <SharedHeader />

      {/* Hero — Cover Image */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: '75vh',
        minHeight: '500px',
        overflow: 'hidden',
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }}>
        <img
          src={project.coverImage}
          alt={project.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {/* Gradient overlays */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(17,17,17,1) 0%, rgba(17,17,17,0.4) 35%, rgba(0,0,0,0) 60%)',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(17,17,17,0.5) 0%, transparent 25%)',
        }} />

        {/* Content overlay */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '0 clamp(1.5rem, 5vw, 6rem)',
          paddingBottom: '4rem',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease 0.2s',
        }}>
          {/* Back link */}
          <Link
            to="/projetos"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.5)',
              textDecoration: 'none',
              marginBottom: '2rem',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.color = '#fff'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.5)'}
          >
            <ArrowLeft size={12} /> Voltar à vitrine
          </Link>

          {/* Type badge */}
          <div style={{ marginBottom: '1rem' }}>
            <span style={{
              fontSize: '9px',
              fontFamily: 'monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              background: 'rgba(132,144,122,0.2)',
              border: '1px solid rgba(132,144,122,0.4)',
              padding: '5px 14px',
              color: '#84907a',
            }}>
              {project.type === 'construcao' ? 'Construção do Zero' : 'Reforma'}
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            lineHeight: 1.05,
            maxWidth: '800px',
            marginBottom: '1rem',
          }}>
            {project.name}
          </h1>

          {/* Description */}
          {project.description && (
            <p style={{
              fontSize: '15px',
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.7,
              maxWidth: '600px',
              fontWeight: 300,
            }}>
              {project.description}
            </p>
          )}
        </div>
      </section>

      {/* Gallery Section */}
      {allImages.length > 1 && (
        <section style={{
          padding: '4rem clamp(1.5rem, 5vw, 6rem)',
          maxWidth: '1400px',
          margin: '0 auto',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '2.5rem',
          }}>
            <div style={{ width: '24px', height: '1px', background: '#84907a' }} />
            <span style={{
              fontSize: '9px',
              fontFamily: 'monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.25em',
              color: 'rgba(255,255,255,0.4)',
            }}>
              Galeria de Fotos — {allImages.length} imagens
            </span>
          </div>

          {/* Masonry-style grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '12px',
          }}>
            {allImages.map((img, index) => (
              <div
                key={index}
                onClick={() => setLightboxIndex(index)}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'zoom-in',
                  aspectRatio: index === 0 ? '16/10' : (index % 3 === 0 ? '4/3' : '3/4'),
                  gridRow: (index % 3 === 0 && index > 0) ? 'span 2' : 'auto',
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s ease ${index * 0.08}s`,
                }}
              >
                <img
                  src={img}
                  alt={`${project.name} — Foto ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
                {/* Hover overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                >
                  <span style={{
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    color: '#fff',
                    fontWeight: 600,
                  }}>
                    Ampliar
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section style={{
        padding: '5rem clamp(1.5rem, 5vw, 6rem)',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <span style={{
            fontSize: '9px',
            fontFamily: 'monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: '#84907a',
            marginBottom: '1.5rem',
            display: 'block',
          }}>
            Gostou do que viu?
          </span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            lineHeight: 1.15,
            marginBottom: '1.5rem',
          }}>
            Quer construir com{' '}
            <em style={{ color: '#84907a' }}>esse padrão</em>?
          </h2>
          <p style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
          }}>
            Nossa equipe está pronta para transformar a sua visão em realidade.
            Solicite um orçamento sem compromisso.
          </p>
          <a
            href="/#contato"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '14px',
              padding: '18px 40px',
              background: '#84907a',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              fontFamily: "'Inter', sans-serif",
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#6b7a62';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(132,144,122,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#84907a';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Solicitar Orçamento
            <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <SharedFooter reveal={false} />

      {/* Floating CTA — mobile */}
      <a
        href="/#contato"
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 40,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '14px 24px',
          background: '#84907a',
          color: '#fff',
          textDecoration: 'none',
          fontSize: '10px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          fontFamily: "'Inter', sans-serif",
          boxShadow: '0 8px 30px rgba(132,144,122,0.35)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(132,144,122,0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(132,144,122,0.35)';
        }}
      >
        Quero Construir Assim
        <ArrowRight size={13} />
      </a>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(0,0,0,0.96)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxIndex(null)}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#fff',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              borderRadius: '50%',
              transition: 'background 0.3s ease',
              zIndex: 10,
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <X size={20} />
          </button>

          {/* Counter */}
          <div style={{
            position: 'absolute',
            top: '1.5rem',
            left: '1.5rem',
            zIndex: 10,
          }}>
            <span style={{
              fontFamily: 'monospace',
              fontSize: '13px',
            }}>
              <span style={{ color: '#fff' }}>{String(lightboxIndex + 1).padStart(2, '0')}</span>
              <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 4px' }}>/</span>
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>{String(allImages.length).padStart(2, '0')}</span>
            </span>
          </div>

          {/* Prev button */}
          {allImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(prev => (prev - 1 + allImages.length) % allImages.length);
              }}
              style={{
                position: 'absolute',
                left: '1.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.08)',
                border: 'none',
                color: '#fff',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                borderRadius: '50%',
                transition: 'background 0.3s ease',
                zIndex: 10,
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* Image */}
          <img
            src={allImages[lightboxIndex]}
            alt={`${project.name} — Foto ${lightboxIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '85vh',
              objectFit: 'contain',
              animation: 'fadeInUp 0.3s ease forwards',
            }}
          />

          {/* Next button */}
          {allImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(prev => (prev + 1) % allImages.length);
              }}
              style={{
                position: 'absolute',
                right: '1.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.08)',
                border: 'none',
                color: '#fff',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                borderRadius: '50%',
                transition: 'background 0.3s ease',
                zIndex: 10,
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            >
              <ChevronRight size={22} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
