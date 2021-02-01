const {Router} = require('express');
const Movie = require('../models/Movie');
const router = Router();
const error = {message: 'Что-то пошло не так, проверьте данные'};
const re = /\s*,\s*/;

router.get('/', async (req,res) => {

    try{ 
        const movies = await Movie.find().sort('title');
        res.status(200).json(movies)
        }
    catch (e) {
        res.status(500).json(error)
    }
});

router.post('/create', async (req, res) => {
    try {
        const {title, year, format, star} = req.body;
        let stars = [];
        stars = star.split(re);
        const movies = new Movie({
            title, year, format, actors: stars
        })

        await movies.save();
        res.status(201).json({message:'Создано'})
       
    } catch (e) {
        res.status(500).json(error)
    }
})

router.put('/edit/:id', async (req, res) => {
    try {
        const {title, year, format, star} = req.body;
        const doc = await Movie.findOne({ _id:req.params.id });
        let stars = [];
        stars = star.split(re);
        const update = { title, year, format, actors: stars };
        await doc.updateOne(update);
        res.status(201).json({message:'Отредактировано'})
    } catch (e) {
        res.status(500).json(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
      const movies = await Movie.findById(req.params.id)
      res.json(movies)
    } catch (e) {
      res.status(500).json(error)
    }
})

router.post('/search', async (req, res) => {
    try {
        const {query} = req.body;
        query.trim();
        let newQuery  = query.charAt(0).toUpperCase() + query.slice(1);
        if (newQuery==='') {
            const movies = await Movie.find();
            res.json(movies)
        }
        const movies = await Movie.find().or([{title: newQuery}, {actors:newQuery}])
        res.json(movies)
    } catch (e) {
        res.status(500).json(error)
    }
})

router.post('/upload', async (req, res) => {
        try {

            const {title, year, format, stars} = req.body;
            let arrActors = [];
            arrActors = stars.split(re);
            const movies = new Movie({
                title, year, format, actors: arrActors
            })
    
            await movies.save();
            res.status(200).json({message:'добавлено'})
        }
        catch (e) {
            res.status(500).json(error)
        }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const movies = await Movie.findOne({ _id:req.params.id }).remove().exec();
        res.status(200).json({message:'Файл удален'})

    } catch (e) {
        res.status(500).json(error)
    }
})

module.exports = router;