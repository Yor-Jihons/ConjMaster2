import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './app/MainPage/page';
import VerbListPage from './app/VerbListPage/page';
import ViewPage from './app/ViewPage/page';
import { ApiProvider } from './contexts/ApiProvider';
import { ElectronApiClient } from './api/ElectronApiClient';
import './App.css';

function App() {
  return (
    <ApiProvider api={ElectronApiClient}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:language" element={<VerbListPage />} />
          <Route path="/:language/view/:id" element={<ViewPage />} />
        </Routes>
      </Router>
    </ApiProvider>
  );
}

export default App;
