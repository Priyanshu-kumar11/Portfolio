import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import NavBar from './components/NavBar/NavBar';
import Skills from './components/Skill/Skills';
import Footer from './components/Footer/Footer';
import Certificates from './components/Certificates/Certificates';




function App() {
 

  return (
    <>
    <NavBar/>
     <Hero/>
     <About/>
     <Projects/>
     <Skills/>
     <Certificates/>
     <Footer/>
    </>
  )
}

export default App
