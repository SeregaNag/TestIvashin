import { projectFirestore } from '../../firebase/config';
// styles
import React, {useEffect, useState} from 'react';
import './Home.scss';
import NoteList from '../../components/NoteList';

interface Item {
  id?: string;
  title: string;
  tags: string[];
  description: string;
}

const Home: React.FC = () => {
  const [data, setData] = useState<Item[] | null>(null);
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | boolean>(false)

  useEffect(() => {
    setIsPending(true)

    const unsub = projectFirestore.collection('notes').onSnapshot(snapshot => {
      if (snapshot.empty) {
        setError('No recipes to load')
        setIsPending(false)
      } else {
        let results: Item[] = []
        snapshot.docs.forEach(doc => {
          results.push({ 
            description: doc.data().description, 
            tags: doc.data().tags, 
            title: doc.data().title,
            id: doc.id,
  });
});

        setData(results)
        setIsPending(false)
      }
    }, (err) => {
      setError(err.message)
      setIsPending(false)
    })

    return () => unsub()
  }, []) 

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <NoteList notes={data}/>}
    </div>
  )
};

export default Home;