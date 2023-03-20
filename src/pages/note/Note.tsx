import React from 'react';
import './Note.scss';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

interface Item {
  id: number;
  title: string;
  tags: string[];
  description: string;
}

const Note: React.FC = () => {
  const { id } = useParams();
  const url = 'http://localhost:3000/notes/' + id;
  const { error, isPending, data } = useFetch(url);
  const newData: Item = {} as Item;
  if (data !== null) {
  Object.assign(newData, data);
  }
  
  
  
  return (
    <div className="note">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && (
        <>
        <h2 className='page-title'>{newData.title}</h2>
        <p className='description'>{newData.description}</p>
        <ul>{newData.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        </>
      )}
    </div>
  )
};

export default Note;
