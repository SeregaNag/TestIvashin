import { useFetch } from '../../hooks/useFetch';
// styles
import React from 'react';
import './Home.scss';
import NoteList from '../../components/NoteList';

const Home: React.FC = () => {
  const { data, isPending, error } = useFetch('http://localhost:3000/notes')

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <NoteList notes={data}/>}
    </div>
  )
};

export default Home;