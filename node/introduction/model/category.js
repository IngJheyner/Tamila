const mongoose = require('mongoose');
const slugs = require('slug');

const { Schema } = mongoose;

let CategorySchema = new Schema({

  name: {
    type: String,
    trim: true
  },
  slug: {
    type: String,
  }

}, {
  timestamps: false,
  versionKey: false,
});


CategorySchema.pre('save', function (next) {

  const slug = slugs(this.name);
  this.slug = `${slug}`;
  next();

});

module.exports = mongoose.model('Category', CategorySchema);

