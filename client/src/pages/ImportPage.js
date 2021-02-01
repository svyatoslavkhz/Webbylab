import React from 'react';
import {useMessage} from '../hooks/message.hook'


export const ImportPage = () => {

    const message = useMessage();
    const unificate = {
      'Title':'title',
      'Release Year':'year',
      'Format':'format',
      'Stars':'stars'
    };

    const uploadData = async (filmObcject) => {
        try{

            if (filmObcject.title && filmObcject.year && filmObcject.format && filmObcject.stars) {

            const search = await fetch('http://localhost:4000/api/movie/upload', {method:"POST", body: JSON.stringify(filmObcject), headers: {
              'Content-Type': 'application/json;charset=utf-8'
            }})
            }
          }
          catch (e) {
            message('Что-то пошло не так')
          }
        }

    const showFile = (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = (e) => { 
            const text = (e.target.result)
            let strFilms = text.split(/\n{2,}/);
            if (!strFilms[strFilms.length-1]) strFilms.pop();
            return strFilms.map(film => {
                    const fields = film.split(/\n/);
                    return fields.reduce((obj, field)=>{
                        const arrField = field.split(/:/);
                        obj[unificate[arrField[0]]]=arrField[1].trim();
                        uploadData(obj)
                        return obj;
                    },{});
                }
            );
        };
        reader.readAsText(e.target.files[0])
        message('Импортировано')
  }


    return (<div>
               <h1>Загрузить данные из файла</h1>
               <input type="file" onChange={(e) => showFile(e)} />
            </div>)
}