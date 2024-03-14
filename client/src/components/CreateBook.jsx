import { useState } from 'react';
import axios from 'axios';

export default function CreateBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSaveBook = () => {
    const data = {
      title,
      author,
    };
    setLoading(true);
    axios
      .post('http://localhost:8000/books', data)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div>
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? <h1>Loading...</h1> : ''}
      <>
        <label>Title</label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </>
      <div>
        <label>Author</label>
        <input
          type='text'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>

      <button onClick={handleSaveBook}>Save</button>
    </div>
  );
}
