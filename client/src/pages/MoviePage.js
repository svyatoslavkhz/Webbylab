import React, { useState, useEffect, useCallback } from 'react';
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {useHistory, useParams} from 'react-router-dom';

export const MoviePage = () => {


    const {request} = useHttp();
    const message = useMessage();
    const history = useHistory();
    const slug = useParams();
    const [btnDlt, setBtnDlt] = useState(false)
    const [movie, setMovie] = useState({
       _id:null, title:'', year: null, format:'', actors:[]
    });

    const getMovie = useCallback( async () => {
        try {
            const fetched = await request(`/${slug.id}`);

            setMovie(fetched)
        
        } catch (e) {
            message('Ошибка')
        } 
    }, request);

    useEffect( () => {
        getMovie()
    }, [getMovie])

    const deleteMovie = async() => {
        try{            
            const fetched = await request(`/delete/${slug.id}`, 'DELETE', {}, {});

            message(fetched.message)
            history.push('/')
        } catch (e) {
            message('Удаление не возможно')
        }
    }

    const editPage = () => {
        history.push(`/edit/${movie._id}`)
    }

    const bthHandler = () => {
        setBtnDlt(!btnDlt)
    }

    return (
            <div className="moviePage">
                <div className="imageMovie"></div>
                <h1>{movie.title}</h1>
                    <div>
                     <p>В ролях: {movie.actors.map( (actor, index) => {
                          return (
                          <span className="actor">{index>0 && ', '}{actor}</span>)})}</p>
                    </div>
                        <div>
                          <p>{movie.year} год.</p>
                        </div>
                        <div>
                          <p>Формат: {movie.format}</p>
                        </div>
                        <div className="btn-adm">
                        <button
                            onClick={editPage}
                            className="btn-edit">
                            Редактировать
                        </button>
                        <div className="btn-delete">
                            <button
                                onClick={bthHandler}>
                                Удалить
                            </button>
                                {btnDlt && <div><p>Вы точно хотите удалить?</p>
                                <button
                                  onClick={bthHandler}>
                                  нет
                                </button>
                                <button
                                onClick={deleteMovie}>
                                Да
                                </button>
                                </div>
                                }
                        </div>
                        </div>
            </div>
    )
}