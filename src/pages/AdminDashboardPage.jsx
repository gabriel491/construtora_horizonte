import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProjects } from '../contexts/ProjectsContext';
import ImageDropZone from '../components/ImageDropZone';
import { ArrowRight, Trash2, Edit3, LogOut, Eye, X } from 'lucide-react';

export default function AdminDashboardPage() {
  const { isAdmin, logout } = useAuth();
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [type, setType] = useState('construcao');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Protect route
  if (!isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const resetForm = () => {
    setName('');
    setType('construcao');
    setDescription('');
    setCoverImage([]);
    setGalleryImages([]);
    setEditingId(null);
  };

  const handleStartEdit = (project) => {
    setEditingId(project.id);
    setName(project.name);
    setType(project.type);
    setDescription(project.description || '');
    setCoverImage(project.coverImage ? [project.coverImage] : []);
    setGalleryImages(project.galleryImages || []);
    // Scroll to top to show form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return;
    if (!coverImage.length) return;

    const projectData = {
      name: name.trim(),
      type,
      description: description.trim(),
      coverImage: coverImage[0],
      galleryImages: galleryImages,
    };

    if (editingId) {
      // Editing existing project
      updateProject(editingId, projectData);
      setSuccessMsg('Projeto atualizado com sucesso!');
    } else {
      // Creating new project
      addProject(projectData);
      setSuccessMsg('Projeto publicado com sucesso!');
    }
    
    resetForm();
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      deleteProject(id);
      // If deleting the project being edited, reset form
      if (editingId === id) {
        resetForm();
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const fieldLabelStyle = {
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    color: 'rgba(255,255,255,0.4)',
    marginBottom: '10px',
    fontFamily: "'Inter', sans-serif",
    display: 'block',
  };

  const inputStyle = {
    fontSize: '16px',
    background: 'transparent',
    width: '100%',
    outline: 'none',
    color: '#fff',
    border: 'none',
    padding: '0',
    fontFamily: "'Inter', sans-serif",
  };

  const actionBtnStyle = {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.4)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#111111',
      fontFamily: "'Inter', sans-serif",
      color: '#fff',
    }}>
      {/* Top Bar */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(17,17,17,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '1rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.2rem',
            letterSpacing: '0.1em',
          }}>
            HORIZONTE.
          </span>
          <span style={{
            fontSize: '9px',
            fontFamily: 'monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#84907a',
            borderLeft: '1px solid rgba(255,255,255,0.1)',
            paddingLeft: '1rem',
          }}>
            Painel Admin
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => navigate('/projetos')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.5)',
              padding: '8px 14px',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
            }}
          >
            <Eye size={12} /> Ver Vitrine
          </button>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.5)',
              padding: '8px 14px',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(239,68,68,0.5)';
              e.currentTarget.style.color = 'rgba(239,68,68,0.8)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
            }}
          >
            <LogOut size={12} /> Sair
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '720px',
        margin: '0 auto',
        padding: '3rem 1.5rem 6rem',
      }}>
        {/* Success Banner */}
        {successMsg && (
          <div style={{
            background: 'rgba(132,144,122,0.15)',
            border: '1px solid rgba(132,144,122,0.3)',
            padding: '1rem 1.5rem',
            marginBottom: '2rem',
            fontSize: '13px',
            color: '#84907a',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'fadeInUp 0.3s ease forwards',
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#84907a',
              flexShrink: 0,
            }} />
            {successMsg}
          </div>
        )}

        {/* Form Title */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2rem',
              color: '#fff',
              marginBottom: '0.75rem',
            }}>
              {editingId ? 'Editar Projeto' : 'Cadastrar Projeto'}
            </h1>
            {editingId && (
              <button
                onClick={handleCancelEdit}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.5)',
                  padding: '8px 16px',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  transition: 'all 0.3s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                }}
              >
                <X size={12} /> Cancelar Edição
              </button>
            )}
          </div>
          <p style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.35)',
            lineHeight: 1.6,
          }}>
            {editingId 
              ? 'Altere os dados abaixo e clique em "Salvar Alterações" para atualizar.'
              : 'Preencha os dados abaixo para publicar uma nova obra na vitrine do site.'}
          </p>
        </div>

        {/* Editing indicator bar */}
        {editingId && (
          <div style={{
            background: 'rgba(132,144,122,0.08)',
            border: '1px solid rgba(132,144,122,0.2)',
            padding: '0.75rem 1.25rem',
            marginBottom: '2rem',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <Edit3 size={13} style={{ color: '#84907a', flexShrink: 0 }} />
            Editando: <strong style={{ color: '#fff' }}>{name || '...'}</strong>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

          {/* Nome da obra */}
          <div style={{
            borderBottom: '1px solid rgba(255,255,255,0.12)',
            paddingBottom: '8px',
          }}>
            <label style={fieldLabelStyle}>Nome da Obra</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Ex: "Casa de Alto Padrão no Condomínio X"'
              style={inputStyle}
              required
            />
          </div>

          {/* Tipo de serviço */}
          <div>
            <label style={fieldLabelStyle}>Tipo de Serviço</label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setType('construcao')}
                style={{
                  flex: 1,
                  padding: '14px 20px',
                  fontSize: '13px',
                  fontWeight: 500,
                  background: type === 'construcao' ? 'rgba(132,144,122,0.12)' : 'transparent',
                  border: `1px solid ${type === 'construcao' ? '#84907a' : 'rgba(255,255,255,0.1)'}`,
                  color: type === 'construcao' ? '#fff' : 'rgba(255,255,255,0.4)',
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  transition: 'all 0.3s ease',
                }}
              >
                🏗️ Construção do Zero
              </button>
              <button
                type="button"
                onClick={() => setType('reforma')}
                style={{
                  flex: 1,
                  padding: '14px 20px',
                  fontSize: '13px',
                  fontWeight: 500,
                  background: type === 'reforma' ? 'rgba(132,144,122,0.12)' : 'transparent',
                  border: `1px solid ${type === 'reforma' ? '#84907a' : 'rgba(255,255,255,0.1)'}`,
                  color: type === 'reforma' ? '#fff' : 'rgba(255,255,255,0.4)',
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  transition: 'all 0.3s ease',
                }}
              >
                🔨 Reforma
              </button>
            </div>
          </div>

          {/* Descrição curta */}
          <div style={{
            borderBottom: '1px solid rgba(255,255,255,0.12)',
            paddingBottom: '8px',
          }}>
            <label style={fieldLabelStyle}>
              Descrição Curta
              <span style={{ color: 'rgba(255,255,255,0.2)', fontStyle: 'italic', marginLeft: '8px', textTransform: 'none', letterSpacing: 'normal' }}>
                (opcional)
              </span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Ex: "Troca de todo o porcelanato e ampliação da área gourmet"'
              maxLength={300}
              rows={3}
              style={{
                ...inputStyle,
                resize: 'vertical',
                minHeight: '60px',
              }}
            />
            <div style={{
              textAlign: 'right',
              fontSize: '10px',
              color: 'rgba(255,255,255,0.15)',
              marginTop: '4px',
            }}>
              {description.length}/300
            </div>
          </div>

          {/* Foto de Capa */}
          <div>
            <label style={fieldLabelStyle}>Foto de Capa (a mais bonita!)</label>
            <ImageDropZone
              onImagesSelected={(imgs) => setCoverImage(imgs)}
              multiple={false}
              currentImages={coverImage}
              label="Arraste a foto de capa aqui ou clique para selecionar"
            />
          </div>

          {/* Galeria de Fotos */}
          <div>
            <label style={fieldLabelStyle}>
              Fotos da Galeria
              <span style={{ color: 'rgba(255,255,255,0.2)', fontStyle: 'italic', marginLeft: '8px', textTransform: 'none', letterSpacing: 'normal' }}>
                (opcional — arraste várias de uma vez)
              </span>
            </label>
            <ImageDropZone
              onImagesSelected={(imgs) => setGalleryImages(prev => [...prev, ...imgs])}
              multiple={true}
              currentImages={galleryImages}
              onRemoveImage={(index) => setGalleryImages(prev => prev.filter((_, i) => i !== index))}
              label="Arraste as fotos da galeria aqui"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!name.trim() || !coverImage.length}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              width: '100%',
              padding: '18px 24px',
              background: (name.trim() && coverImage.length) ? '#84907a' : 'rgba(132,144,122,0.25)',
              color: '#fff',
              border: 'none',
              cursor: (name.trim() && coverImage.length) ? 'pointer' : 'default',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              fontFamily: "'Inter', sans-serif",
              transition: 'all 0.3s ease',
              marginTop: '1rem',
            }}
          >
            {editingId ? 'Salvar Alterações' : 'Publicar Projeto'}
            <ArrowRight size={15} />
          </button>
        </form>

        {/* Divider */}
        {projects.length > 0 && (
          <div style={{
            margin: '4rem 0 2rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '2rem',
          }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.5rem',
              color: '#fff',
              marginBottom: '0.5rem',
            }}>
              Projetos Cadastrados
            </h2>
            <p style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.3)',
            }}>
              {projects.length} {projects.length === 1 ? 'projeto' : 'projetos'} publicados
            </p>
          </div>
        )}

        {/* Projects List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {projects.map((project) => (
            <div
              key={project.id}
              style={{
                display: 'flex',
                gap: '16px',
                padding: '16px',
                border: `1px solid ${editingId === project.id ? 'rgba(132,144,122,0.4)' : 'rgba(255,255,255,0.06)'}`,
                background: editingId === project.id ? 'rgba(132,144,122,0.06)' : 'rgba(255,255,255,0.02)',
                alignItems: 'center',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                if (editingId !== project.id) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
              }}
              onMouseLeave={(e) => {
                if (editingId !== project.id) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
              }}
            >
              {/* Thumbnail */}
              <div style={{
                width: '80px',
                height: '60px',
                flexShrink: 0,
                overflow: 'hidden',
              }}>
                <img
                  src={project.coverImage}
                  alt={project.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#fff',
                  marginBottom: '4px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {project.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '9px',
                    fontFamily: 'monospace',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: '#84907a',
                    background: 'rgba(132,144,122,0.15)',
                    padding: '2px 8px',
                  }}>
                    {project.type === 'construcao' ? 'Construção' : 'Reforma'}
                  </span>
                  {project.galleryImages && project.galleryImages.length > 0 && (
                    <span style={{
                      fontSize: '10px',
                      color: 'rgba(255,255,255,0.25)',
                    }}>
                      {project.galleryImages.length} fotos
                    </span>
                  )}
                  {editingId === project.id && (
                    <span style={{
                      fontSize: '9px',
                      fontFamily: 'monospace',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: '#84907a',
                      fontWeight: 600,
                    }}>
                      ✎ Editando
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                {/* Edit button */}
                <button
                  onClick={() => handleStartEdit(project)}
                  title="Editar projeto"
                  style={{
                    ...actionBtnStyle,
                    borderColor: editingId === project.id ? 'rgba(132,144,122,0.5)' : 'rgba(255,255,255,0.1)',
                    color: editingId === project.id ? '#84907a' : 'rgba(255,255,255,0.4)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(132,144,122,0.5)';
                    e.currentTarget.style.color = '#84907a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = editingId === project.id ? 'rgba(132,144,122,0.5)' : 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = editingId === project.id ? '#84907a' : 'rgba(255,255,255,0.4)';
                  }}
                >
                  <Edit3 size={14} />
                </button>
                {/* View button */}
                <button
                  onClick={() => navigate(`/projetos/${project.id}`)}
                  title="Ver projeto"
                  style={actionBtnStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(132,144,122,0.5)';
                    e.currentTarget.style.color = '#84907a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
                  }}
                >
                  <Eye size={14} />
                </button>
                {/* Delete button */}
                <button
                  onClick={() => handleDelete(project.id)}
                  title="Excluir projeto"
                  style={actionBtnStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(239,68,68,0.5)';
                    e.currentTarget.style.color = 'rgba(239,68,68,0.8)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
