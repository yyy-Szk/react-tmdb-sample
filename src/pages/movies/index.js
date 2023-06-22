import { useState, useEffect } from "react";
import MovieList from "../../components/movieList";
import MovieSearchForm from "../../components/movieSearchForm";
import Paginator from "../../components/paginator";
import MovieDetailModal from "../../components/movieDetailModal";

export default function MoviesIndex() {
  // useState使いすぎなので、まとめた方がいいのかも？
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [displayMovieDetailId, setDisplayMovieDetailId] = useState(null);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  const closeModal = () => { setDisplayMovieDetailId(null) };
  const openMovieDetailModal = (movieId) => { setDisplayMovieDetailId(movieId) };

  useEffect(() => {
    page > 1 ? setHasPrevPage(true) : setHasPrevPage(false)
    page < totalPageCount ? setHasNextPage(true) : setHasNextPage(false)
  }, [page, totalPageCount]);

  return (
    <>
      <div className="text-center">
        <div className="mt-10 mb-5">
          <h1 className="text-4xl font-bold">ムビろぐ</h1>
          <p>気になるあの映画の情報をしらべてみよう！</p>
        </div>

        <MovieSearchForm page={page} setMovies={setMovies} setTotalPageCount={setTotalPageCount} />
        <MovieList movies={movies} openMovieDetailModal={openMovieDetailModal} />
        { !!displayMovieDetailId && <MovieDetailModal movieId={displayMovieDetailId} closeModal={closeModal}/> }

        <Paginator page={page} setPage={setPage} hasPrevPage={hasPrevPage} hasNextPage={hasNextPage} />
      </div>
    </>
  );
}
