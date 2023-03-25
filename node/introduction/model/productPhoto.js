const mongoose = require('mongoose');
const slugs = require('slug');

const { Schema } = mongoose;

let ProductPhotoSchema = new Schema({
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  name: {
    type: String
  }
});

// ProductPhotoSchema.pre('save', (next) => {

//   this.slug = slugs(this.nombre);
//   next();

// });

module.exports = mongoose.model('ProductPhoto', ProductPhotoSchema);