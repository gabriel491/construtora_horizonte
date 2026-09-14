import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../contexts/ProjectsContext';
import { useAuth } from '../contexts/AuthContext';
import SharedHeader from '../components/SharedHeader';
import SharedFooter from '../components/SharedFooter';
import { ArrowRight, Plus, Settings } from 'lucide-react';

export default function ProjectsShowcasePage() {
  const { projects } = useProjects();
  const { isAdmin } = useAuth();
  const [filter, setFilter] = useState('todos');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Trigger entrance animation
    setTimeout(() => setLoaded(true), 100);
  }, []);

  const filtered = filter === 'todos'
    ? projects
    : projects.filter(p => p.type === filter);

  const filterButtons = [
    { key: 'todos', label: 'Todos' },
    { key: 'construcao', label: 'Construção' },
    { key: 'reforma', label: 'Reforma' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#111111',
      fontFamily: "'Inter', sans-serif",
      color: '#fff',
    }}>
      <SharedHeader />

      {/* Hero Section */}
      <section style={{
        paddingTop: '160px',
        paddingBottom: '80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle background gradient */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '600px',
          background: 'radial-gradient(ellipse, rgba(132,144,122,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto', padding: '0 1.5rem' }}>
          <span style={{
            fontSize: '9px',
            fontFamily: 'monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: '#84907a',
            marginBottom: '1.5rem',
            display: 'block',
          }}>
            Portfólio de Obras
          </span>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
          }}>
            Projetos que Inspiram
          </h1>
          <p style={{
            fontSize: '15px',
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.7,
            fontWeight: 300,
            marginBottom: '2rem',
          }}>
            Conheça as obras que realizamos com excelência e dedicação.
            Cada projeto conta uma história de transformação e qualidade.
          </p>

          {/* Admin CTA — botão para cadastrar/gerenciar projetos */}
          <Link
            to={isAdmin ? '/admin/cadastro' : '/admin'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 28px',
              background: isAdmin ? 'rgba(132,144,122,0.15)' : 'transparent',
              border: '1px solid rgba(132,144,122,0.4)',
              color: '#84907a',
              textDecoration: 'none',
              fontSize: '10px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              fontFamily: "'Inter', sans-serif",
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(132,144,122,0.2)';
              e.currentTarget.style.borderColor = '#84907a';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isAdmin ? 'rgba(132,144,122,0.15)' : 'transparent';
              e.currentTarget.style.borderColor = 'rgba(132,144,122,0.4)';
              e.currentTarget.style.color = '#84907a';
            }}
          >
            {isAdmin ? (
              <>
                <Settings size={13} />
                Gerenciar Projetos
              </>
            ) : (
              <>
                <Plus size={13} />
                Área do Administrador
              </>
            )}
          </Link>
        </div>
      </section>

      {/* Filter Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        marginBottom: '3rem',
        padding: '0 1.5rem',
      }}>
        {filterButtons.map(btn => (
          <button
            key={btn.key}
            onClick={() => setFilter(btn.key)}
            style={{
              padding: '10px 24px',
              fontSize: '11px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              background: filter === btn.key ? 'rgba(132,144,122,0.15)' : 'transparent',
              border: `1px solid ${filter === btn.key ? '#84907a' : 'rgba(255,255,255,0.08)'}`,
              color: filter === btn.key ? '#fff' : 'rgba(255,255,255,0.35)',
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              transition: 'all 0.3s ease',
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem 6rem',
      }}>
        {filtered.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '6rem 2rem',
            color: 'rgba(255,255,255,0.25)',
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              opacity: 0.5,
            }}>
              🏗️
            </div>
            <p style={{ fontSize: '15px', marginBottom: '0.5rem' }}>
              {filter === 'todos'
                ? 'Nenhum projeto cadastrado ainda.'
                : `Nenhum projeto de ${filter === 'construcao' ? 'construção' : 'reforma'} cadastrado.`}
            </p>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.15)' }}>
              Os projetos aparecerão aqui quando forem publicados pelo administrador.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '20px',
          }}>
            {filtered.map((project, index) => (
              <Link
                to={`/projetos/${project.id}`}
                key={project.id}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`,
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    aspectRatio: '4/3',
                    cursor: 'pointer',
                  }}
                  className="project-card-hover"
                >
                  <img
                    src={project.coverImage}
                    alt={project.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.06)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />

                  {/* Gradient overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 40%, transparent 70%)',
                    transition: 'opacity 0.4s ease',
                    pointerEvents: 'none',
                  }} />

                  {/* Type badge */}
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                  }}>
                    <span style={{
                      fontSize: '8px',
                      fontFamily: 'monospace',
                      textTransform: 'uppercase',
                      letterSpacing: '0.22em',
                      background: 'rgba(17,17,17,0.8)',
                      backdropFilter: 'blur(8px)',
                      padding: '5px 12px',
                      color: '#84907a',
                      border: '1px solid rgba(132,144,122,0.3)',
                    }}>
                      {project.type === 'construcao' ? 'Construção' : 'Reforma'}
                    </span>
                  </div>

                  {/* Text overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '1.5rem',
                  }}>
                    <h3 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '1.35rem',
                      color: '#fff',
                      marginBottom: '6px',
                      lineHeight: 1.2,
                    }}>
                      {project.name}
                    </h3>
                    {project.description && (
                      <p style={{
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.5)',
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}>
                        {project.description}
                      </p>
                    )}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginTop: '12px',
                      fontSize: '9px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.2em',
                      color: '#84907a',
                      fontWeight: 600,
                    }}>
                      Ver Projeto
                      <ArrowRight size={11} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <SharedFooter reveal={false} />
    </div>
  );
}
