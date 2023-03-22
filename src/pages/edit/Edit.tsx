import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { projectFirestore } from '../../firebase/config';
import './Edit.scss';

interface Item {
  id?: string;
  title: string;
  tags: string[];
  description: string;
}

const Edit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const tagInput = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unSubscribe = projectFirestore
      .collection('notes')
      .doc(id)
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            setIsPending(false);
            const data = doc.data() as Item;
            setTitle(data.title);
            setDescription(data.description);
            setTags(data.tags);
          } else {
            setIsPending(false);
            setError(`Could not find that note`);
          }
        },
        (err) => {
          setIsPending(false);
          setError(err.message);
        }
      );

    return () => unSubscribe();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const doc: Item = { title, tags, description };

    try {
      await projectFirestore.collection('notes').doc(id).update(doc);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const tag = newTag.trim();

    if (tag && !tags.includes(tag)) {
      setTags((prevTags) => [...prevTags, newTag]);
    }
    setNewTag('');
    if (tagInput.current) {
      tagInput.current.focus();
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    const newTags = extractTags(e.target.value);
    setTags(newTags);
  };

  const extractTags = (text: string) => {
    const tagRegex = /#(\w+)/g;
    const tags: string[] = [];
    let match: RegExpExecArray | null;
    while ((match = tagRegex.exec(text))) {
      tags.push(match[1]);
    }
    return tags;
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="edit">
      <h2 className="page-title">Edit Note</h2>
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
            <button onClick={handleAdd} className="btn">
              add
            </button>
          </div>
        </label>
        <p>Current tags: {tags.map((i) => <em key={i}>{i}, </em>)}</p>

        <label>
          <span>Note body:</span>
          <textarea
            onChange={(e) => handleDescriptionChange(e)}
            value={description}
            required
          />
        </label>

        <button className="btn">submit</button>
      </form>
    </div>
  );
};

export default Edit