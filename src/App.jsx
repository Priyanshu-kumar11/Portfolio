import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Nav from './Components/Nav/Nav';
import About from './Components/About/About';
import Projects from './Components/Projects/Projects';
import Footer from './Components/Footer/Footer';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
      
        <Home />
        <Footer/>
      </>
    ),
  },
  {
    path: '/about',
    element: (
      <>
      
        <About />
        <Footer/>
      </>
    ),
  },
  {
    path: '/projects',
    element: (
      <>
        
        <Projects />
        <Footer/>
      </>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
