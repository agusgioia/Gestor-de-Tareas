import  { useEffect,useRef } from 'react';
import { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './components/Services/firebase';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import { Toast } from 'primereact/toast';
import { Navigate } from 'react-router-dom';
import Login from './components/Auth/login';
import Register from './components/Auth/register';
import Administrator from './components/Administrator';
import User from './components/User';
import Navbar from './components/Shared/NavBar';
import Footer from './components/Shared/Footer';
import BoardForm from './components/BoardForm';
import ApiConfig from './components/Services/api';
import './CSS/index.css';


function App() {

  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      setIsAuthenticated(true);
      const user = auth.currentUser;
      setCurrentUser(user.displayName); 
      console.log("Usuario autenticado:", user.displayName);
      const role = user.displayName === "admin123" ? "administrator" : "user";
      setUserRole(role);
    } else {
      setUserRole(null);
      setIsAuthenticated(false);
      setCurrentUser(null);
    }
    setLoading(false); 
  });
  return () => unsubscribe();
}, []); 


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <PrimeReactProvider>
        <Toast ref={toast} />
        <ApiConfig />
        {isAuthenticated && <Navbar user={currentUser} />}
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={userRole ? <Navigate to={`/${userRole}`} /> : <Login />} />
          <Route path="/register" element={userRole ? <Navigate to={`/${userRole}`} /> : <Register />} />

          <Route path="/administrator" element={<Administrator adminData={currentUser} />} />

          <Route path="/user" element={<User idUser={currentUser} />} />
          <Route path="/user/boardform" element={<BoardForm/>} />
        </Routes>
        <Footer />
      </PrimeReactProvider>
    </Router>
  );
}

export default App;
