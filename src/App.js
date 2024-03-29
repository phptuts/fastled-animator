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
import Downloads from './pages/project/Downloads';
import Me from './pages/Me';
import Project from './pages/project/Project';
import Comments from './pages/project/Comments';
import UserProjects from './pages/UserProjects';

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
                    <Route path="" element={<Comments />}></Route>
                    <Route path="upload" element={<Upload />}></Route>
                    <Route path="downloads" element={<Downloads />}></Route>
                  </Route>
                  <Route path="/me" element={<Me />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:userId" element={<UserProjects />} />
                  <Route path="/why" element={<Why />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/feedback" element={<Feedback />} />
                  <Route path="/tutorial" element={<Tutorial />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/privacy-policy" element={<Login />} />
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
