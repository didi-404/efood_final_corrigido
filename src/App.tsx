import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CartSidebar from './components/CartSidebar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Profile from './pages/Profile'
import GlobalStyle from './styles/GlobalStyle'

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurante/:id" element={<Profile />} />
      </Routes>

      <CartSidebar />
      <Footer />
    </BrowserRouter>
  )
}

export default App
