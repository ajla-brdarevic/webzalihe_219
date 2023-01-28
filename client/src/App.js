import './App.css';
import { useState } from 'react';
import Axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {

  const [korisnicko_ime, setUsername] = useState('');
  const [sifra, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginStatus, setLoginStatus] = useState('');

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

const login = () => {
  Axios.post("http://localhost:8800/login", {
    korisnicko_ime: korisnicko_ime,
    sifra: sifra,
  }).then((response) => {
    if(response.data.message){
      setLoginStatus(response.data.message)
    }else{
      setLoginStatus(response.data[0].korisnicko_ime)
    }
    
  });
}

const changePassword = () => {
  Axios.post("http://localhost:8800/change-password", {
      currentPassword: currentPassword,
      newPassword: newPassword,
      username: korisnicko_ime
  }).then((response) => {
      setLoginStatus(response.data.message)
  });
}

  return (
    <div className="App">
      <div className='blur'>
  <div className="registracija">
    <h1>Registracija na sistem</h1>
    {error && <p>{error}</p>}
      <label>Kosrisničko ime</label>
      <input 
          type="text" 
          placeholder='Korisničko ime'
          onChange={(e) => setUsername(e.target.value)} />
      <label>Pasvord</label>
      <input 
          type="password" 
          placeholder='Šifra' 
          onChange={(e) => setPassword(e.target.value)} />
      <button 
          type="button" 
          onClick={login}>Registracija</button>
  </div>
  <h1>{loginStatus}</h1>
  <button className='dugmePasvord' type="button" onClick={() => setShowChangePassword(!showChangePassword)}>Promijeni šifru</button>
  {showChangePassword && (
    <div className="change-password">
      <h2>Promjena šifre</h2>
      <label>Trenutna šifra</label>
      <input
          type="password"
          placeholder='Trenutna šifra'
          onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <label>Nova šifra</label>
      <input
          type="password"
          placeholder='Nova šifra'
          onChange={(e) => setNewPassword(e.target.value)}
      />
      <button
          type="button"
          onClick={changePassword}>Promijeni šifru</button>
    </div>
  )}
  </div>
</div>

  );
  }

export default App;
