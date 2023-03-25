const mongoose = require('mongoose');
const slugs = require('slug');

const { Schema } = mongoose;

let ProductSchema = new Schema({
  category_id: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  name: {
    type: String,
    trim: true
  },
  slug: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  }
});

ProductSchema.pre('save', function (next) {

  const slug = slugs(this.name);
  this.slug = `${slug}`;
  next();

});

module.exports = mongoose.model('Product', ProductSchema);