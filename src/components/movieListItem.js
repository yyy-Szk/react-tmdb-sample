import theMovieDbClient from "../lib/theMovieDbClient";

const MovieListItem = ({ movie, openMovieDetailModal }) => {
  const thumbnailUrl = theMovieDbClient.buildImageUrl(movie.poster_path);
  const backgroundImageUrl = theMovieDbClient.buildImageUrl(movie.backdrop_path);
  const percentOfUserScore = Math.floor(movie.vote_average * 10);
  const handleTitleClick = () => { openMovieDetailModal(movie.id) };

  return (
    <>
      <div
        className="flex text-left bg-no-repeat bg-cover text-white relative
                    before:content-[''] before:absolute before:bg-gray-900 before:inset-0 before:bg-opacity-90 before:z-10"
        style={!!movie.backdrop_path ? { backgroundImage: `url(${backgroundImageUrl})` } : {}}
      >
        <section className="z-20">
          <img width={300} height={450} alt={movie.original_title} src={thumbnailUrl} />
        </section>

        <section className="z-20">
          <div className="h-full p-5 box-border">
            <h2 className="text-2xl font-bold cursor-pointer" onClick={() => handleTitleClick()}>{movie.title}</h2>
            <p>
              <span className="pr-3">{`ユーザースコア: ${percentOfUserScore}%`}</span>
              <span>{`リリース日: ${movie.release_date}`}</span>
            </p>
            <p className="text-xl font-bold">概要</p>
            <p>{movie.overview}</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default MovieListItem;
