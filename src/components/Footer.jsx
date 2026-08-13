import React from 'react';
import { Code2, Heart, RefreshCw, GitBranch } from 'lucide-react';

export default function Footer() {
  const handleResetData = () => {
    if (window.confirm('Deseja redefinir os dados salvos no localStorage?')) {
      localStorage.removeItem('senai_tasks');
      window.location.reload();
    }
  };

  return (
    <footer className="footer-container glass-card">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="logo-icon-wrapper sm">
            <Code2 size={18} color="#ffffff" />
          </div>
          <div>
            <h4>SENAI DevHub</h4>
            <p>Projeto Desenvolvido para a Disciplina de Front-End • 2º Semestre</p>
          </div>
        </div>

        <div className="footer-actions">
          <button className="btn btn-secondary btn-sm" onClick={handleResetData}>
            <RefreshCw size={14} /> Redefinir Dados Locais
          </button>
          
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-secondary btn-sm"
          >
            <GitBranch size={14} /> Repositório
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>Criado com <Heart size={14} color="#ef4444" style={{ display: 'inline', verticalAlign: 'middle' }} /> para o SENAI • {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
