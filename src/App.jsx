import AppLayout from './ui/AppLayout.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Contact from './pages/Contact.jsx'
import Login from './features/auth/Login.jsx'
import Register from './features/auth/Register.jsx'
import { Toaster } from 'sonner'
import { Provider } from 'react-redux'
import store from './store/store.js'
import NotFound from './error/NotFound.jsx'
import Profile from './features/profile/Profile.jsx'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster richColors={true} />
        <Routes>
          <Route element={<AppLayout withSidebar={false} />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route element={<AppLayout withSidebar={true} />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<div>About</div>} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
