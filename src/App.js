import { Route, Routes, BrowserRouter } from 'react-router-dom';
import BookSearchPage from './pages/BookSearchPage';
import BookshelfPage from './pages/BookshelfPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BookSearchPage />}/>
            <Route path="/mybookshelf" element={<BookshelfPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;