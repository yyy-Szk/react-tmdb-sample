import { useState, useEffect } from "react";
import theMovieDbClient from "../lib/theMovieDbClient";

const MovieSearchForm = ({ page, setMovies, setTotalPageCount }) => {
  const [formInput, setFormInput] = useState({ query: '' });
  const handleFormInputChange = e => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };
  const executeSearch = () => {
    theMovieDbClient.searchMovies({ page, ...formInput })
      .then(data => {
        setMovies(data.results);
        setTotalPageCount(data.total_pages);
      });
    window.scrollTo({ top: 0, behavior: "smooth" })
  };

  const handleSubmit = e => {
    e.preventDefault();
    executeSearch();
  };
  // useEffectをマウント時に実行したくないので、queryの有無をチェックしている（これなしで対処できるかも？）
  // ex. https://zenn.dev/catnose99/scraps/30c623ba72d6b5
  useEffect(() => { !!formInput.query && executeSearch() }, [page]);

  return (
    <div>
      <form>
        <label htmlFor="query">検索ワード</label>
        <input id="query" name="query" type="text" value={formInput.query} onChange={e => handleFormInputChange(e)} />

        <input type="submit" value="検索" onClick={e => handleSubmit(e)} />
      </form>
    </div>
  )
}

export default MovieSearchForm;
