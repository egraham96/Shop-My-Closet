const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    images: [String!]
    quantity: Int
    price: Float
    category: Category
    comments: [Comment]
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    comments: [Comment]
    orders: [Order]
  }

  type Comment {
    _id: ID
    commentAuthor: String
    commentText: String
    commentDate: String
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    comments(product: ID, name: String): [Comment]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateProduct(_id: ID!, quantity: Int!): Product
    addProduct(products: [ID]!): Product
    addComment(productId: ID!, commentText: String): Product
    deleteComment(productId: ID!, commentId: ID!): Product
  }
`;

module.exports = typeDefs;
