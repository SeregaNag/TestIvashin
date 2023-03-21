import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectFirestore } from '../../firebase/config';
import './Create.scss';

interface Item {
  id?: string;
  title: string;
  tags: string[];
  description: string;
}

const Create: React.FC = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [newTag, setNewTag] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const tagInput = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const doc: Item = { title, tags, description }

    try {
      await projectFirestore.collection('notes').add(doc)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    const tag = newTag.trim()

    if (tag && !tags.includes(tag)) {
      setTags(prevTags => [...prevTags, newTag])
    }
    setNewTag('');
    if (tagInput.current) {
  tagInput.current.focus()
}
  }

  return (
    <div className="create">
      <h2 className="page-title">Add a New Note</h2>
      <form onSubmit={handleSubmit}>

        <label>
          <span>Note title:</span>
          <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
           <span>Note tags:</span>
          <div className="tags">
            <input 
              type="text" 
              onChange={(e) => setNewTag(e.target.value)}
              value={newTag}
              ref={tagInput}
            />
            <button onClick={handleAdd} className="btn">add</button>
          </div>
        </label>
        <p>Current tags: {tags.map(i => <em key={i}>{i}, </em>)}</p>

        <label>
          <span>Note body:</span>
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