
import "./FilmCard.sass";

export const FilmCard = ({title, original_title, overview, poster_path}) => {

    return (
        <div className="filmCardDesign">
            <div>{title}</div>
            {/* <div>{original_title}</div> */}
            <div><img className='avatarPic' src={poster_path ? `https://image.tmdb.org/t/p/w200/${poster_path}` : `https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg`} alt={title}/></div>
            {/* <div>{overview}</div> */}
        </div>
    )
}