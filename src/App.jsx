import AppLayout from './ui/AppLayout.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Contact from './pages/Contact.jsx'
import Login from './features/auth/Login.jsx'
import Register from './features/auth/Register.jsx'
import AppLayoutNoSidebar from './ui/AppLayoutNoSidebar.jsx'
import { Toaster } from 'sonner'

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route element={<AppLayoutNoSidebar />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<div>About</div>} />
          <Route path="*" element={<div>404</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
