import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const ProjectsContext = createContext(null);

const STORAGE_KEY = 'horizonte_projects';

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function loadFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Erro ao carregar projetos:', e);
  }
  return [];
}

export function ProjectsProvider({ children }) {
  // Lazy initialization — carrega do localStorage na PRIMEIRA render,
  // evitando a race condition entre useEffects
  const [projects, setProjects] = useState(() => loadFromStorage());
  const isInitialized = useRef(false);

  // Salvar projetos no localStorage sempre que mudar,
  // mas apenas DEPOIS da primeira render (evita sobrescrever com [])
  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Erro ao salvar projetos:', e);
    }
  }, [projects]);

  const addProject = useCallback((project) => {
    const newProject = {
      ...project,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setProjects(prev => [newProject, ...prev]);
    return newProject;
  }, []);

  const updateProject = useCallback((id, updates) => {
    setProjects(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
  }, []);

  const deleteProject = useCallback((id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  }, []);

  const getProject = useCallback((id) => {
    return projects.find(p => p.id === id) || null;
  }, [projects]);

  return (
    <ProjectsContext.Provider value={{ projects, addProject, updateProject, deleteProject, getProject }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectsContext);
  if (!ctx) throw new Error('useProjects must be used within ProjectsProvider');
  return ctx;
}
