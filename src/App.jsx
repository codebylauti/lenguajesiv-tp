import './app.css'

import { BrowserRouter, Routes, Route } from "react-router";

import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

import Home from './pages/Home.jsx'
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";

function App() {
  return (
    <div id="app" className="min-h-screen w-full grid grid-rows-[auto_1fr_auto] bg-green-primary text-detail-jade ">
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
        <Header/>

        <main>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/Inicio" element={<Home/>} />
            <Route path="/Servicios" element={<Services/>} />
            <Route path="/Contacto" element={<Contact/>} />
            <Route path="*" element={
              <div className="w-full h-full flex justify-center items-center text-5xl text-detail-jade">
                <h1> <span className="text-red-900">404</span> page not found</h1>
              </div>
            } />
          </Routes>
        </main>

        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
