
import './App.css'
import Home from './pages/Home';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Navigation from './components/Navigation';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import Tasks from './pages/Tasks';
import AddTask from './components/AddTask';
import { useGetProfileQuery } from './redux/api/user.api';

function App() {
  
  useGetProfileQuery();


  return (
    <BrowserRouter>
      <Toaster position='bottom-center' />
      <Navigation />
      <Routes>
        <Route  path={"/"}  element={<Navigate to={"/home"} replace />} />
        <Route path={"/home"} element={< Home />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/profile"} element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />

        <Route path={"/tasks"} element={<ProtectedRoute><Tasks /> </ProtectedRoute>} />
        <Route path={"/tasks/add"} element={<ProtectedRoute><AddTask /> </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
} 

export default App
