import { Routes, Route } from "react-router"
import LandingPage from "./views/LandingPage"
import SignUpPage from "./views/SignUpPage"
import { UserProvider } from "./context/useUserContext"
import Dashboard from "./views/Dashboard"
import Tickets from "./views/Tickets"
import SignInPage from "./views/SignInPage"
import { ToastProvider } from "./context/useToast"
import NotFoundPage from "./views/NotFoundPage"
const App = () => {
  return (
    <ToastProvider>
      <UserProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/tickets" element={<Tickets/>} />
          <Route path="/auth/login" element={<SignInPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </UserProvider>
    </ToastProvider>
  )
}

export default App