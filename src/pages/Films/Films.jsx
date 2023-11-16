import { useState, useEffect } from "react";
import "./Films.css";
import { latestMovie, searchMovie } from "../../services/apiCalls";
import { FilmCard } from "../../common/FilmCard/FilmCard";

//Rdx
import { useSelector } from "react-redux";
import { searchData } from "../searchSlice";

export const Films = () => {
  //Instanciamos o conectamos RDX en modo lectura
  const rdxSearch = useSelector(searchData);

  const [films, setFilms] = useState([]);
  const [msgError, setMsgError] = useState('');

  // useEffect(()=>{
  //     console.log(`Estamos en films y la búsqueda de Header en redux ahora vale... ${rdxSearch.criteria}`)
  // },[rdxSearch])

  useEffect(() => {
    if (rdxSearch.criteria === "") {
      latestMovie()
        .then((results) => {
          setFilms(results.data.results);
        })
        .catch((error) => console.log(error));
    } else {
      const bringDebounced = setTimeout(() => {
        searchMovie(rdxSearch.criteria)
          .then((results) => {
            if(results.data.results.length !== 0 || setMsgError !== ""){
              setFilms(results.data.results);
            } else {
              setMsgError("No se han recuperado películas")
            }
          })
          .catch((error) => console.log(error));
      }, 350);

      return () => clearTimeout(bringDebounced);
    }
  }, [rdxSearch.criteria]);

  return (
    <div className="filmsDesign">
      {films.length > 0 ? (
        <div className="filmRoster">
          {films.slice(0, 9).map((film) => {
            return (
              <FilmCard
                key={film.id}
                title={film.title}
                original_title={film.original_title}
                overview={film.overview}
                poster_path={film.poster_path}
              />
            );
          })}
        </div>
      ) : (
        <div>Esperando las películas por defecto</div>
      )}
    </div>
  );
};

// if(films.length === 0){
//     // latestMovie()
//     //     .then(
//     //         results => {
//     //             setFilms(results.data.results);
//     //         }
//     //     )
//     //     .catch(error => console.log(error))
// }
