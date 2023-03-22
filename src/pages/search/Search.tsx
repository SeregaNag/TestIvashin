import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { projectFirestore } from "../../firebase/config";
 
//styles
import "./Search.scss";
//components
import NoteList from "../../components/NoteList";

interface Item {
  id?: string;
  title: string;
  tags: string[];
  description: string;
}
 
export default function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q");
 
  const [notes, setNotes] = useState<Item[] | null>(null);
  const [error, setError] = useState<string | boolean>(false);
  const [isPending, setIsPending] = useState(false);
 
  useEffect(() => {
    setIsPending(true);
    const unsub = projectFirestore
      .collection("notes")
      .onSnapshot((snapshot) => {
        if (snapshot.empty) {
          setError("There are no such notes");
          setIsPending(false);
        } else {
          let searchResults: Item[] = [];
          snapshot.docs.forEach((doc) => {
            if (query && doc.data().tags.some((tag: string) => tag.toLowerCase().includes(query.toLowerCase()))) {
              searchResults.push({ description: doc.data().description, 
            tags: doc.data().tags, 
            title: doc.data().title,
            id: doc.id, });
            }
          });
          setNotes(searchResults);
          setIsPending(false);
        }
      });
    return () => unsub();
  }, [query]);
 
  return (
    <div>
      <h2 className="page-title">Notes with "{query}" tags</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {notes && (
        <div className="search-results">
          <NoteList notes={notes} />
        </div>
      )}
    </div>
  );
}
