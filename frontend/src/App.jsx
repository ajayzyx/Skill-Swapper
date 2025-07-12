import Signin from './pages/Signin'
import Signup from './pages/Signup'
import HomePage from './pages/HomePage'
import { Routes, Route } from 'react-router-dom'


function App() {

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  )
}

export default App
