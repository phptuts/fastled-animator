import Navigation from './components/Navigation';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Why from './pages/Why';
import Create from './pages/create/Create';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { EditorProvider } from './context/editor/editorContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Feedback from './pages/Feedback';
import Tutorial from './pages/Tutorial';
import Home from './pages/Home';
import Editor from './pages/create/Editor';
import Upload from './pages/create/Upload';
import Settings from './pages/create/Settings';
import Login from './pages/Login';
import AuthProvider from './context/auth/authContext';
import { ProjectShowProvider } from './context/project-show/projectShowContext';
import Projects from './pages/Projects';
import Description from './pages/project/Description';
import Downloads from './pages/project/Downloads';
import MyProjects from './pages/MyProjects';
import Project from './pages/project/Project';

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <AuthProvider>
          <EditorProvider>
            <ProjectShowProvider>
              <Navigation />
              <main className="container">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/create" element={<Create />}>
                    <Route path="" element={<Editor />}></Route>
                    <Route path="upload" element={<Upload />}></Route>
                    <Route path="settings" element={<Settings />}></Route>
                  </Route>
                  <Route
                    path="/projects/:userId/:projectId"
                    element={<Project />}
                  >
                    <Route path="" element={<Description />}></Route>
                    <Route path="upload" element={<Upload />}></Route>
                    <Route path="downloads" element={<Downloads />}></Route>
                  </Route>
                  <Route path="/my-projects" element={<MyProjects />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/why" element={<Why />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/feedback" element={<Feedback />} />
                  <Route path="/tutorial" element={<Tutorial />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </main>
            </ProjectShowProvider>
          </EditorProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
