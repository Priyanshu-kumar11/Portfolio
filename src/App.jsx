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
        <Nav />
        <Home />
        <Footer/>
      </>
    ),
  },
  {
    path: '/about',
    element: (
      <>
        <Nav />
        <About />
        <Footer/>
      </>
    ),
  },
  {
    path: '/projects',
    element: (
      <>
        <Nav />
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
