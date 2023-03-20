import React from 'react';
import { Link } from 'react-router-dom'
import './Navbar.scss';

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <nav>
        <Link to="/" className="brand">
          <h1>Note List</h1>
        </Link>
        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  );
};

export default Navbar;