function ListOfMovies({ movies }) {
  return (
    <ul className="row p-0">
      {movies.map((movie) => (
        <li key={movie.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <div className="card h-100">
            <img
              className="card-img-top object-fit-cover"
              src={movie.poster}
              alt={movie.title}
              style={{ height: "300px" }}
            />
            <div className="card-body">
              <h3 className="card-title" style={{ fontSize: "1.25rem" }}>
                {movie.title}
              </h3>
              <p className="card-text">{movie.year}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function NoMoviesResults() {
  return (
    <p className="badge text-bg-secondary fs-6 p-2">
      No se encontraron películas
    </p>
  );
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0;
  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResults />;
}
