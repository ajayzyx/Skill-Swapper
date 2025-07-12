import Signin from './pages/Signin'
import Signup from './pages/Signup'
import { Routes, Route } from 'react-router-dom'


function App() {

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  )
}

export default App
