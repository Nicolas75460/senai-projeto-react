import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'Qual é a principal função do Hook useState no React?',
    options: [
      'Executar requisições assíncronas ao servidor.',
      'Adicionar e gerenciar o estado reativo local em componentes funcionais.',
      'Estilizar componentes com CSS em tempo de execução.',
      'Controlar o roteamento entre diferentes páginas.'
    ],
    correctIndex: 1,
    explanation: 'O useState armazena dados que mudam ao longo do tempo e força a re-renderização da interface quando atualizados.'
  },
  {
    id: 2,
    question: 'Para que serve o array de dependências no Hook useEffect?',
    options: [
      'Define a lista de estilos CSS aplicados ao elemento.',
      'Armazena os parâmetros de rota da URL.',
      'Controla quando a função do efeito colateral deve ser reexecutada.',
      'Ordena os elementos dentro de um loop JSX.'
    ],
    correctIndex: 2,
    explanation: 'Se o array estiver vazio [], o efeito roda apenas 1 vez ao montar o componente. Se contiver variáveis, roda sempre que elas mudarem.'
  },
  {
    id: 3,
    question: 'O que significa imutabilidade no estado do React?',
    options: [
      'O estado nunca pode ser alterado de nenhuma forma.',
      'Não devemos modificar o estado diretamente (ex: state.count = 5), mas sim criar uma nova cópia usando a função setter.',
      'Variáveis de estado só podem ser do tipo string ou number.',
      'O estado é salvo automaticamente no banco de dados.'
    ],
    correctIndex: 1,
    explanation: 'A imutabilidade garante que o React consiga comparar a referência anterior e nova do estado para disparar renderizações de forma performática.'
  },
  {
    id: 4,
    question: 'Como passamos dados de um componente pai para um componente filho no React?',
    options: [
      'Utilizando Props (Propriedades).',
      'Através de variáveis globais window.',
      'Utilizando comandos SQL.',
      'Importando o arquivo CSS do componente filho.'
    ],
    correctIndex: 0,
    explanation: 'Props são argumentos passados para os componentes React semelhantes a atributos HTML.'
  }
];

export default function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (idx) => {
    if (answers[currentQ.id] !== undefined) return; // Já respondeu
    setSelectedOption(idx);
    setAnswers(prev => ({ ...prev, [currentQ.id]: idx }));
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(answers[QUIZ_QUESTIONS[currentIndex + 1].id] ?? null);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers({});
    setShowResults(false);
  };

  const score = Object.keys(answers).reduce((acc, qId) => {
    const q = QUIZ_QUESTIONS.find(item => item.id === Number(qId));
    if (q && answers[qId] === q.correctIndex) return acc + 1;
    return acc;
  }, 0);

  const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="quiz-container animate-fade-in">
      <div className="page-header">
        <div>
          <div className="badge badge-purple">
            <HelpCircle size={14} /> Módulo 06 • Avaliação Prática
          </div>
          <h2>Desafio Quiz: Conhecimentos em React 19</h2>
          <p>Teste seus conhecimentos em JSX, Hooks e conceitos fundamentais do SENAI Front-End.</p>
        </div>
      </div>

      {!showResults ? (
        <div className="glass-card quiz-card">
          {/* Top Tracker */}
          <div className="quiz-header">
            <span>Pergunta {currentIndex + 1} de {QUIZ_QUESTIONS.length}</span>
            <div className="quiz-progress-bar">
              <div 
                className="quiz-progress-fill" 
                style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <h3 className="quiz-question">{currentQ.question}</h3>

          <div className="quiz-options">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const hasAnswered = answers[currentQ.id] !== undefined;
              const isCorrect = idx === currentQ.correctIndex;

              let optionClass = 'quiz-option';
              if (hasAnswered) {
                if (isCorrect) optionClass += ' correct';
                else if (isSelected) optionClass += ' wrong';
              } else if (isSelected) {
                optionClass += ' selected';
              }

              return (
                <button
                  key={idx}
                  className={optionClass}
                  onClick={() => handleSelectOption(idx)}
                >
                  <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                  <span className="option-text">{opt}</span>
                  {hasAnswered && isCorrect && <CheckCircle2 size={20} color="var(--accent-green)" />}
                  {hasAnswered && isSelected && !isCorrect && <XCircle size={20} color="var(--accent-red)" />}
                </button>
              );
            })}
          </div>

          {answers[currentQ.id] !== undefined && (
            <div className="explanation-box animate-fade-in">
              <strong>Explicação:</strong> {currentQ.explanation}
            </div>
          )}

          <div className="quiz-footer">
            <button 
              className="btn btn-primary"
              onClick={handleNext}
              disabled={answers[currentQ.id] === undefined}
            >
              {currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado'} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="glass-card quiz-results-card">
          <div className="results-badge-wrapper">
            <Award size={48} color="var(--accent-amber)" />
          </div>
          <h3>Quiz Concluído!</h3>
          <p className="results-score">
            Você acertou <strong>{score}</strong> de <strong>{QUIZ_QUESTIONS.length}</strong> perguntas ({percentage}%)
          </p>

          <div className="results-feedback">
            {percentage >= 75 ? (
              <div className="badge badge-green p-3">
                <Sparkles size={16} /> Excelente! Domínio sólido dos conceitos de React.
              </div>
            ) : (
              <div className="badge badge-amber p-3">
                Continue praticando! Revise o módulo de CheatSheet dos Hooks.
              </div>
            )}
          </div>

          <button className="btn btn-primary mt-4" onClick={handleRestart}>
            <RotateCcw size={16} /> Reiniciar Desafio
          </button>
        </div>
      )}
    </div>
  );
}
