// MovieCard.tsx
import { FunctionalComponent } from "preact/src/index.d.ts";
type Props = {
    Movie:{
    original_title:string
    release_date:string
    backdrop_path:string
    popularity:number
    }
}

const MoviesCard:FunctionalComponent<Props> = (props) => {
    const image = `https://image.tmdb.org/t/p/original/${props.Movie.backdrop_path}`
    // Normalizar la popularidad de 0 a 10 (puedes ajustarlo según los valores típicos de popularidad en la API)
    const maxPopularity = 10; // Suponiendo que 1000 es un valor alto en la API
    const rating = props.Movie.popularity
    ? Math.max(0, Math.min(10, (props.Movie.popularity / maxPopularity) * 10))
    : 0;
    return(
        <div class = "movie-card">
            <img src={image} width={500}/>
            <h2>{props.Movie.original_title}</h2>
            <p>Fecha de estreno: {props.Movie.release_date}</p>
            {/* Barra de opiniones */}
            <p>Puntuación: {rating.toFixed(1)}/10</p>
            <div className="rating-bar-container">
                <div
                    className="rating-bar"
                    style={{ width: `${rating * 10}%` }}
                ></div>
            </div>

        </div>
    )
}

export default MoviesCard