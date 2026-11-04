import SignUp from "./pages/SignUp"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage.jsx"
import AboutPage from "./pages/AboutPage"
import RentPage from "./features/rent/pages/RentPage.jsx"
import SearchPage from "./pages/dashboard/SearchPage.jsx"
import PropertyDetail from "./pages/dashboard/PropertyDetail.jsx"
import SavedProperties from "./pages/dashboard/SavedProperties.jsx"
import MessagesPage from "./pages/dashboard/MessagesPage.jsx"
import { Navigate, Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"

const DEV_SESSION_KEY = "ghrems-dev-session"

function RequireLogin({ children }) {
  const location = useLocation()
  const isLoggedIn =
    Boolean(localStorage.getItem("accessToken")) ||
    (import.meta.env.DEV && sessionStorage.getItem(DEV_SESSION_KEY) === "true")

  return isLoggedIn
    ? children
    : <Navigate to="/login" replace state={{ from: location }} />
}

function App() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const targetId = decodeURIComponent(location.hash.slice(1))
    requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" })
    })
  }, [location])

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/rent" element={<RequireLogin><RentPage /></RequireLogin>} />

        {/* Dashboard routes */}
        <Route path="/dashboard/search" element={<RequireLogin><SearchPage /></RequireLogin>} />
        <Route path="/dashboard/property/:id" element={<RequireLogin><PropertyDetail /></RequireLogin>} />
        <Route path="/dashboard/saved" element={<RequireLogin><SavedProperties /></RequireLogin>} />
        <Route path="/dashboard/messages" element={<RequireLogin><MessagesPage /></RequireLogin>} />
      </Routes>

    </>
  )
}

export default App