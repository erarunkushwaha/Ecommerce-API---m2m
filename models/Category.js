const mongoose = require("mongoose");
const slugify = require("slugify");
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide category name"],
      trim: true,
      minlength: [3, "to shoort"],
      maxlength: [40, "Name can not be more than 40 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
      maxlength: [50, "slug can not be more than 50 characters"],
    },
    image: {
      type: String,
    },

    status: {
      type: String,
      required: [true, "Please provide status"],
      enum: ["active", "inactive"],
    },
  },
  { timestamps: true }
);
CategorySchema.pre("save", async function () {
  this.slug = await slugify(this.name, { lower: true });
});

module.exports = mongoose.model("Category", CategorySchema);
