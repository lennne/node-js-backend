

const {products} = require('../data/products')

const resolvers = {
    Query: {
        products: () => {
            console.log('Data type: ', typeof products)
            return products
        },
        product: (parent, args) => {
            console.log(args)
            return products.find(product => product.id === parseInt(args.id))
        }
    }
}

module.exports = resolvers;