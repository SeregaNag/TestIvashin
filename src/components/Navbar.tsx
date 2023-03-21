import React from 'react';
import { Link } from 'react-router-dom'
import './Navbar.scss';
import SearchBar from './SearchBar';

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <nav>
        <Link to="/" className="brand">
          <h1>Note List</h1>
        </Link>
        <SearchBar />
        <Link to="/create">Create Note</Link>
      </nav>
    </div>
  );
};

export default Navbar;