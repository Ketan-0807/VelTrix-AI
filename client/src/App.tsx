import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BuilderPage from './pages/BuilderPage';
import { BuilderProvider } from './context/BuilderContext';
import {Home} from './pages/Home'
import Auth from "./pages/Login"
import PricingPage from './pages/Pricing';
// import ClerkUsers from './components/Auth/User';
// import UpdateName from './components/Auth/User';

function App() {

  return (
    <Router>
      <BuilderProvider>
        <div className="min-h-screen bg-gray-950 text-gray-100">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/builder" element={<BuilderPage />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/auth" element={<Auth/>} />
            <Route path="/subcription" element={<PricingPage/>} />
            {/* <Route path="/auth/users" element={<ClerkUsers/>} />
            <Route path="/auth/upadateUser" element={<UpdateName/>} /> */}

          </Routes>
        </div>
      </BuilderProvider>
    </Router>
  );
}

export default App;