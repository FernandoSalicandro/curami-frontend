import { useState } from 'react';
import { motion } from 'framer-motion';
import './Checklist.css';

const Checklist = ({ name, question, options, defaultValue = [], onSubmit, onBack }) => {
  const [selected, setSelected] = useState(new Set(defaultValue));
  const [error, setError] = useState('');

  const toggle = (val) => {
    const next = new Set(selected);
    next.has(val) ? next.delete(val) : next.add(val);
    setSelected(next);
    if (error) setError(''); // Pulisce l'errore quando l'utente fa una selezione
  };

  const handleContinue = () => {
    if (selected.size === 0) {
      setError('Seleziona almeno un\'opzione');
      return;
    }

    if (typeof onSubmit === 'function') {
      onSubmit({ name, question, answer: Array.from(selected) });
    }
  };

  return (
    <motion.div
      initial={{ x: -370, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="checklist-wrapper"
    >
      <h2>{question}</h2>

      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      <div className="checklist-options">
        {options.map((opt) => {
          const isActive = selected.has(opt.value ?? opt);
          const label = opt.title ?? opt;
          const value = opt.value ?? opt;
          return (
            <button
              key={value}
              type="button"
              className={isActive ? 'selected' : ''}
              aria-pressed={isActive}
              onClick={() => toggle(value)}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="checklist-actions">
        {onBack && (
          <button 
            type="button" 
            onClick={onBack}
          >
            Indietro
          </button>
        )}
        <div className="continua-wrapper">
          <button 
            type="button" 
            onClick={handleContinue}
            disabled={selected.size === 0}
          >
            Continua
          </button> 
        </div>
      </div>

      <p className="text-center">
        Le tue risposte e i tuoi dati NON verranno mai salvati e/o condivisi con terze parti
      </p>
    </motion.div>
  );
};

export default Checklist;