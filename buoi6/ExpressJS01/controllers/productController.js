const {
  getProductService,
  searchProductService,getCategoryService
} = require("../services/productService");

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

const searchProduct = async (req, res) => {
  try {
    const { q: searchTerm, page, limit } = req.query;
    if (!searchTerm) {
      return res
        .status(400)
        .json({ EC: 1, EM: "Thiếu từ khóa tìm kiếm", DT: [] });
    }
    const result = await searchProductService(searchTerm, page, limit);
    
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const result = await getCategoryService();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
};

const getProductsByCategory = async (req, res) => {
  try{
    const {category} = req.params;
    const {page = 1, limit =10} = req.query;

    const result = await getProductService(page, limit, category)
    return res.status(200).json(result);
  }catch(error){
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getProducts, searchProduct , getCategories, getProductsByCategory};
