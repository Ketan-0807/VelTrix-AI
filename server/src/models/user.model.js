import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  subscriptionType: { type: String, required: true },
  subscribedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
export default User;
