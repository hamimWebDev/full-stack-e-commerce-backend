import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  branch: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, default: 'Bangladesh' }
  },
  contact: {
    phone: [String],
    email: String,
    helpLine: String
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  openingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  services: [{
    type: String,
    enum: ['Sales', 'Service', 'Warranty', 'EMI', 'Pickup']
  }],
  isMainBranch: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ['active', 'inactive', 'temporarily_closed'],
    default: 'active'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Store = mongoose.model('Store', storeSchema);

export default Store; 