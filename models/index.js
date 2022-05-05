// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category

Product.belongsto(Category, {
    foreignKey: 'catergory_id'
});

// Categories have many Products

Category.hasMany(product, {
    foreignKey: 'category_id'
});

// Products belongToMany Tags (through ProductTag)

product.belongsToMany(tag, {
    through: ProductTag,
    foreignKey: 'product_id'
});

// Tags belongToMany Products (through ProductTag)

tag.belongsToMany(product, {
    through: ProductTag,
    foreignKey: 'tag_id'
});

module.exports = {
    Product,
    Category,
    Tag,
    ProductTag,
};