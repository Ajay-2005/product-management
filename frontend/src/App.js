import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/signup/signup'
import Signin from './pages/signin/signin';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
      
    </Router>
  );
}

export default App;
