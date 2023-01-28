import './Dashboard.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h2>Opcije</h2>
      <ul>
        <li><Link to="/dobavljaci">Upravljanje dobavljačima</Link></li>
        <li><Link to="/sirovine">Upravljanje sirovinama</Link></li>
        <li><Link to="/proizvodi">Upravljanje proizvodima</Link></li>
        <li><Link to="/procesi">Upravljanje proizvodnim procesima</Link></li>
        <li><Link to="/zaposlenici">Upravljanje zaposlenicima</Link></li>
      </ul>
    </div>
  );
}

export default Dashboard;
