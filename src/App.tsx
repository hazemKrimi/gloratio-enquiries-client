// Packages
import { Routes, Route } from 'react-router-dom';

// Components
import AuthRoute from './components/AuthRoute';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Queries from './pages/Queries';
import Tags from './pages/Tags';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Meetings from './pages/Meetings';

import './App.css';

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <Queries />
          </ProtectedRoute>
        }
      />
      <Route
        path='/login'
        element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        }
      />
      <Route
        path='/signup'
        element={
          <AuthRoute>
            <SignUp />
          </AuthRoute>
        }
      />
      <Route
        path='/queries'
        element={
          <ProtectedRoute>
            <Queries />
          </ProtectedRoute>
        }
      />
      <Route
        path='/tags'
        element={
          <ProtectedRoute>
            <Tags />
          </ProtectedRoute>
        }
      />
      <Route
        path='/users'
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path='/meetings'
        element={
          <ProtectedRoute>
            <Meetings />
          </ProtectedRoute>
        }
      />
      <Route
        path='/settings'
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
