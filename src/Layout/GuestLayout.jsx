
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import Fbbanner from '../Components/FBBANNER/Fbbanner'
import CookieBanner from '../Components/CookieBanner/CookieBanner';

const GuestLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Fbbanner />
      <CookieBanner />

    </>
  )
}

export default GuestLayout