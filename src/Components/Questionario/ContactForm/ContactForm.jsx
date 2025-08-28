import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ContactForm.css';

const ContactForm = ({ name = 'contatti', question = 'come possiamo contattarti ?', onSubmit, onBack }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: '', cognome: '', telefono: '', email: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name: field, value } = e.target;
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const e = {};
    if (!form.nome.trim()) e.nome = 'Il nome è obbligatorio';
    if (!form.email.trim()) e.email = 'L’email è obbligatoria';

    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email non valida';

    if (form.telefono && !/^\+?\d{7,15}$/.test(form.telefono)) {
      e.telefono = 'Numero di telefono non valido';
    }


    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    try {
      setSubmitting(true);
      if (typeof onSubmit === 'function') {
        // se onSubmit è async, attendi il completamento (salvataggio su backend, ecc.)
        await onSubmit({
          name,
          answer: {
            nome: form.nome.trim(),
            cognome: form.cognome.trim(),
            telefono: form.telefono.trim(),
            email: form.email.trim(),
          },
        });
      }
      navigate('/grazie'); // redirect solo se tutto ok
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ x: -370, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="contact-wrapper"
    >
      <h2>{question}</h2>

      <form
        className="contact-grid"
        onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} // Enter per inviare
      >
        <div className="field">
          <label htmlFor="nome">Nome*</label>
          <input id="nome" name="nome" type="text" value={form.nome} onChange={handleChange} placeholder="Mario" aria-invalid={!!errors.nome} />
          {errors.nome && <small className="error">{errors.nome}</small>}
        </div>

        <div className="field">
          <label htmlFor="cognome">Cognome (facoltativo)</label>
          <input id="cognome" name="cognome" type="text" value={form.cognome} onChange={handleChange} placeholder="Rossi" />
        </div>

        <div className="field">
          <label htmlFor="telefono">Numero di telefono (facoltativo)</label>
          <input id="telefono" name="telefono" type="tel" inputMode="tel" value={form.telefono} onChange={handleChange} placeholder="+39 3XX XXXXXXX" />
        </div>

        <div className="field">
          <label htmlFor="email">Email*</label>
          <input id="email" name="email" type="email" inputMode="email" value={form.email} onChange={handleChange} placeholder="nome@dominio.it" aria-invalid={!!errors.email} />
          {errors.email && <small className="error">{errors.email}</small>}
        </div>

        <div className="contact-actions">
          {onBack && <button type="button" onClick={onBack} disabled={submitting}>Indietro</button>}
          <div className="invia-wrapper">
            <button type="submit" disabled={submitting}>
              {submitting ? 'Invio…' : 'Invia'}
            </button>
          </div>
        </div>
      </form>

      <p>Le tue risposte e i tuoi dati NON verranno mai salvati e/o condivisi con terze parti</p>
    </motion.div>
  );
};

export default ContactForm;
