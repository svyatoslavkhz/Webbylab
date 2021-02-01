import React, { useCallback, useEffect, useState } from 'react';
import {NavLink} from 'react-router-dom';
import {useHttp} from '../hooks/http.hook';



export const MainPage = () => {

    const [movies, setMovies] = useState([])
    const [searchQuery, setQuery] = useState({query:''});
    const {request} = useHttp();

    const searchMovie = async () => {
      try{
          const search = await fetch('http://localhost:4000/api/movie/search', {method:"POST", body: JSON.stringify(searchQuery), headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }})
          const info = await search.json();
          setMovies(info)
        }
        catch (e) {
        }
      }

    const fetchMovie = useCallback(async (param) => {
      try{
        const fetched = await request('/')
        setMovies(fetched)
      }
      catch (e) {
      }
    }, request)

    useEffect( () => {
      fetchMovie();
    }, [fetchMovie])

    const searchHandler = (e) => {
      setQuery({query: e.target.value.replace(/(<([^>]+)>)/gi, "")})
    }    

    return (<div>
              <div className="title">
                <h1>Фильмы</h1> 
                <div class="input-field col s12">
                <input id="textarea1" 
                  class="materialize-textarea" 
                  value={searchQuery.query}
                  onChange={searchHandler}
                  placeholder="Поиск"
                />
                <button 
                  onClick={searchMovie}>
                  Поиск
                </button>
                </div>
                </div>    
                
              <div class="row">
              <div class="col s12 m12 mainMovies">
                {movies.length>0 && movies.map( (e) => {
                  return (
                      <div class="card blue-grey darken-1">
                      <div class="card-content white-text">
                        <span class="card-title">{e.title}</span>
                        <p>В ролях: {e.actors.map( (actor, index) => {
                          return (
                          <span className="actor">{index>0 && ', '}{actor}</span>)})}</p>
                        <p>{e.year}</p>                      
                        <p>{e.format}</p>
                        </div>
                      <div class="card-action">
                        <NavLink to={`/movie/${e._id}`}>Подробнее</NavLink>
                      </div>
                    </div>
                  )
                })
                }
              </div>
              </div>
            </div>
    )
}