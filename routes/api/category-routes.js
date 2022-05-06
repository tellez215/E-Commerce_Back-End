const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// get route to find all categories and we get the data by doing a .findAll and we want to get the category id and name and as well as the products id,name,price and etc..
router.get('/', (req, res) => {
    // find all categories
    // be sure to include its associated Products

    Category.findAll({
        attributes: ['id', 'category_name'],
        include: [{
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }]
    })

    .then(dbCategoryData => res.json(dbCategoryData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get route to find a specific category using the id 
router.get('/:id', (req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    // use .findOne to find 1 specific item or in this case a category and we have the products as well using the include and model.
    Category.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'category_name'],
            include: [{
                model: Product,
                attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
            }]
        })
        .then(dbCategoryData => {
            if (!dbCategoryData) {
                res.status(404).json({ messsage: 'No match found!' });
                return;
            }
            res.json(dbCategoryData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    // create a new category
    Category.create({
            category_name: req.body.category_name
        })
        .then(dbCategoryData => res.json(dbCategoryData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    // update a category by its `id` value
    Category.update(req, res, {
            where: {
                id: req.params.id
            }
        })
        .then(dbCategoryData => {
            if (!dbCategoryData[1]) {
                res.status(404).json({ messsage: 'No Match Found!' })
                return;
            }
            res.json(dbCategoryData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    // delete a category by its `id` value

    Category.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbCategoryData => {
            if (!dbCategoryData) {
                res.status(404).json({ message: 'No Match Found!' });
                return;
            }
            res.json(dbCategoryData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        });

});

module.exports = router;