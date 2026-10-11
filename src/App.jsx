import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ScrollToHash from './components/ScrollToHash';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';
import "./styles/variables.css";
import './styles/index.css';

const THEME_KEY = 'theme';

const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === 'light' || saved === 'dark' ? saved : 'dark';
  } catch {
    return 'dark';
  }
};

function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // stockage indisponible : le thème fonctionne quand même pour la session
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`app ${theme}-mode`}>
      <a href="#contenu" className="skip-link">Aller au contenu</a>
      <Header toggleTheme={toggleTheme} />
      <ScrollToHash />
      <main id="contenu">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projets/:slug" element={<ProjectPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;