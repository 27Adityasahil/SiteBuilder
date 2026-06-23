
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { BuilderHealthProvider } from './contexts/HealthContext'
import { SystemStatusWidget } from './components/ui/SystemStatusWidget'
import ScrollToTop from './components/ui/ScrollToTop'
import LandingPage from './pages/LandingPage'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/dashboard/Dashboard'
import Assets from './pages/dashboard/Assets'
import Builder from './pages/builder/Builder'
import ProductPage from './pages/ProductPage'
import TemplatesPage from './pages/TemplatesPage'
import TutorialPage from './pages/TutorialPage'
import PricingPage from './pages/PricingPage'

function App() {
  return (
    <BuilderHealthProvider>
      <Router>
        <ScrollToTop />
        <SystemStatusWidget />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/assets" element={<Assets />} />
          <Route path="/builder/:id" element={<Builder />} />
          <Route path="/playground" element={<Builder />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/tutorial" element={<TutorialPage />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Routes>
      </Router>
    </BuilderHealthProvider>
  )
}

export default App
