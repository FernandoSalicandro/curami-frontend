// pages/Questionario/Questionario.jsx
import './Questionario.css';
import { STEP_CONFIG } from '../../Data/questionario';
import { useMemo, useState, useEffect } from 'react';
import Multichoice from '../../Components/Questionario/Multichoice/Multichoice';
import TextChoice from '../../Components/Questionario/TextChoice/TextChoice';
import Checklist from '../../Components/Questionario/Checklist/Checklist';
import ContactForm from '../../Components/Questionario/ContactForm/ContactForm';
import axios from 'axios';




const START_STEP = 'genere';

export default function Questionario() {
  const [step, setStep] = useState(START_STEP);
  const [answers, setAnswers] = useState({});

  // determinazione prossimo step
  const nextStep = (current, a) => {
    switch (current) {
      case 'genere': return 'eta';
      case 'eta': return 'stato_paziente';
      case 'stato_paziente':
        if (a.stato_paziente === 'Nessuna delle due') return 'servizio';
        return 'racconto_evento'; // Operato/Dimesso -> racconto
      case 'racconto_evento': return 'urgenza';
      case 'servizio':
        if (a.servizio === 'Fisioterapista') return 'zona_dolore';
        if (a.servizio === 'Infermiere') return 'servizio_infermiere';
        if (a.servizio === 'Entrambi') return 'racconto_evento';
        if (a.servizio === 'Non lo so, vorrei essere guidato') return 'racconto_evento';
        return 'urgenza';
      case 'zona_dolore': return 'urgenza';
      case 'servizio_infermiere': return 'urgenza';
      case 'urgenza': return 'giorni';
      case 'giorni': return 'orari';
      case 'orari': return 'preferenza_genere';
      case 'preferenza_genere': return 'contatti'; // inseriamo contatti prima del grazie
      case 'contatti': return;
    }
  };

  const handleAnswer = ({ name, answer }) => {
    const updated = { ...answers, [name]: answer };
    setAnswers(updated);

    // Se "stato_paziente" != "Nessuna delle due", mostra freetext invece di avanzare
    if (name === 'stato_paziente' && answer !== 'Nessuna delle due') {
      setStep('racconto_evento');
      return false;
    }

    setStep(nextStep(step, updated));
    return true;
  };

  const handleFreeTextSubmit = ({ name, answer }) => {
    const updated = { ...answers, [`${name}_note`]: answer };
    setAnswers(updated);
    setStep(nextStep(step, updated));
  };

  const handleContactSubmit = async ({ name, answer }) => {
    const updated = {
      ...answers,
      contatto_nome: answer.nome,
      contatto_cognome: answer.cognome,
      contatto_telefono: answer.telefono,
      contatto_email: answer.email
    };
    setAnswers(updated);

    const giorniStr = Array.isArray(updated.giorni) ? updated.giorni.join(', ') : updated.giorni;
    const orariStr = Array.isArray(updated.orari) ? updated.orari.join(', ') : updated.orari;

    try {

      //1. salvataggio paziente
      await axios.post(`${import.meta.env.VITE_BE_URL}/nuovoPaziente`, {
        genere: updated.genere,
        età: updated.eta,
        stato_paziente: updated.stato_paziente,
        servizio: updated.servizio,
        racconto: updated.racconto_evento_note || '',
        urgenza: updated.urgenza,
        giorni: giorniStr,
        orari: orariStr,
        preferenza_genere: updated.preferenza_genere,
        nome: updated.contatto_nome,
        cognome: updated.contatto_cognome,
        telefono: updated.contatto_telefono,
        email: updated.contatto_email
      });

      //2. matching professionisti
      const giorniArr = Array.isArray(updated.giorni) ? updated.giorni : updated.giorni.split(',').map(s => s.trim());
      const orariArr = Array.isArray(updated.orari) ? updated.orari : updated.orari.split(',').map(s => s.trim());

     

      const preferenzaGenereSingolare = 
      updated.preferenza_genere === 'Uomini' ? 'Uomo' :
      updated.preferenza_genere === 'Donne' ? 'Donna' :
      updated.preferenza_genere;

      

  const matching = await axios.post(`${import.meta.env.VITE_BE_URL}/matching`, {
  servizioValido: updated.servizio || 'Entrambi', // cambiato da servizio a servizioValido
  giorni: giorniArr,
  orari: orariArr,
  preferenza_genere: preferenzaGenereSingolare,
  // Aggiungi tutti i dati del paziente
  nome: updated.contatto_nome,
  cognome: updated.contatto_cognome,
  genere: updated.genere,
  età: updated.eta,
  stato_paziente: updated.stato_paziente,
  urgenza: updated.urgenza,
  racconto: updated.racconto_evento_note || '',
  zona_dolore : updated.zona_dolore,
  servizio_infermiere : updated.servizio_infermiere
});

     

      setStep(nextStep(step, updated));
    } catch (error) {
      console.error('❌ Errore durante il salvataggio del paziente:', error);
      alert('Errore durante l\'invio dei dati. Riprova.');
    };
  };

  const content = useMemo(() => {
    const cfg = STEP_CONFIG[step];
    if (!cfg) return null;

    if (cfg.component === 'multichoice') {
      return (
        <Multichoice
          key={step}
          name={step}
          question={cfg.title}
          options={cfg.options}
          multicheck={cfg.multicheck}
          currentIndex={0}
          setCurrentIndex={() => { }}
          handleChange={({ name, answer }) => {
            handleAnswer({ name, answer });
            return false; // impedisce auto-advance interno
          }}
        />
      );
    }

    if (cfg.component === 'checklist') {
      return (
        <Checklist
          key={step}
          name={step}
          question={cfg.title}
          options={cfg.options}
          onSubmit={({ name, answer }) => handleAnswer({ name, answer })}
        />
      );
    }

    if (cfg.component === 'freetext') {
      return (
        <TextChoice
          key={step}
          name={step}
          question={cfg.title}
          onSubmit={handleFreeTextSubmit}
          onSkip={() => setStep(nextStep(step, answers))}
        />
      );
    }

    if (cfg.component === 'contact') {
      return (
        <ContactForm
          key={step}
          name="contatti"
          question="come possiamo contattarti ?"
          onSubmit={handleContactSubmit}
          onBack={() => setStep('preferenza_genere')}
        />
      );
    }

    if (cfg.component === 'thanks') {
      return (
        <div className="multichoice-wrapper">
          <h1>{cfg.title}</h1>
          <p>Riepilogo inviato. Grazie per il tuo tempo!</p>
        </div>
      );
    }

    return null;
  }, [step, answers]);

  

  // Tutti gli step visualizzabili (escluso "thanks" che non vogliamo contare)
  const visibleSteps = Object.keys(STEP_CONFIG).filter(
    key => STEP_CONFIG[key].component !== 'thanks'
  );

  // Quanti step totali
  const totalSteps = visibleSteps.length;

  // Calcola l'indice dello step attuale
  const currentStepIndex = visibleSteps.indexOf(step);

  // Calcola la percentuale completata
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);


  return (
    <div className="questionario-page">
      <div className="questionario-container">
        <div className="questionnaire-heading">

          <h1 className="text-center">Raccontaci il problema</h1>
          <p className="px-5 text-center">Le tue risposte ci permettono di trovare il professionista migliore</p>
        </div>

        <div className="progress-bar-container mb-4">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={progressPercent}
            role="progressbar"
          />
        </div>

        <div className="questionario">

          {content}
        </div>
      </div>
    </div>
  );
}
