import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: 6,
    },
    googleId: {
      type: String,
      default: null,
    },
    plan: {
      type: String,
      enum: ['free', 'paid'],
      default: 'free',
    },
    subscriptionStartDate: {
      type: Date,
      default: null,
    },
    subscriptionEndDate: {
      type: Date,
      default: null,
    },
    heroScreenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HeroScreen',
      default: null,
    },
    spotifyAccessToken: {
      type: String,
      default: null,
    },
    spotifyRefreshToken: {
      type: String,
      default: null,
    },
    spotifyConnected: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  if (!this.password) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User