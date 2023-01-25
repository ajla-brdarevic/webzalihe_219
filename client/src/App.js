import './App.css';
import { useState } from 'react';

function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ korisnicko_ime: username, pasvord: password }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        // handle successful login
      }
    })
    .catch((error) => setError(error.message));
  }
  return (
    <div className="App">
      <div className="registracija">
        <h1>Registracija na sistem</h1>
        {error && <p>{error}</p>}
          <label>Kosrisničko ime</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label>Pasvord</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="button" onClick={handleSubmit}>Registracija</button>
      </div>
    </div>
  );
}


export default App;
