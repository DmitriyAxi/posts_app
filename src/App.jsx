import { Routes, Route } from 'react-router-dom';
// import { useEffect } from 'react';
import { Navigate } from 'react-router-dom'; 
import './App.css'
import RegisterForm from './components/features/RegisterForm/RegisterForm'
import Main from './pages/Main/Main'
import Header from './components/shared/Header/Header'
import PostInfo from './pages/PostInfo/PostInfo';
import Footer from './components/shared/Footer/Footer';
import Analytics from './pages/Analytics/Analytics';
import ROUTES from './constants/routes.js'

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Navigate to={ROUTES.home} replace />;
  }

  return children;
};

function App() {
  return (
    <>
      <Header/>
      <main>
        <Routes>
          <Route path={ROUTES.home} element={<RegisterForm />}/>
          <Route 
            path={ROUTES.main} 
            element={
              <ProtectedRoute>
                <Main/>
              </ProtectedRoute>
            }
          />     
          <Route 
            path={ROUTES.postInfo} 
            element={
              <ProtectedRoute>
                <PostInfo/>
              </ProtectedRoute>
            }
          /> 
          <Route 
            path={ROUTES.analytics} 
            element={
              <ProtectedRoute>
                <Analytics/>
              </ProtectedRoute>
            }
          /> 
        </Routes>
      </main>
      <Footer/>
    </>
  )
}

export default App
