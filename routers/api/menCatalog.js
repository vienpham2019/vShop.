const router = require('express').Router()
const { menCatalog }   = require('../../models/catalogItem.model')

router.get('/', (req , res) => {
    menCatalog.find()
    .then(catalog => {
        res.json(catalog)
    })
    .catch(error => res.status(400).json({msg: error}))
})

// add catagory review
// router.post('/' , (req , res) => {
//     let newMenCatalog = new menCatalog({...req.body})
//     newMenCatalog.save()
//     .then(catalog => res.json(catalog))
//     .catch(error => res.status(400).json({msg: error}))
// })

// add review 
router.post('/add_review' , (req , res) => {
    let { review , _id } = req.body 
    menCatalog.findOne({_id})
    .then(catalog => {
        if(catalog){
            catalog.reviews.unshift(review)
            catalog.save()
            .then(catalog => {
                res.json(catalog)
            })
            .catch(error => res.status(400).json({msg: error}))
        }
    })
    .catch(error => res.status(400).json({msg: error}))
})

module.exports = router