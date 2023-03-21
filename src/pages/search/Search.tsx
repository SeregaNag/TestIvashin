import React from 'react';
import { useLocation } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import './Search.scss';
import NoteList from '../../components/NoteList';

const Search: React.FC = () => {
  const queryString = useLocation().search
  const queryParams = new URLSearchParams(queryString)
  const query = queryParams.get('q')

  let url = 'http://localhost:3000/notes';
if (query) {
  url += '?tags_like=' + encodeURIComponent(query);
}

const { error, isPending, data } = useFetch(url);

  const filteredNotes = data?.filter((note) =>
  note.tags.some((tag) => tag.includes(`#${query}`))
);

  return (
    <div>
      <h2 className='page-title'>Notes with "{query}" tags</h2>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {filteredNotes && <NoteList notes={filteredNotes} />}
    </div>
  );
};

export default Search;