import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  RefreshCw, 
  Search, 
  ExternalLink, 
  Tag, 
  BookOpen 
} from 'lucide-react';

const MOCK_NEWS = [
  {
    id: 1,
    title: 'React 19 é oficialmente lançado com Server Actions e useActionState',
    category: 'React Ecosystem',
    snippet: 'A nova versão do React foca em simplificar o gerenciamento de formulários, estados assíncronos e otimização automática de re-render.',
    author: 'Equipe React',
    readTime: '4 min',
    tags: ['React 19', 'Hooks', 'Web Dev']
  },
  {
    id: 2,
    title: 'Vite 6 impulsiona a velocidade de desenvolvimento no Front-End',
    category: 'Build Tools',
    snippet: 'Entenda como o bundler ultra rápido baseado em ESBuild transforma o fluxo de trabalho moderno de desenvolvedores React.',
    author: 'Dev Community',
    readTime: '3 min',
    tags: ['Vite', 'JavaScript', 'Performance']
  },
  {
    id: 3,
    title: 'Boas Práticas para CSS Moderno e Glassmorphism em 2026',
    category: 'Design & CSS',
    snippet: 'Utilização de variáveis CSS, suporte nativo a nesting e componentes ultra-elegantes com transições de alta performance.',
    author: 'SENAI Tech',
    readTime: '5 min',
    tags: ['CSS3', 'UI/UX', 'Glassmorphism']
  },
  {
    id: 4,
    title: 'Consumo Eficiente de APIs RESTful com Axios e Fetch API',
    category: 'Backend Integration',
    snippet: 'Aprenda a tratar erros, utilizar cancelamento de requisições e exibir estados de loading amigáveis no React.',
    author: 'Nicolas - SENAI',
    readTime: '6 min',
    tags: ['API', 'Fetch', 'Async']
  }
];

export default function TechFeed() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  const fetchNews = () => {
    setLoading(true);
    setTimeout(() => {
      setItems(MOCK_NEWS);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const filteredItems = items.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                        item.snippet.toLowerCase().includes(search.toLowerCase());
    const matchTag = selectedTag === 'all' || item.tags.includes(selectedTag);
    return matchSearch && matchTag;
  });

  return (
    <div className="feed-container animate-fade-in">
      <div className="page-header">
        <div>
          <div className="badge badge-amber">
            <Globe size={14} /> Módulo 04 • useEffect & Consumo de APIs
          </div>
          <h2>Feed Tecnológico & Requisições Assíncronas</h2>
          <p>Simulando ciclo de vida de requisições HTTP, estados de carregamento e filtros dinâmicos.</p>
        </div>

        <button className="btn btn-secondary" onClick={fetchNews} disabled={loading}>
          <RefreshCw size={16} className={loading ? 'spin-icon' : ''} /> Atualizar Feed
        </button>
      </div>

      {/* Barra de Busca e Filtros */}
      <div className="feed-controls glass-card">
        <div className="search-box">
          <Search size={18} color="var(--text-muted)" />
          <input 
            type="text" 
            className="input-field" 
            placeholder="Buscar artigos ou tópicos de React..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="tag-filters">
          <button 
            className={`btn btn-sm ${selectedTag === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelectedTag('all')}
          >
            Todos
          </button>
          {['React 19', 'Hooks', 'Vite', 'CSS3', 'API'].map(tag => (
            <button 
              key={tag}
              className={`btn btn-sm ${selectedTag === tag ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedTag(tag)}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Notícias / Skeletons */}
      <div className="feed-grid">
        {loading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="glass-card skeleton-card">
              <div className="skeleton-line title"></div>
              <div className="skeleton-line text"></div>
              <div className="skeleton-line text short"></div>
              <div className="skeleton-line footer"></div>
            </div>
          ))
        ) : filteredItems.length === 0 ? (
          <div className="empty-state glass-card">
            <BookOpen size={36} color="var(--text-muted)" />
            <p>Nenhum artigo encontrado para sua busca.</p>
          </div>
        ) : (
          filteredItems.map(item => (
            <article key={item.id} className="feed-card glass-card">
              <div className="feed-card-header">
                <span className="badge badge-purple">{item.category}</span>
                <span className="read-time">{item.readTime} de leitura</span>
              </div>

              <h3>{item.title}</h3>
              <p>{item.snippet}</p>

              <div className="tags-container">
                {item.tags.map(t => (
                  <span key={t} className="tag-pill"><Tag size={10} /> {t}</span>
                ))}
              </div>

              <div className="feed-card-footer">
                <span className="author">Por <strong>{item.author}</strong></span>
                <a href="#read" className="read-link" onClick={(e) => e.preventDefault()}>
                  Ler Artigo <ExternalLink size={14} />
                </a>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
