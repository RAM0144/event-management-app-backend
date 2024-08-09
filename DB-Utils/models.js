import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["seller", "customer"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    images: {
      type: [String], // Array of strings to store image URLs or paths
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.every((url) => typeof url === "string");
        },
        message: "Images must be an array of strings",
      },
    },
    sellerInfo: {
      type: new Schema({
        name: {
          type: String,
          required: true,
          trim: true,
        },
        userId: {
          type: String,
          required: true,
          trim: true,
        },
        phone: {
          type: String,
          required: true,
          trim: true,
        },
        address: {
          type: String,
          trim: true,
        },
      }),
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

export const Event = mongoose.model("Event", eventSchema, "events");


const resortSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    images: {
      type: [String], // Array of strings to store image URLs or paths
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.every((url) => typeof url === "string");
        },
        message: "Images must be an array of strings",
      },
    },
    sellerInfo: {
      type: new Schema({
        name: {
          type: String,
          required: true,
          trim: true,
        },
        userId: {
          type: String,
          required: true,
          trim: true,
        },
        phone: {
          type: String,
          required: true,
          trim: true,
        },
        address: {
          type: String,
          trim: true,
        },
      }),
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

export const Resorts = mongoose.model("Resorts", resortSchema, "resorts");

const hotelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    images: {
      type: [String], // Array of strings to store image URLs or paths
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.every((url) => typeof url === "string");
        },
        message: "Images must be an array of strings",
      },
    },
    sellerInfo: {
      type: new Schema({
        name: {
          type: String,
          required: true,
          trim: true,
        },
        userId: {
          type: String,
          required: true,
          trim: true,
        },
        phone: {
          type: String,
          required: true,
          trim: true,
        },
        address: {
          type: String,
          trim: true,
        },
      }),
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

export const Hotels = mongoose.model("Hotels", hotelSchema, "hotels");

const photoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    images: {
      type: [String], // Array of strings to store image URLs or paths
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.every((url) => typeof url === "string");
        },
        message: "Images must be an array of strings",
      },
    },
    sellerInfo: {
      type: new Schema({
        name: {
          type: String,
          required: true,
          trim: true,
        },
        userId: {
          type: String,
          required: true,
          trim: true,
        },
        phone: {
          type: String,
          required: true,
          trim: true,
        },
        address: {
          type: String,
          trim: true,
        },
      }),
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

export const Photo = mongoose.model("Photo", photoSchema, "photos");

const videoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    images: {
      type: [String], // Array of strings to store image URLs or paths
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.every((url) => typeof url === "string");
        },
        message: "Images must be an array of strings",
      },
    },
    sellerInfo: {
      type: new Schema({
        name: {
          type: String,
          required: true,
          trim: true,
        },
        userId: {
          type: String,
          required: true,
          trim: true,
        },
        phone: {
          type: String,
          required: true,
          trim: true,
        },
        address: {
          type: String,
          trim: true,
        },
      }),
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

export const Video = mongoose.model("Videos", videoSchema, "videos");

const catererSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    images: {
      type: [String], // Array of strings to store image URLs or paths
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.every((url) => typeof url === "string");
        },
        message: "Images must be an array of strings",
      },
    },
    sellerInfo: {
      type: new Schema({
        name: {
          type: String,
          required: true,
          trim: true,
        },
        userId: {
          type: String,
          required: true,
          trim: true,
        },
        phone: {
          type: String,
          required: true,
          trim: true,
        },
        address: {
          type: String,
          trim: true,
        },
      }),
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

export const Caterers = mongoose.model("Caterers", catererSchema, "caterers");

const mehndiSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    images: {
      type: [String], // Array of strings to store image URLs or paths
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.every((url) => typeof url === "string");
        },
        message: "Images must be an array of strings",
      },
    },
    sellerInfo: {
      type: new Schema({
        name: {
          type: String,
          required: true,
          trim: true,
        },
        userId: {
          type: String,
          required: true,
          trim: true,
        },
        phone: {
          type: String,
          required: true,
          trim: true,
        },
        address: {
          type: String,
          trim: true,
        },
      }),
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

export const Mehndi = mongoose.model("Mehndi", mehndiSchema, "mehndi");

const mekeupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    images: {
      type: [String], // Array of strings to store image URLs or paths
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.every((url) => typeof url === "string");
        },
        message: "Images must be an array of strings",
      },
    },
    sellerInfo: {
      type: new Schema({
        name: {
          type: String,
          required: true,
          trim: true,
        },
        userId: {
          type: String,
          required: true,
          trim: true,
        },
        phone: {
          type: String,
          required: true,
          trim: true,
        },
        address: {
          type: String,
          trim: true,
        },
      }),
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

export const Makeup = mongoose.model("Makeup", mekeupSchema, "makeup");

const jewellerySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    images: {
      type: [String], // Array of strings to store image URLs or paths
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.every((url) => typeof url === "string");
        },
        message: "Images must be an array of strings",
      },
    },
    sellerInfo: {
      type: new Schema({
        name: {
          type: String,
          required: true,
          trim: true,
        },
        userId: {
          type: String,
          required: true,
          trim: true,
        },
        phone: {
          type: String,
          required: true,
          trim: true,
        },
        address: {
          type: String,
          trim: true,
        },
      }),
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

export const Jewellery = mongoose.model("Jewellery", jewellerySchema, "jewellery");

const bookingSChema = new Schema({
  bookingId: {
    type: String,
    required: true,
  },
  bookings: {
    type: Array,
  },
  bookingTotal: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  }
});

export const Booking = mongoose.model("Booking", bookingSChema, "bookings");