const router = require('express').Router()
const { womenCatalog } = require('../../models/catalogItem.model')

router.get('/' , (req , res) => {
    womenCatalog.find()
    .then(catalog => {
        res.json(catalog)
    })
    .catch(error => res.status(400).json({msg: error}))
})

router.post('/' , (req , res) => {
    let newMenCatalog = new womenCatalog({...req.body})
    newMenCatalog.save()
    .then(catalog => res.json(catalog))
    .catch(error => res.status(400).json({msg: error}))
})

module.exports = router