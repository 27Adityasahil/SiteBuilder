import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
  }
}, {
  timestamps: true,
});

const Asset = mongoose.model('Asset', assetSchema);

export default Asset;
