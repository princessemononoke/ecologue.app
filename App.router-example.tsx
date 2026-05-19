// Exemple de routage simple par URL, sans React Router.
// À adapter dans votre App.tsx existant :
// - gardez votre composant actuel Pro sous le nom ProApp
// - ajoutez PublicApp et HomeChoice
// - basculez selon window.location.pathname

import HomeChoice from './pages/HomeChoice';
import PublicApp from './pages/PublicApp';
import PrivacyPolicy from './pages/PrivacyPolicy';
import LegalNotice from './pages/LegalNotice';
import ProApp from './ProApp'; // Renommez votre App.tsx actuel en ProApp.tsx, ou adaptez cet import.

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '');

  if (path === '' || path === '/') {
    return <HomeChoice />;
  }

  if (path === '/particuliers') {
    return <PublicApp />;
  }

  if (path === '/pro') {
    return <ProApp />;
  }

  if (path === '/confidentialite') {
    return <PrivacyPolicy />;
  }

  if (path === '/mentions-legales') {
    return <LegalNotice />;
  }

  // Redirection douce : si une URL inconnue est appelée, on affiche l’accueil.
  return <HomeChoice />;
}
