const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Please enter your email!'],
      trim: true,
      unique: true,
    },
    firstname: {
      type: String,
      trim: true,
      default: '',
    },
    lastname: {
      type: String,
      required: [true, 'Please enter your lastname!'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter your password!'],
    },
    role: {
      type: Number,
      default: 0, // 0 = user, 1 = admin
    },
    phonenumber: {
      type: String,
      default: '',
    },
    bank: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    nationality: {
      type: String,
      default: '',
    },
    position: {
      type: String,
      required: [true, 'Please enter your position!'],
      trim: true,
    },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/djkdp3bew/image/upload/v1646378355/Website_Learning/143086968_2856368904622192_1959732218791162458_n_wbaxvf.png',
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Users', userSchema);
