import React, { useState, useEffect, useCallback } from "react";
import ProductCard from "./ProductCard";
import LoadingSpinner from "../common/LoadingSpinner";
import "./ProductList.css";
import {InputText} from "buoi7"


const ProductList = ({
  category = null,
  searchTerm = null,
  showFilters = true,
  itemsPerPage = 5,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category || "all");
  const [search, setSearch] = useState(searchTerm || "");
  const [sortOrder, setSortOrder] = useState(null);

  // Fetch products
  const fetchProducts = useCallback(
    async (page = 1, reset = false) => {
      try {
        if (page === 1) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }
        setError(null);

        const params = new URLSearchParams({
          page: page.toString(),
          limit: itemsPerPage.toString(),
        });

        if (selectedCategory && selectedCategory !== "all") {
          console.log("check", selectedCategory);

          params.append("category", selectedCategory);
        }
        let url = `http://localhost:8080/v1/api/products`;
        if (search) {
          params.append("q", search);
          url = `http://localhost:8080/v1/api/products/search?${params}`;
        } else url = `http://localhost:8080/v1/api/products?${params}`;
        console.log('xxxxxx', url);

        const response = await fetch(url);
        console.log("Response status:", response);

        const data = await response.json();
        console.log("Fetched data:", data);

        const newProducts = data.DT.products;

        if (reset) {
          setProducts(newProducts);
        } else {
          setProducts((prev) => [...prev, ...newProducts]);
        }

        setHasMore(data.DT.pagination.hasNextPage);
        setCurrentPage(page);
      } catch (err) {
        setError("Lỗi khi tải sản phẩm");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [selectedCategory, search, itemsPerPage]
  );

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/v1/api/products/categories"
      );
      const data = await response.json();

      if (data.EC === 0) {
        setCategories(data.DT);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Load more products
  const loadMore = () => {
    if (!loadingMore && hasMore) {
      fetchProducts(currentPage + 1, false);
    }
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Handle search
  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      setCurrentPage(1);
      setProducts([]);
      fetchProducts(1, true);
    }
  };
  useEffect(() => {
    if (sortOrder) {
      const sortedProducts = [...products].sort((a, b) => {
        if (sortOrder === "asc") return a.price - b.price;
        if (sortOrder === "desc") return b.price - a.price;
        return 0;
      });
      setProducts(sortedProducts);
    }
  }, [sortOrder]);
  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 5000
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingMore, hasMore, currentPage]);

  // Initial load
  useEffect(() => {
    fetchProducts(1, true);
    fetchCategories();
  }, []);
  useEffect(() => {
    setCurrentPage(1);
    setProducts([]);
    fetchProducts(1, true);
  }, [selectedCategory]);

  // Reset when category or search changes
  useEffect(() => {
    if (category !== selectedCategory || searchTerm !== search) {
      setSelectedCategory(category || "all");
      setSearch(searchTerm || "");
      setCurrentPage(1);
      setProducts([]);
      fetchProducts(1, true);
    }
  }, [category, searchTerm]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Lỗi khi tải sản phẩm</h3>
        <p>{error}</p>
        <button onClick={() => fetchProducts(1, true)} className="retry-btn">
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      {showFilters && (
        <div className="product-filters">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchEnter}
              className="search-input"
            />
          </div>

          <div className="category-filters">
            <button
              className={`category-btn ${selectedCategory === "all" ? "active" : ""
                }`}
              onClick={() => handleCategoryChange("all")}
            >
              Tất cả
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-btn ${selectedCategory === cat ? "active" : ""
                  }`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="sort-buttons">
            <button
              className={`sort-btn ${sortOrder === "asc" ? "active" : ""}`}
              onClick={() => setSortOrder("asc")}
            >
              Giá: Thấp → Cao
            </button>
            <button
              className={`sort-btn ${sortOrder === "desc" ? "active" : ""}`}
              onClick={() => setSortOrder("desc")}
            >
              Giá: Cao → Thấp
            </button>
          </div>

        </div>

      )}

      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="no-products">
            <h3>Không tìm thấy sản phẩm nào</h3>
            <p>Hãy thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác</p>
          </div>
        )}
      </div>

      {loadingMore && (
        <div className="loading-more">
          <LoadingSpinner />
          <p>Đang tải thêm sản phẩm...</p>
        </div>
      )}

      {!hasMore && products.length > 0 && (
        <div className="no-more-products">
          <p>Đã hiển thị tất cả sản phẩm</p>
        </div>
      )}
      <InputText />
    </div>
  );
};

export default ProductList;
