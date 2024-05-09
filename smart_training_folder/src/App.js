import './App.css';
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import Dashboard from './Dashboard';
import Login from './Login';


function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
