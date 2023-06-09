import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';

import Home from './pages/home/Home'
import Create from './pages/create/Create'
import Search from './pages/search/Search'
import Note from './pages/note/Note'
import Navbar from './components/Navbar';
import Edit from './pages/edit/Edit';

function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/search' element={<Search />} />
          <Route path='/notes/:id' element={<Note />} />
          <Route path='/edit/:id' element={<Edit />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
