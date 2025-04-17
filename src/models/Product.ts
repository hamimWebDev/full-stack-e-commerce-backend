import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountedPrice: { type: Number },
  category: { 
    type: String, 
    required: true,
    enum: ['Laptop', 'Processor', 'Monitor', 'Speaker', 'Software', 'Gaming', 'Printer', 'GPU', 'Camera', 'Accessories']
  },
  brand: {
    type: String,
    required: true,
    enum: ['Apple', 'Microsoft', 'HP', 'Asus', 'Dell', 'Lenovo', 'Acer', 'Intel', 'Amd', 'Msi', 'Gigabyte']
  },
  images: [{ type: String, required: true }],
  stock: { type: Number, required: true, default: 0 },
  features: [String],
  specifications: mongoose.Schema.Types.Mixed,
  emiAvailable: { type: Boolean, default: false },
  emiOptions: [{
    months: Number,
    monthlyAmount: Number,
    interestRate: Number
  }],
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: Number,
    comment: String,
    date: { type: Date, default: Date.now }
  }],
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

productSchema.index({ name: 'text', description: 'text', tags: 'text' });

const Product = mongoose.model('Product', productSchema);

export default Product; 