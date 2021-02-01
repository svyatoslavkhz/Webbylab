import React, { useState, useEffect } from 'react';
import {useMessage} from '../hooks/message.hook'
import {useHttp} from '../hooks/http.hook';
import validator from 'validator';
import {useParams} from 'react-router-dom';

export const EditPage = () => {

const message = useMessage();
const {request} = useHttp();
const slug = useParams();
const [form, setForm] = useState({
    title:'',
    year:0,
    format:'',
    star:''
});

    const submitHandler = async () => {
        if (validator.isEmpty(form.title) || validator.isEmpty(form.format) || validator.isEmpty(form.star) || validator.isEmpty(form.year)) {
            return message('Все поля обязательны к заполнению')
        }
        try{
            const fetched = await request(`/edit/${slug.id}`, 'PUT', form)
            message(fetched.message)
          }
        catch (e) {
            message('Ошибка, проверьте введенные данные')
        }
    }

    useEffect (()=>{
        window.M.updateTextFields()
    }, [])

    const changeHandler = (e) => {
        setForm({...form, [e.target.name]:e.target.value.replace(/(<([^>]+)>)/gi, "")})
    }

    return (<div>
                <h1>Редактировать фильм</h1>
                <div className="col s7 offset-s2" style={{paddingTop:'2rem'}}>
            <div className="input-field">
                 <input 
                    placeholder="Введите название" 
                    id="title" 
                    type="text"
                    name="title"
                    value={form.title}
                    className="yellow-input"
                    onChange={changeHandler}
                />
            </div>
            <div className="input-field year">
                <input 
                    placeholder="Введите год" 
                    id="year" 
                    type="text"
                    name="year"
                    value={form.year}
                    className="yellow-input"
                    onChange={changeHandler}
                />
            </div>
            <div className="input-field format">
                    <select className="browser-default" onChange={changeHandler} name="format" display="block">
                    <option value="">Выберите формат</option>
                    <option value="VHS">VHS</option>
                    <option value="DVD">DVD</option>
                    <option value="Blu-Ray">Blu-Ray</option>
                    </select>
            </div>
            <p></p>
            <div className="input-field">
                 <input 
                    placeholder="Введите актеров" 
                    id="star" 
                    type="text"
                    name="star"
                    value={form.star}
                    className="yellow-input"
                    onChange={changeHandler}
                />
            </div>
                <button 
                        className="btn yellow darken-4" 
                        style={{marginRight: 10}}
                        onClick={submitHandler}
                >
                    Сохранить
                </button>
             </div>
            </div>)

}