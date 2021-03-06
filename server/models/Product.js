const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  images: {
    type: Array
},
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      commentDate: {
        type: Date,
        default: Date.now(),
        get: (timestamp) => dateFormat(timestamp)
      },
    },
  ],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
