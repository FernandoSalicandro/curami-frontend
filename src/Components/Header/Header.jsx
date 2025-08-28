// Header.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import './Header.css';

const Header = () => {

  const location = useLocation();

  const isHomepage = location.pathname === '/';


  const navLinks = [
    { title: 'Home', url: '/' },
    // { title: 'Servizi', url: '/servizi' },
    { title: 'Chi Siamo', url: '/chiSiamo' },
    // { title: 'Contattaci', url: '/contattaci' },
  ];

  const [open, setIsOpen] = useState(false);

  const sidebarVariants = {
    open: {
      top: 0,
      left: 0,
      width: '400px',
      height: '100vh',
      borderRadius: '0px',
      clipPath: 'circle(1500px at 40px 40px)',
      transition: {
        duration: 0.6,

      }
    },
    closed: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      clipPath: 'circle(100px at 40px 40px)',
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  const containerVariants = {
    open: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.6
      }
    },
    closed: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
        when: 'afterChildren'
      }
    }
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.1,
        ease: 'easeInOut'
      }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <header className="header">
      <div className="left">
        <button
          onClick={() => setIsOpen(!open)}
          style={!open ? { backgroundColor: 'white' } : { background: 'linear-gradient(45deg, rgb(212, 212, 255), rgb(238, 178, 255), rgb(245, 200, 255))' }}
          className="hamburger"
        >
          <motion.span
            style={open ? { backgroundColor: 'white' } : { backgroundColor: 'black' }}
            animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span
            style={open ? { backgroundColor: 'white' } : { backgroundColor: 'black' }}
            animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          />
        </button>


        <motion.div

          className="sidebar"
          initial="closed"
          animate={open ? "open" : "closed"}
          variants={sidebarVariants}
        >
          <motion.ul
            variants={containerVariants}
            initial="closed"
            animate={open ? "open" : "closed"}
            className='justify-content-center align-items-center'
          >
            {navLinks.map((link, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
              >
                <a href={link.url}>{link.title}</a>
              </motion.li>
            ))}

            {open && (
              <motion.a initial={{opacity: 0}} animate={{x: [-400, 0], opacity: 1 }} transition={{duration: 0.5, delay: 0.5}} className="btn questionnaire-button" href="/questionario">Questionario</motion.a>
            )}

          </motion.ul>
        </motion.div>
      </div>



      <div className="right">
        <motion.h3 className='px-2' initial={{ x: -500, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }}>Curami.it</motion.h3>
      </div>
      {isHomepage && (
        <motion.a
          initial={{ x: -500, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
          className="header-questionnaire-button" href="/questionario">Questionario</motion.a>
      )}

    </header>
  );
};

export default Header;