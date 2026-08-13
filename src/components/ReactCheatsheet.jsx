import React, { useState } from 'react';
import { 
  BookOpen, 
  Code2, 
  Copy, 
  Check, 
  Sparkles, 
  Terminal 
} from 'lucide-react';

const CHEATSHEET_TOPICS = [
  {
    id: 'usestate',
    title: 'useState',
    subtitle: 'Gerenciamento de Estado Local',
    description: 'Permite adicionar estado reativo a componentes funcionais. Sempre que o estado muda, o React dispara um re-render.',
    code: `import { useState } from 'react';

function Contador() {
  const [valor, setValor] = useState(0);

  return (
    <button onClick={() => setValor(valor + 1)}>
      Contador: {valor}
    </button>
  );
}`
  },
  {
    id: 'useeffect',
    title: 'useEffect',
    subtitle: 'Efeitos Colaterais & Ciclo de Vida',
    description: 'Executa código após a renderização para chamadas de API, assinaturas ou manipulação direta do DOM.',
    code: `import { useState, useEffect } from 'react';

function DadosUsuario() {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/user')
      .then(res => res.json())
      .then(data => setDados(data));
  }, []); // Executa apenas 1 vez ao montar o componente
}`
  },
  {
    id: 'usecontext',
    title: 'useContext',
    subtitle: 'Compartilhamento Global de Estado',
    description: 'Evita a passagem manual de props através de múltiplos níveis de componentes (Prop Drilling).',
    code: `import { createContext, useContext } from 'react';

const ThemeContext = createContext('dark');

function Painel() {
  const tema = useContext(ThemeContext);
  return <div className={tema}>Tema Atual: {tema}</div>;
}`
  },
  {
    id: 'useref',
    title: 'useRef',
    subtitle: 'Referências Persistentes ao DOM',
    description: 'Mantém um valor mutável que não provoca re-render ao ser alterado, ideal para focar inputs ou medir dimensões.',
    code: `import { useRef } from 'react';

function CampoFoco() {
  const inputRef = useRef(null);

  const focarInput = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={focarInput}>Focar no Campo</button>
    </>
  );
}`
  }
];

export default function ReactCheatsheet() {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="cheatsheet-container animate-fade-in">
      <div className="page-header">
        <div>
          <div className="badge badge-cyan">
            <BookOpen size={14} /> Módulo 05 • Referência Rápida React
          </div>
          <h2>CheatSheet: React Hooks & Padrões</h2>
          <p>Guia prático com exemplos essenciais para o desenvolvimento no curso de Front-End SENAI.</p>
        </div>
      </div>

      <div className="cheatsheet-grid">
        {CHEATSHEET_TOPICS.map((topic) => (
          <div key={topic.id} className="glass-card topic-card">
            <div className="topic-card-header">
              <div>
                <span className="badge badge-blue">{topic.subtitle}</span>
                <h3><code>{topic.title}</code></h3>
              </div>

              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => handleCopy(topic.id, topic.code)}
              >
                {copiedId === topic.id ? <Check size={14} color="var(--accent-green)" /> : <Copy size={14} />}
                {copiedId === topic.id ? 'Copiado!' : 'Copiar'}
              </button>
            </div>

            <p className="topic-desc">{topic.description}</p>

            <div className="code-block">
              <div className="code-header">
                <Terminal size={14} />
                <span>Exemplo em JSX</span>
              </div>
              <pre>
                <code>{topic.code}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
