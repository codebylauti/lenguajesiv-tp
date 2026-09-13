import './app.css'

import { BrowserRouter, Routes, Route } from "react-router";

import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

import Home from './pages/Home.jsx'
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Inicio" element={<Home/>} />
          <Route path="/Servicios" element={<Services/>} />
          <Route path="/Contacto" element={<Contact/>} />
          <Route path="*" element={<h1>404 page not found</h1>} />
        </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
