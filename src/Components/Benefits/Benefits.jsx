import { motion, AnimatePresence } from "framer-motion";
import "./Benefits.css";


/* ==== SVG ICONS (stroke = currentColor per usare la palette) ==== */
const ClockIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
    </svg>
);

const ShieldCheckIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 4v5a9 9 0 0 1-7 9 9 9 0 0 1-7-9V7l7-4z" />
        <path d="M9 12l2 2 4-4" />
    </svg>
);

const CalendarIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="M8 14h4M8 18h8" />
    </svg>
);

const HeartIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
);




const BENEFITS = [

    {
        icon: <ClockIcon />,
        title: "Nessuna attesa",
        text: "Ti mettiamo in contatto entro poche ore.",
    },
    {
        icon: <ShieldCheckIcon />,
        title: "Professionisti certificati",
        text: "Solo infermieri e fisioterapisti qualificati.",
    },
    {
        icon: <CalendarIcon />,
        title: "Orari flessibili",
        text: "Concordiamo insieme giorni e orari.",
    },
    {
        icon: <HeartIcon />,
        title: "Cure su misura",
        text: "Piano di assistenza personalizzato sul tuo caso.",
    },

];

export default function Benefits() {
    return (
        <div className="benefits-wrap">
            <div className="benefits-grid">
                <AnimatePresence mode='wait'>

                    {BENEFITS.map((b, i) => (
                        <motion.article
                            key={i}
                            className="benefit-card"
                            initial={{ opacity: 0.4, y: 14, scale: 0.7 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.35, delay: i * 0.2 }}
                            exit={{ opacity: 0.5, y: 18, scale: 0.7 }}
                            viewport={{ amount: 0.5, once: false }}
                            whileHover={{ y: -4 }}
                        >
                            <div className="benefit-icon" aria-hidden>{b.icon}</div>
                            <h3 className="benefit-title">{b.title}</h3>
                            <p className="benefit-text">{b.text}</p>
                        </motion.article>
                    ))}

                </AnimatePresence>

            </div>
        </div>
    );
}
