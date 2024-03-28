import './App.css'
import Footer from './components/footer';
import Header from './components/header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserList from './components/user/UserList';
import { Example } from './components/example';
import Login from './components/auth/Login';
import UserFormCreate from './components/user/UserFormCreate';
import UserFormEdit from './components/user/UserFormEdit';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loginSuccess } from './features/authSlice';
import PrivateRoute from './components/PrivateRoute';
import ChangePassword from './components/auth/ChangePassword';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const sessionData = localStorage.getItem('sessionData');
    if (sessionData) {
      console.log(sessionData);
      dispatch(loginSuccess(JSON.parse(sessionData)))
    }
  })

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Rutas Privadas */}
          <Route path="/user" element={<PrivateRoute Component={UserList} />} />
          <Route path="/user/:id" element={<PrivateRoute Component={UserFormEdit} />} />
          <Route path="/change-password" element={<PrivateRoute Component={ChangePassword} />} />

          {/* Rutas Publicas */}
          <Route path="/" element={<Example />} />
          <Route path="/create-user" element={<UserFormCreate />} />
          <Route path="/login" element={<Login />} />

          {/*
          <Route path="/" element={<Example />} />
          <Route path="/user" element={<UserList />} />
          <Route path="/user/:id" element={<UserFormEdit />} />
          <Route path="/change-password" element={<ChangePassword />} />
          */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App
