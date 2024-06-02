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
    }, 350),
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
        <h1 className="text-light text-center">CinemaQuest</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group mb-3">
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
            <input type="checkbox" onChange={handleSort} checked={sort} />
          </div>
        </form>
        {error && <p className="text-light">{error}</p>}
      </header>

      <main>
        {loading ? (
          <p className="text-light">Cargando ...</p>
        ) : (
          <Movies movies={movies} />
        )}
      </main>
    </div>
  );
}

export default App;
