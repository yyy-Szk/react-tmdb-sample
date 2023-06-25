import { useState, useEffect } from "react";
import theMovieDbClient from "../lib/theMovieDbClient";
import Modal from "./modal";

const LoadingModal = () => {
  return (
    <>
      <Modal>
        {/* 以下のクラスはcopilotが勝手に書いた。いつかアニメーションで回るようにちゃんと整える */}
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </Modal>
    </>
  )
}

const MovieDetailModal = ({ movieId, closeModal }) => {
  const [movieDetail, setMovieDetail] = useState({});
  const [credits, setCredits] = useState({});

  // 呼び出し回数が多くなってしまっている。開いた時に一度だけ呼び出すためにはどうするか。
  useEffect(() => {
    theMovieDbClient.fetchMovieDetail({ id: movieId })
      .then(data => { setMovieDetail(data) });

    theMovieDbClient.fetchMovieCredits({ id: movieId })
      .then(data => { setCredits(data) })
  }, [movieId]);
  
  if (!Object.keys(movieDetail).length || !Object.keys(credits).length)
    return <><LoadingModal /></>

  const genres = movieDetail.genres.map(genre => genre.name).join(", ")
  const runtime = (() => {
    // movieDetail.runtime には分単位の上映時間が入っている
    const runtimeHours = movieDetail.runtime / 60;
    const fractionalPart = parseFloat(`0.${+(String(runtimeHours)).split(".")[1]}`)

    return `${Math.floor(runtimeHours)}h${Math.floor(fractionalPart * 60)}m`
  })()
  const percentOfUserScore = Math.floor(movieDetail.vote_average * 10);
  const displayCastList = credits.cast.map(cast => cast.name ).slice(0, 5);

  return (
    <>
      <Modal closeModal={closeModal}>
        <div className="h-4/5 box-border px-4">
          <h2 className="text-3xl font-bold">映画の詳細</h2>
          <div>
            <p>
              <span>{`ユーザースコア: ${percentOfUserScore}%`}</span>
              <span className="pl-3">{`リリース日: ${movieDetail.release_date}`}</span>
              <br />
              <span>{`ジャンル: ${genres}`}</span>
              <span className="pl-3">{`上映時間: ${runtime}`}</span>
            </p>
            <p>
              {
                movieDetail.homepage &&
                  <a href={movieDetail.homepage} target="_blank" rel="noopener noreferrer">公式サイト</a>
              }
            </p>

            <p><span className="text-xl font-bold">キャスト</span></p>
            <p>{displayCastList.join(" / ")}</p>
              
            <p><span className="text-xl font-bold">概要</span></p>
            <p>{movieDetail.overview}</p>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default MovieDetailModal;
