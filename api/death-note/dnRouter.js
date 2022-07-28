const express = require('express');
const router = express.Router();
const dnMod = require('./dnModel');

const invalidChar = {message: 'no such character!'};

router.get('/', async (req, res, next) => {
    try {
        let result = await dnMod.getAll();
        res.json(result);
    } catch(err) {
        next(err);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        let result = await dnMod.getBy({id: req.params.id })
        if(result) return res.json(result);
            else return res.status(404).json(invalidChar)
    } catch(err) {
        next(err)
    }
})
router.post('/', async (req, res, next) => {
    try {
        let result = await dnMod.create(req.body)
        res.status(201).json(result)
    } catch(err) {
        next(err)
    }
})
router.put('/:id', async (req, res, next) => {
    try{
        let result = await dnMod.update(req.params.id, req.body);
        if(result) res.json(result);
            else res.status(404).json(invalidChar)
    } catch(err) {
        next(err)
    }
})
router.delete('/:id', async (req, res, next) => {
    try{
        let result = await dnMod.remove(req.params.id)
        if(result) res.json(result);
            else res.status(404).json(invalidChar)
    } catch(err) {
        next(err)
    }
})

module.exports = router;