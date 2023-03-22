import React, {useState, useEffect} from 'react';
import './Note.scss';
import { Link, useParams } from 'react-router-dom';
import { projectFirestore } from '../../firebase/config';

interface Item {
  id?: string;
  title: string;
  tags: string[];
  description: string;
}

const Note: React.FC = () => {
  const { id } = useParams();
  
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | boolean>(false)
  const [data, setData] = useState<Item | null>(null)

  useEffect(() => {
  setIsPending(true)

  const unSubscribe = projectFirestore.collection('notes').doc(id).onSnapshot(doc => {
    if (doc.exists) {
      setIsPending(false)
      setData(doc.data() as Item)
    } else {
      setIsPending(false)
      setError(`Could not find that recipe`)
    }
  })

  return () => unSubscribe()
}, [id])

  
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
        <Link className="button" to={`/edit/${id}`}>Edit</Link>
        </>
      )}
    </div>
  )
};

export default Note;
