import './ThanksPage.css'
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';

const HeartIcon = () => (
    <svg viewBox="0 0 24 24"  aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
);


const ThanksPage = () => {

    const navigate = useNavigate();

  return (
    <div className="thanks-page">
        <motion.div initial={{opacity : 0, y : -60}} animate={{opacity : 1, y : 0}} transition={{duration: 1, delay: 1}}  className='benefit-icon' style={{width: 100, height: 100}} aria-hidden>
            <HeartIcon />
        </motion.div>
        <div className="thanks-wrapper">
            <h1>Grazie per la tua fiducia</h1>
            <div className="text-wrapper">
                <h2>A breve riceverai una e-mail di conferma</h2>
            <p className='my-0'>Ti ricontatteremo per la prima visita il prima possibile e in accordo con i tuoi giorni e orari preferiti</p>
            <p>Se non vedi la mail controlla nello spam!</p>
            </div>

            <a href="/">Torna alla Home</a>
            
        </div>
    </div>
  )
}

export default ThanksPage