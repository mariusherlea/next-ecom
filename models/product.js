import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const ratingSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      maxlength: 200,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      require: true,
      unique: true,
      minlength: 3,
      maxlength: 160,
      text: true, //for text search
    },
    slug: {
      type: String,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000000,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 6,
      validate: {
        validator: function (v) {
          return v !== 0;
        },
        message: `Price must be greater than 0`,
      },
    },

    previousPrice: Number,
    color: String,
    brand: String,
    stock: Number,

    shipping: {
      type: Boolean,
      default: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    images: [
      {
        secure_url: {
          type: String,
          default: "",
        },
        public_id: {
          type: String,
          default: "",
        },
      },
    ],
    sold: {
      type: Number,
      default: 0,
    },
    likes: [likeSchema],
    ratings: [ratingSchema],
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(mongooseUniqueValidator, {
  message: "already exists",
});
export default mongoose.model.Product ||
  mongoose.model("Product", productSchema);
