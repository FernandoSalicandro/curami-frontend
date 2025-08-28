import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage/Homepage.jsx'
import Questionario from './Pages/Questionario/Questoinario.jsx'
import ChiSiamo from './Pages/ChiSiamo/ChiSiamo.jsx'
import ThanksPage from './Pages/ThanksPage/ThanksPage.jsx'
import GuestLayout from './Layout/GuestLayout.jsx';
import PrivacyPolicy from './Pages/Policy/PrivacyPolicy.jsx';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<GuestLayout />}>
            <Route path='/' element={<Homepage />} />
            <Route path='/questionario' element={<Questionario />} />
            <Route path='/grazie' element={<ThanksPage />} />
            <Route path='/chiSiamo' element={<ChiSiamo />} />


          </Route>
          <Route path='/privacypolicy' element={<PrivacyPolicy />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
