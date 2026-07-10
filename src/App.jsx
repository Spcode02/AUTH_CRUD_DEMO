import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardLayout from './components/DashboardLayout'
import UserAccount from './pages/Account'
import PublicOnlyRoute from './components/PublicOnlyRoute'
import MenuManager from './components/MenuManager'
import Stores from './pages/Stores'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            }>
          </Route>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard title={"Dashboard"} />} />
            <Route path="/account" element={<UserAccount />} />
            <Route path="/menu" element={<MenuManager />} />
            <Route path="/stores" element={<Stores />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
