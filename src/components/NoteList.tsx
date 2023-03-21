import React from 'react';
import './NoteList.scss';
import { Link } from 'react-router-dom';
import { projectFirestore } from '../firebase/config';

interface Item {
  id?: string;
  title: string;
  tags: string[];
  description: string;
}

interface NoteListProps {
    notes: Item[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
   if (notes.length === 0) {
    return <div className="error">No notes to load...</div>
  }

const handleClick = (id: string | undefined) => {
    projectFirestore.collection('notes').doc(id).delete()
  }

  const del: string = require("../assets/Trash.svg").default;

  return (
    <div className='note-list'>
      {notes.map(note => (
        <div key={note.id} className="card">
          <h3>{note.title}</h3>
            <p>{note.tags.map(tag => <span>{tag}, </span>)}</p>
          <div>{note.description.substring(0, 100)}...</div>
          <Link to={`/notes/${note.id}`}>Take a look</Link>
          <img className='delete' src={del} alt='delete' onClick={() => handleClick(note.id)}/>
        </div>
      ))}
    </div>
  );
};

export default NoteList;