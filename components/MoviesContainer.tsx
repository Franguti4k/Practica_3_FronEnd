//MoviesContainer.tsx
import { FunctionalComponent } from "preact/src/index.d.ts";
import MovieCard from "./MovieCard.tsx";

type Props = {
  Movies: Array<{
    original_title: string;
    release_date: string;
    backdrop_path: string;
    popularity: number;
  }>;
  columns: number;
  query: string;
};

const MoviesContainer: FunctionalComponent<Props> = (
  { Movies, columns, query },
) => {
  return (
    <>
      <form method="get">
        <input type="text" name="query" placeholder="Buscador" value={query} />
        <button type="submit">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4715/4715177.png"
            width="50px"
          />
        </button>
      </form>

      {/* Botones para seleccionar columnas (cambiando la URL) */}
      <div class="columns-selector">
        {[1, 2, 3, 4, 5].map((num) => (
          <a
            key={num}
            href={`?query=${query}&columns=${num}`}
            class={columns === num ? "selected" : ""}
          >
            {num}
          </a>
        ))}
      </div>

      {/* Contenedor de películas */}
      <div
        className="movies-container"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {Movies.map((movie) => (
          <MovieCard key={movie.original_title} Movie={movie} />
        ))}
      </div>
    </>
  );
};

export default MoviesContainer;
