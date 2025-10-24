import { Routes, Route } from "react-router"
import LandingPage from "./views/LandingPage"
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  )
}

export default App