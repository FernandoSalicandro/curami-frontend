import './FeatureSlider.css';
import Benefits from '../Benefits/Benefits.jsx';
import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const FeatureSlider = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeIndex, setActiveIndex] = useState(-1);

  const STEPS = [
    'Compila il questionario',
    'Ti ricontattiamo',
    'Fissiamo la prima visita',
    'Iniziamo le cure',
  ];

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % STEPS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isInView]);

  const itemVariants = {
    hidden: {
      scale: 1,
      border: '2px solid var(--slider-circle-inactive-border)',
      backgroundColor: 'transparent',
      opacity: 0.7,
      color: 'var(--slider-circle-inactive-text)',
    },
    visible: {
      scale: 1.12,
      backgroundColor: 'var(--slider-circle-active-bg)',
      border: '2px solid var(--slider-circle-active-border)',
      opacity: 1,
      color: 'var(--slider-circle-active-text)',
      transition: { duration: 0.4 },
    },
  };

  const h2Variants = {
    hidden: {
      scale: 1,
      opacity: 0.85,
      color: 'var(--slider-step-title-inactive)',
    },
    visible: {
      scale: 1.05,
      opacity: 1,
      color: 'var(--slider-step-title-active)',
      transition: { duration: 0.4 },
    },
  };

  return (
    <div ref={ref} className="feature-slider">
      <div className="wrapper-center">
        <div className="box">
          {STEPS.map((label, i) => (
            <div className="step" key={i}>
              <motion.div
                variants={itemVariants}
                animate={activeIndex === i ? 'visible' : 'hidden'}
                className={`circle-${i + 1}`}
              >
                <p>{i + 1}</p>
              </motion.div>
              <motion.h2
                variants={h2Variants}
                animate={activeIndex === i ? 'visible' : 'hidden'}
                className="text-center"
              >
                {label}
              </motion.h2>
            </div>
          ))}
        </div>
      </div>

      {/* Usa lo spazio sotto gli step */}
      <div className="box-3">
        <Benefits />
      </div>
    </div>
  );
};

export default FeatureSlider;
