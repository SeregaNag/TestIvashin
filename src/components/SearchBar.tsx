import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.scss';

const SearchBar: React.FC = () => {
    const [term, setTerm] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
        
        navigate(`/search?q=${term}`)
    }

  return (
    <div>
      <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search:</label>
        <input 
          id="search" 
          type="text" 
          onChange={(e) => setTerm(e.target.value)} 
          required 
        />
      </form>
    </div>
    </div>
  );
};

export default SearchBar;