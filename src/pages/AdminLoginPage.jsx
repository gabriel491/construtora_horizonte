import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect
  if (isAdmin) {
    return <Navigate to="/admin/cadastro" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate a brief delay for UX
    setTimeout(() => {
      const success = login(password);
      if (success) {
        navigate('/admin/cadastro');
      } else {
        setError('Senha incorreta. Tente novamente.');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#111111',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', sans-serif",
      padding: '2rem',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
      }}>
        {/* Logo */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
        }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2rem',
            color: '#fff',
            letterSpacing: '0.1em',
            marginBottom: '1rem',
          }}>
            HORIZONTE.
          </h1>
          <div style={{
            width: '40px',
            height: '1px',
            background: '#84907a',
            margin: '0 auto 1.5rem',
          }} />
          <span style={{
            fontSize: '9px',
            fontFamily: 'monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.35)',
          }}>
            Painel Administrativo
          </span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            borderBottom: '1px solid',
            borderColor: error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.12)',
            paddingBottom: '8px',
            transition: 'border-color 0.3s ease',
          }}>
            <label style={{
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.35)',
              marginBottom: '10px',
              fontFamily: "'Inter', sans-serif",
            }}>
              Senha de Acesso
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Digite a senha do administrador"
              autoFocus
              style={{
                fontSize: '16px',
                background: 'transparent',
                width: '100%',
                outline: 'none',
                color: '#fff',
                border: 'none',
                padding: '0',
                fontFamily: "'Inter', sans-serif",
              }}
            />
          </div>

          {/* Error message */}
          {error && (
            <div style={{
              fontSize: '12px',
              color: 'rgba(239,68,68,0.8)',
              fontFamily: "'Inter', sans-serif",
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              animation: 'fadeInUp 0.3s ease forwards',
            }}>
              <span style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'rgba(239,68,68,0.8)',
                flexShrink: 0,
              }} />
              {error}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading || !password}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              width: '100%',
              padding: '16px 24px',
              background: loading ? 'rgba(132,144,122,0.6)' : password ? '#84907a' : 'rgba(132,144,122,0.3)',
              color: '#fff',
              border: 'none',
              cursor: loading || !password ? 'default' : 'pointer',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              fontFamily: "'Inter', sans-serif",
              transition: 'all 0.3s ease',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Verificando...' : 'Acessar Painel'}
            {!loading && <ArrowRight size={14} />}
          </button>
        </form>

        {/* Back link */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a
            href="/"
            style={{
              fontSize: '11px',
              color: 'rgba(255,255,255,0.25)',
              textDecoration: 'none',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.1em',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.25)'}
          >
            ← Voltar ao site
          </a>
        </div>
      </div>
    </div>
  );
}
