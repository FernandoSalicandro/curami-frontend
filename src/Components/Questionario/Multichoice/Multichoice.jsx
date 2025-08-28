import './Multichoice.css'
import { useState } from 'react';
import { motion } from 'framer-motion';

const Multichoice = ({ name, question, options, handleChange, currentIndex, setCurrentIndex, multicheck = false }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedSet, setSelectedSet] = useState(new Set());
  const [error, setError] = useState(''); // Aggiungiamo gestione errori

  const toggleMulti = (option) => {
    const value = option.value ?? option.title;
    setSelectedSet(prev => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    });
    if (error) setError(''); // Pulizia errore quando l'utente seleziona
  };

  const submitMulti = () => {
    if (selectedSet.size === 0) {
      setError('Seleziona almeno un\'opzione');
      return;
    }

    const values = Array.from(selectedSet);
    const labels = options
      .map(o => ({ v: o.value ?? o.title, l: o.title }))
      .filter(o => selectedSet.has(o.v))
      .map(o => o.l);

    const payload = { name, question, answer: values, label: labels };
    let shouldAdvance = true;
    if (typeof handleChange === 'function') {
      const res = handleChange(payload);
      if (res === false) shouldAdvance = false;
    }
    if (shouldAdvance) setCurrentIndex(currentIndex + 1);
  };

  const handleClickSingle = (i, option) => {
    if (!option.value && !option.title) {
      setError('Opzione non valida');
      return;
    }
    
    setSelectedIndex(i);
    if (error) setError('');

    const payload = {
      name,
      question,
      answer: option.value,
      label: option.title
    };

    let shouldAdvance = true;
    if (typeof handleChange === 'function') {
      const res = handleChange(payload);
      if (res === false) shouldAdvance = false;
    }
    if (shouldAdvance) setCurrentIndex(currentIndex + 1);
  };

  return (
    <motion.div
      initial={{ x: -370, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="multichoice-wrapper"
    >
      <h2>{question}</h2>

      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      <div className="multi-choice-options">
        {options.map((option, i) => {
          const value = option.value ?? option.title;
          const isActive = multicheck ? selectedSet.has(value) : i === selectedIndex;

          return (
            <button
              key={value}
              type="button"
              onClick={() => (multicheck ? toggleMulti(option) : handleClickSingle(i, option))}
              className={isActive ? 'selected' : ''}
              aria-pressed={isActive}
            >
              {option.title}
            </button>
          );
        })}
      </div>

      {multicheck && (
        <div className="multichoice-actions">
          <button
            type="button"
            onClick={submitMulti}
            disabled={selectedSet.size === 0}
          >
            Continua
          </button>
          
          <button 
            type="button" 
            onClick={() => {
              setSelectedSet(new Set());
              setError('');
            }}
            disabled={selectedSet.size === 0}
          >
            Pulisci selezione
          </button>
        </div>
      )}

      <p className='text-center'>Le tue risposte e i tuoi dati NON verranno mai salvati e/o condivisi con terze parti</p>
    </motion.div>
  );
};

export default Multichoice;