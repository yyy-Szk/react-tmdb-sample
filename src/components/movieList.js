import MovieListItem from "./movieListItem";

const MovieList = ({ movies, openMovieDetailModal }) => {
  return (
    <>
      <div>
        {
          movies.map(movie => {
            return (
              <div key={movie.id} className="my-5">
                <MovieListItem movie={movie} openMovieDetailModal={openMovieDetailModal} />
              </div>
            )
          })
        }
      </div>
    </>
  );
};

export default MovieList;
