import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogIn from './Pages/LogIn';
import Dashboard from './Pages/Dashboard';
import Dobavljaci from './Pages/Dobavljaci';
import Proizvodi from './Pages/Proizvodi';
import Procesi from './Pages/Procesi';
import Zaposlenici from './Pages/Zaposlenici';
import Sirovine from './Pages/Sirovine';


function App() {

return (
<div className="App">
        <Router>
          <Routes>
            <Route path="/login" element={<LogIn />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dobavljaci" element={<Dobavljaci />} />
            <Route path="/sirovine" element={<Sirovine />} />
            <Route path="/proizvodi" element={<Proizvodi />} />
            <Route path="/procesi" element={<Procesi />} />
            <Route path="/zaposlenici" element={<Zaposlenici />} />
          </Routes>
        </Router>
      </div>
);
}
export default App;
