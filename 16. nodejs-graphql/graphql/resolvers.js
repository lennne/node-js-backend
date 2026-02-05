

const {products} = require('../data/products')

const resolvers = {
    Query: {
        products: () => {
            console.log('Data type: ', typeof products)
            return products
        },
        product: (_, args) => {
            console.log(args)
            return products.find(product => product.id === parseInt(args.id))
        }
    },
    Mutation: {
        createProduct: (_, {title, category, price, inStock }) => {
            const newlyCreatedProduct = {
                id: String(products.length + 1),
                title,
                category,
                price,
                inStock
            }
            products.push(newlyCreatedProduct)
            return newlyCreatedProduct
        },
        updateProduct: (_, {id, ...updates}) => {
            const index = products.findIndex(product => product.id === parseInt(id))
            if(index === -1) return null

            const updatedProduct = {
                ...products[index], ...updates
            }
            console.log("updated: ", updatedProduct)
            products[index] = updatedProduct
            return updatedProduct
        },
        deleteProduct: (_, {id}) => {
            const index = products.findIndex(product => product.id = parseInt(id))
            const deletedItem = products.splice(index, 1)
            console.log("deleted Item", deletedItem)
            return true
        }
    }
}

module.exports = resolvers;