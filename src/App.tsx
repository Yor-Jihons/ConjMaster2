import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './app/MainPage/page';
import VerbListPage from './app/VerbListPage/page';
import ViewPage from './app/ViewPage/page';
import TestPage from './app/TestPage/page';
import { ApiProvider } from './contexts/ApiProvider';
import { ElectronApiClient } from './api/ElectronApiClient';
import './App.css';

function App() {
  return (
    <ApiProvider api={ElectronApiClient}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:language/list" element={<VerbListPage />} />
          <Route path="/:language/view/:id" element={<ViewPage />} />
          <Route path="/:language/test/:id" element={<TestPage />} />
          {/* 下位互換用 */}
          <Route path="/:language" element={<VerbListPage />} />
        </Routes>
      </Router>
    </ApiProvider>
  );
}

export default App;
