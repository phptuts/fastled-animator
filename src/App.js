import Navigation from './components/Navigation';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Contact from './pages/Contact';
import { LedProvider } from './context/led/ledContext';
import Upload from './pages/Upload';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Feedback from './pages/Feedback';
import Tutorial from './pages/Tutorial';
import { store } from './app/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <ToastContainer />
          <LedProvider>
            <Navigation />
            <main className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/tutorial" element={<Tutorial />} />
              </Routes>
            </main>
          </LedProvider>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
