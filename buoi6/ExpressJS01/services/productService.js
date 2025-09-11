const Product = require("../models/product");
const Fuse = require("fuse.js");

const getProductService = async (
  page = 1,
  limit = 5,
  category = null,
  search = null
) => {
  try {
    const query = {};
    if (category && category !== "All") {
      query.category = category;
    }
    if (search) {
      query.$text = { $search: search };
    }
    skip = (page - 1) * limit;
    const products = await Product.find(query)
      .skip(skip)
      .limit(limit)
      .populate("reviews.user", "username email");
    const total = await Product.countDocuments(query);
    const totalPages = Math.ceil(total / limit);
    return {
      EC: 0,
      EM: "Lấy danh sách sản phẩm thành công",
      DT: {
        products,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: total,
          itemsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const searchProductService = async (searchTerm, page = 1, limit = 10) => {
  try {
    const allProduct = await Product.find().populate(
      "reviews.user",
      "username email"
    );
    const options = {
      includeScore: true,
      threshold: 0.3,
      keys: ["name", "description"],
    };
    const fuse = new Fuse(allProduct, options);
    const result = searchTerm
      ? fuse.search(searchTerm)
      : allProduct.map((p) => ({ item: p }));
    const total = result.length;
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;
    const paginated = result.slice(skip, skip + limit).map((r) => r.item);
    return {
      EM: "Tìm kiếm sản phẩm thành công",
      DT: {
        products: paginated,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: total,
          itemsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};


const getCategoryService = async () => {
  try {
    const categories = await Product.distinct("category");
    return {
      EC: 0,
      EM: "Lấy danh sách danh mục thành công",
      DT: categories,
    };
  } catch (error) {
    return {
      error: error.message,
    }
  }
}



module.exports = { getProductService, searchProductService, getCategoryService};
