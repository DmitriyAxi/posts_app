import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './App.css'
import RegisterForm from './components/RegisterForm/RegisterForm'
import Main from './components/Main/Main'
import Header from './components/Header/Header'
import PostInfo from './components/PostInfo/PostInfo';
import Footer from './components/Footer/Footer';
import Analytics from './components/Analytics/Analytics';

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    user && navigate('/main')
  }, [])

  return (
    <>
      <Header></Header>
      <main>
        <Routes>
          <Route path="/" element={<RegisterForm />}/>
          <Route path="/main" element={<Main/>}/>     
          <Route path="/post/:postId" element={<PostInfo/>}/> 
          <Route path="/analytics" element={<Analytics/>}/> 
        </Routes>
      </main>
      <Footer></Footer>
    </>
  )
}

export default App
