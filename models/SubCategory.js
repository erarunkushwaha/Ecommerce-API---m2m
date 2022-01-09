const mongoose = require("mongoose");
const slugify = require("slugify");
const SubCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide sub-category name"],
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

    status: {
      type: String,
      required: [true, "Please provide status"],
      enum: ["active", "inactive"],
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

SubCategorySchema.pre("save", async function () {
  this.slug = await slugify(this.name, { lower: true });
});

module.exports = mongoose.model("SubCategory", SubCategorySchema);
