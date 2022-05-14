import './App.css';
import Navigation from './components/Navigation';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Contact from './pages/Contact';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
