import { useState } from 'react';
import { motion } from 'framer-motion';
import './TextChoice.css';

const FreeText = ({ name, question, onSubmit, onSkip }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');
    
    if (!text.trim()) {
      setError('Per favore, raccontaci cosa è successo');
      return;
    }

    if (text.trim().length < 10) {
      setError('Aggiungi qualche dettaglio in più per aiutarci a trovare il professionista più adatto');
      return;
    }

    if (text.trim().length > 500) {
      setError('Il testo è troppo lungo, cerca di essere più conciso');
      return;
    }

    if (typeof onSubmit === 'function') {
      onSubmit({ name, question, answer: text.trim() });
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    if (error) setError('');
  };

  return (
    <motion.div
      initial={{ x: -370, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="freetext-wrapper"
    >
      <h2>{question}</h2>
      
      <div className="textarea-container">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Raccontami brevemente cosa è successo..."
          rows={6}
          className={error ? 'error' : ''}
          aria-invalid={!!error}
        />
        <div className="character-count">
          {text.length}/500 caratteri
        </div>
      </div>

      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      <div className="freetext-actions">
        <button 
          type="button" 
          onClick={handleSubmit}
          disabled={!text.trim()}
        >
          Continua
        </button>
        {onSkip && (
          <button 
            type="button" 
            onClick={onSkip}
          >
            Salta
          </button>
        )}
      </div>

      <p className="text-center">
        Le tue risposte e i tuoi dati NON verranno mai salvati e/o condivisi con terze parti
      </p>
    </motion.div>
  );
};

export default FreeText;