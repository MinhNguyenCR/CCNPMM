const Product = require("../models/product");

const getProductService = async (
  page = 1,
  limit = 5,
  category = null,
  search = null
) => {
  try {
    const query = { isActive: true };
    if (category && categorty !== "All") {
      query.category = category;
    }
    if (search) {
      query.$text = { $search: search };
    }
    skip = (page - 1) * limit;
    const products = 
      await Product.find(query).skip(skip).limit(limit)
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


module.exports = {  getProductService };
