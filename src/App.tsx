import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './app/MainPage/page';
import UserListPage from './app/UserListPage/page';
import UserDetailPage from './app/UserDetailPage/page';
import { ApiProvider } from './contexts/ApiProvider';
import { ElectronApiClient } from './api/ElectronApiClient';
import './App.css';

function App() {
  return (
    <ApiProvider api={ElectronApiClient}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/users" element={<UserListPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
        </Routes>
      </Router>
    </ApiProvider>
  );
}

export default App;
