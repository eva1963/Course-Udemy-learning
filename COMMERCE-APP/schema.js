const {gql} = require('apollo-server')

exports.typeDefs = gql`
    type Query {
        name: String,
        age: Int!,   # ! means required
        price: Float,
        isMarried: Boolean,
        products(filter: ProductsFilterInput): [Product!]!  #不允许返回null
        product(id: ID!): Product
        categories: [Category!]!
        category(id: ID!): Category
    }

    type Product {
        id: ID!,
        name: String,
        description: String,
        quantity: Int,
        price: Float,
        image: String,
        onSale: Boolean,
        # 可以互相引用
        category: Category!
        reviews: [Review!]!
    }

# 可以组合成category，通过id获取到对应的产品
    type Category {
        id: ID!,
        name: String,
        products: [Product!]!
    }

    type Review {
        id: ID!,
        title: String,
        comment: String,
        rating: Int,
        date: String,
        productId: ID!
    }

    input ProductsFilterInput {
        onSale: Boolean,
        avgRating: Int
    }
    `;