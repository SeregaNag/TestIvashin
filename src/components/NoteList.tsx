import React from 'react';
import './NoteList.scss';
import { Link } from 'react-router-dom'

interface Item {
  id: number;
  title: string;
  tags: string[];
  description: string;
}

interface NoteListProps {
    notes: Item[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
    console.log(notes);
  return (
    <div className='note-list'>
      {notes.map(note => (
        <div key={note.id} className="card">
          <h3>{note.title}</h3>
            <p>{note.tags.map(tag => <span>{tag}, </span>)}</p>
          <div>{note.description.substring(0, 100)}...</div>
          <Link to={`/notes/${note.id}`}>Take a look</Link>
        </div>
      ))}
    </div>
  );
};

export default NoteList;