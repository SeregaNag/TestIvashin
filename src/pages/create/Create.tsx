import React, { useState } from 'react';
import './Create.scss';

const Create: React.FC = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(title, description )
  }
  

  return (
    <div className="create">
      <h2 className="page-title">Add a New Note</h2>
      <form onSubmit={handleSubmit}>

        <label>
          <span>Recipe title:</span>
          <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        {/* recipe ingredients here */}

        <label>
          <span>Recipe Method:</span>
          <textarea 
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </label>

        <button className="btn">submit</button>
      </form>
    </div>
  );
};

export default Create;