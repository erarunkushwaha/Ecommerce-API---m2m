const SubCategory = require("../models/SubCategory");
const Category = require("../models/Category");
const { StatusCodes } = require("http-status-codes");
const slugify = require("slugify");

const CustomError = require("../errors");

const create = async (req, res) => {
  const { name, status, catSlug } = req.body;

  const cat = await Category.findOne({ slug: catSlug });
  const { _id: category } = cat;
  if (!cat) {
    throw new CustomError.NotFoundError(
      `this is not: ${category} valid category`
    );
  }
  const subCategory = await SubCategory.create({
    name,
    status,
    category,
  });
  res.status(StatusCodes.CREATED).json({ subCategory });
};

const list = async (req, res) => {
  const subCategory = await SubCategory.find({}).populate("category", [
    "name",
    "slug",
  ]);
  res.status(StatusCodes.OK).json({ subCategory });
};

const read = async (req, res) => {
  const { slug } = req.params;
  const subCategory = await SubCategory.find({ slug });
  res.status(StatusCodes.OK).json({ subCategory });
};

const update = async (req, res) => {
  const { slug } = req.params;
  const { name, status, parentCat } = req.body;

  const cat = await Category.findOne({ slug: parentCat });
  if (!cat) {
    throw new CustomError.NotFoundError(
      `this is not: ${category} valid category`
    );
  }
  const { _id: category } = cat;
  const subCategory = await SubCategory.findOneAndUpdate(
    { slug },
    { name, status, slug: await slugify(name), category },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ subCategory });
};

const remove = async (req, res) => {
  const { slug } = req.params;
  const subCategory = await SubCategory.findOne({ slug });
  if (!subCategory) {
    throw new CustomError.NotFoundError(`No subCategory with id : ${slug}`);
  }
  subCategory.remove();
  res.status(StatusCodes.OK).json({ msg: "success! subCategory removed" });
};
// Public Route
// Get All Products   =>    GET /api/v1/products

// const getAllProducts = async (req, res) => {
//   const products = await Product.find({});
//   res.status(StatusCodes.OK).json({ products, count: products.length });
// };

// // Public Route
// // Get Single Product   =>    GET /api/v1/products/:id

// const getSingleProduct = async (req, res) => {
//   const { id: productId } = req.params;
//   const product = await Product.findOne({ _id: productId }).populate("reviews");
//   if (!product) {
//     throw new CustomError.NotFoundError(`No product with id : ${productId}`);
//   }
//   res.status(StatusCodes.OK).json({ product });
// };

// // Protected Route / Admin Only
// // Update Product  =>    PATCH /api/v1/products/:id

// const updateProduct = async (req, res) => {
//   const { id: productId } = req.params;

//   const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   if (!product) {
//     throw new CustomError.NotFoundError(`No product with id : ${productId}`);
//   }
//   res.status(StatusCodes.OK).json({ product });
// };

// // Protected Route / Admin Only
// // Delete Product =>    DELETE /api/v1/products/:id

// const deleteProduct = async (req, res) => {
//   const { id: productId } = req.params;

//   const product = await Product.findOne({ _id: productId });

//   if (!product) {
//     throw new CustomError.NotFoundError(`No product with id : ${productId}`);
//   }

//   product.remove();
//   res.status(StatusCodes.OK).json({ msg: "success! product removed" });
// };

// // Protected Route / Admin Only
// // Upload Image =>    POST /api/v1/products/uploadImage

// const uploadImage = async (req, res) => {
//   if (!req.files) {
//     throw new CustomError.BadRequestError("No File Uploaded");
//   }
//   const productImage = req.files.image;
//   if (!productImage.mimetype.startsWith("image")) {
//     throw new CustomError.BadRequestError("Please Upload Image");
//   }
//   const maxSize = 1024 * 1024;
//   if (productImage.size > maxSize) {
//     throw new CustomError.BadRequestError("Please upload image smaller 1MB");
//   }
//   const imagePath = path.join(
//     __dirname,
//     "../public/uploads/" + `${productImage.name}`
//   );
//   await productImage.mv(imagePath);

//   return res
//     .status(StatusCodes.OK)
//     .json({ image: `/uploads/${productImage.name}` });
// };
module.exports = {
  create,
  list,
  read,
  update,
  remove,
  //   getAllProducts,
  //   getSingleProduct,
  //   updateProduct,
  //   deleteProduct,
  //   uploadImage,
};
