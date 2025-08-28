import './Homepage.css';
import FeatureSlider from '../../Components/FeatureSlider/FeatureSlider.jsx';
import TestimonialCard from '../../Components/TestimonialCard.jsx';
import TESTIMONIALS from '../../Data/testimonials.js';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useWindowSize, useWindowScroll } from 'react-use';
import { useRef, useState, useEffect } from 'react';

const Homepage = () => {
  const { width, height } = useWindowSize();
  const { y } = useWindowScroll();
  const shouldReduceMotion = useReducedMotion();

  const [pageHeight, setPageHeight] = useState(0);
 const bottomOffset = 100;
  useEffect(() => {
    const update = () => setPageHeight(document.documentElement.scrollHeight);
    update();
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('load', update);
    }
  }, []);

  const nearBottom = y + height >= pageHeight - bottomOffset;

  const ref = useRef(null);
  const questionnaireRef = useRef(null);
  const treshold = 600;
 
  

  const isDesktop = width > 800;
  const isMobile = width < 600;

  const heroImgs = ['/hero.png', '/hero-2.png'];
  const [index, setIndex] = useState(0);

  // Preload immagini
  useEffect(() => {
    heroImgs.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Carousel immagini: attivo solo se motion abilitato
  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % heroImgs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  return (
    <>
      <section className="first-section">
        {/* Nastro animato (solo se motion attivo) */}
        {!shouldReduceMotion && (
          <div className="scrolling-container">
            <motion.div style={{ display: 'inline-block' }}>
              <span className="scrolling-text">Prima Visita Gratuita</span>
            </motion.div>
          </div>
        )}

        {/* HERO: Immagine + CTA */}
        <div className="container">
          <div className="row row-cols-1 row-md-cols-2 row-cols-lg-2 align-items-center">
            <div ref={ref} className="col d-flex" style={{ minHeight: '224px' }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={heroImgs[index]}
                  src={heroImgs[index]}
                  alt="Professionista sanitario a domicilio che assiste un paziente"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  style={{ width: '100%', height: 'auto' }}
                />
              </AnimatePresence>
            </div>

            <div className="col">
              <div className="hero-cta">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Assistenza infermieristica e fisioterapica a domicilio, subito.
                </motion.h2>
                <p>
                  Ti basta compilare il questionario per essere ricontattato entro poche ore.
                  <br />
                  <strong>
                    Attraverso le tue risposte capiremo subito il problema e quale professionista è più adatto a te.
                  </strong>
                </p>
                <div className="cta-actions">
                  <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="btn questionnaire-button"
                    href="/questionario"
                  >
                    Inizia il questionario
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione con step + feature */}
      <section ref={questionnaireRef}>
        <FeatureSlider />
      </section>

      {/* Sezione testimonianze */}
      <section className="testimonials-section">
        <h2 className="text-center">Facciamo Parlare i Pazienti</h2>
        <div className="testimonial-wrapper mt-5">
          <div className="testimonial-grid">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* Pulsante flottante sticky dopo scroll */}
      {y > treshold && !nearBottom &&(
        <AnimatePresence>
          <motion.a
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            exit={{ opacity: [1, 0] }}
            className="always-button btn questionnaire-button"
            href="/questionario"
          >
            Inizia il questionario
          </motion.a>
        </AnimatePresence>
      )}
    </>
  );
};

export default Homepage;
