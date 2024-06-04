import { useCallback, useState } from "react";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";
import debounce from "just-debounce-it";

function App() {
  const [sort, setSort] = useState(false);
  const { search, setSearch, error } = useSearch();
  const { movies, loading, getMovies } = useMovies({ search, sort });

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search });
    }, 375),
    [getMovies]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    debouncedGetMovies(newSearch);
  };

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <header className="pt-4 w-100">
        <h1 className="text-light text-center mb-4">CinemaQuest</h1>
        <form
          className="form d-flex align-items-center justify-content-center mb-3"
          onSubmit={handleSubmit}
        >
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Harry Potter, Avengers, John Wick..."
              aria-label="Harry Potter, Avengers, John Wick..."
              aria-describedby="button-addon2"
              onChange={handleChange}
              value={search}
            />
            <button className="btn btn-outline-secondary" id="button-addon2">
              Buscar
            </button>
          </div>
        </form>
        <div className="form-check form-check-reverse mb-4 d-flex justify-content-between">
          <div>
            {error && <p className="badge text-bg-warning p-2">{error}</p>}
          </div>
          <div>
            <input
              className="form-check-input"
              type="checkbox"
              id="reverseCheck1"
              onChange={handleSort}
              checked={sort}
            />
            <label
              className="form-check-label text-light"
              htmlFor="reverseCheck1"
            >
              Ordenar Alfabéticamente
            </label>
          </div>
        </div>
      </header>

      <main>
        {loading ? (
          <p className="badge text-bg-dark fs-6 p-2">Cargando ...</p>
        ) : (
          <Movies movies={movies} />
        )}
      </main>
    </div>
  );
}

export default App;
