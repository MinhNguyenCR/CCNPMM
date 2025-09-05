const { getProductService } = require("../services/productService");

// const getProductById = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const result = await getProductByIdService(productId);
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getProducts = async (req, res) => {
  try {
    const { page, limit, category, search } = req.query;
    const result = await getProductService(page, limit, category, search);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts };
