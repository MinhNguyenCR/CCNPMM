import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock products data for demonstration
  const mockProducts = [
    {
      _id: '1',
      name: 'iPhone 15 Pro Max',
      price: 29990000,
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&h=300&fit=crop',
      rating: 4.9,
      sold: 150
    },
    {
      _id: '2',
      name: 'MacBook Air M3',
      price: 32990000,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
      rating: 4.8,
      sold: 89
    },
    {
      _id: '3',
      name: 'Sony WH-1000XM5',
      price: 8990000,
      image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&h=300&fit=crop',
      rating: 4.7,
      sold: 234
    },
    {
      _id: '4',
      name: 'Nike Air Force 1',
      price: 2790000,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop',
      rating: 4.6,
      sold: 456
    }
  ];

  useEffect(() => {
    // Simulate API call hoặc sử dụng API thật của bạn
    const fetchFeaturedProducts = async () => {
      try {
        // Uncomment dòng dưới để sử dụng API thật
        // const response = await fetch('http://localhost:8080/v1/api/products/featured?limit=8');
        // const data = await response.json();
        // if (data.EC === 0) {
        //   setFeaturedProducts(data.DT.products);
        // }
        
        // Mock loading time
        await new Promise(resolve => setTimeout(resolve, 1500));
        setFeaturedProducts(mockProducts);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const ProductCard = ({ product }) => (
    <div style={styles.productCard}>
      <div style={styles.productImageContainer}>
        <img 
          src={product.image} 
          alt={product.name}
          style={styles.productImage}
        />
        <div style={styles.hotBadge}>Hot</div>
        <div style={styles.starButton}>⭐</div>
      </div>
      <div style={styles.productContent}>
        <h3 style={styles.productName}>{product.name}</h3>
        <div style={styles.productPrice}>
          <span style={styles.price}>{formatPrice(product.price)}</span>
          <div style={styles.rating}>
            <span>⭐ {product.rating}</span>
          </div>
        </div>
        <div style={styles.productFooter}>
          <span style={styles.soldText}>Đã bán: {product.sold}</span>
          <button style={styles.addToCartBtn}>Thêm vào giỏ</button>
        </div>
      </div>
    </div>
  );

  const LoadingSpinner = () => (
    <div style={styles.loadingContainer}>
      <div style={styles.spinner}></div>
      <p style={styles.loadingText}>Đang tải sản phẩm...</p>
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <div style={styles.heroText}>
            <div style={styles.brandHeader}>
              <span style={styles.crownIcon}>👑</span>
              <span style={styles.brandText}>Premium Store</span>
            </div>
            
            <h1 style={styles.heroTitle}>
              Mua sắm <br />
              <span style={styles.heroTitleGradient}>Thông minh</span>
            </h1>
            
            <p style={styles.heroDescription}>
              Khám phá hàng nghìn sản phẩm chất lượng cao từ các thương hiệu uy tín. 
              Trải nghiệm mua sắm hoàn hảo với dịch vụ tận tâm.
            </p>
            
            <div style={styles.heroActions}>
              <button style={styles.primaryBtn}>
                🛍️ Xem sản phẩm →
              </button>
              <button style={styles.secondaryBtn}>
                Đăng ký ngay
              </button>
            </div>
          </div>
          
          <div style={styles.heroImageContainer}>
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRdn2JGanNoeDqgKGhfw8dV9Vw7F4KEqtn9g&s" 
              alt="Online Shopping"
              style={styles.heroImage}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionBadge}>
              <span>✨ Tại sao chọn chúng tôi</span>
            </div>
            <h2 style={styles.sectionTitle}>Trải nghiệm mua sắm đẳng cấp</h2>
            <p style={styles.sectionSubtitle}>
              Chúng tôi cam kết mang đến cho bạn những giá trị tốt nhất
            </p>
          </div>
          
          <div style={styles.featuresGrid}>
            <div style={styles.featureCard}>
              <div style={{...styles.featureIcon, background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)'}}>
                🛍️
              </div>
              <h3 style={styles.featureTitle}>Sản phẩm đa dạng</h3>
              <p style={styles.featureDescription}>
                Hàng nghìn sản phẩm từ các thương hiệu uy tín hàng đầu thế giới
              </p>
            </div>
            
            <div style={styles.featureCard}>
              <div style={{...styles.featureIcon, background: 'linear-gradient(135deg, #EC4899, #F59E0B)'}}>
                🛡️
              </div>
              <h3 style={styles.featureTitle}>Chất lượng đảm bảo</h3>
              <p style={styles.featureDescription}>
                Cam kết 100% hàng chính hãng với chế độ bảo hành toàn diện
              </p>
            </div>
            
            <div style={styles.featureCard}>
              <div style={{...styles.featureIcon, background: 'linear-gradient(135deg, #10B981, #3B82F6)'}}>
                🚚
              </div>
              <h3 style={styles.featureTitle}>Giao hàng siêu tốc</h3>
              <p style={styles.featureDescription}>
                Giao hàng miễn phí toàn quốc, hỗ trợ khách hàng 24/7
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section style={styles.productsSection}>
        <div style={styles.sectionContainer}>
          <div style={styles.productsSectionHeader}>
            <div>
              <div style={styles.sectionBadge}>
                <span>🎁 Sản phẩm hot</span>
              </div>
              <h2 style={styles.sectionTitle}>Sản phẩm nổi bật</h2>
            </div>
            <button style={styles.viewAllBtn}>
              Xem tất cả →
            </button>
          </div>
          
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div style={styles.productsGrid}>
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Sẵn sàng khám phá?</h2>
          <p style={styles.ctaDescription}>
            Tham gia cùng hàng triệu khách hàng đã tin tưởng và lựa chọn chúng tôi
          </p>
          <button style={styles.ctaButton}>
            🛍️ Bắt đầu mua sắm →
          </button>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  
  // Hero Section Styles
  heroSection: {
    background: 'linear-gradient(135deg, #66ea8bff 0%, #764ba2 100%)',
    position: 'relative',
    overflow: 'hidden',
    padding: '80px 20px',
  },
  heroContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '60px',
    alignItems: 'center',
  },
  heroText: {
    color: 'white',
  },
  brandHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '30px',
  },
  crownIcon: {
    fontSize: '32px',
  },
  brandText: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#FDE047',
  },
  heroTitle: {
    fontSize: 'clamp(48px, 8vw, 72px)',
    fontWeight: '800',
    lineHeight: '1.1',
    marginBottom: '30px',
  },
  heroTitleGradient: {
    background: 'linear-gradient(45deg, #FDE047, #FB7185)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroDescription: {
    fontSize: '20px',
    lineHeight: '1.6',
    marginBottom: '40px',
    color: 'rgba(255,255,255,0.9)',
  },
  heroActions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  primaryBtn: {
    background: 'white',
    color: '#3B82F6',
    border: 'none',
    padding: '16px 32px',
    borderRadius: '16px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
  },
  secondaryBtn: {
    background: 'transparent',
    color: 'white',
    border: '2px solid white',
    padding: '16px 32px',
    borderRadius: '16px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  heroImageContainer: {
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    borderRadius: '24px',
    boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
  },
  
  // Features Section Styles
  featuresSection: {
    padding: '80px 20px',
    background: 'white',
  },
  sectionContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '60px',
  },
  sectionBadge: {
    display: 'inline-block',
    background: 'linear-gradient(45deg, #EC4899, #F59E0B)',
    color: 'white',
    padding: '8px 20px',
    borderRadius: '25px',
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: 'clamp(36px, 6vw, 48px)',
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: '20px',
  },
  sectionSubtitle: {
    fontSize: '20px',
    color: '#6B7280',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '40px',
  },
  featureCard: {
    textAlign: 'center',
    padding: '40px 20px',
    borderRadius: '20px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    border: '1px solid #E5E7EB',
  },
  featureIcon: {
    width: '80px',
    height: '80px',
    borderRadius: '20px',
    margin: '0 auto 30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    transition: 'transform 0.3s ease',
  },
  featureTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: '16px',
  },
  featureDescription: {
    fontSize: '16px',
    color: '#6B7280',
    lineHeight: '1.6',
  },
  
  // Products Section Styles
  productsSection: {
    padding: '80px 20px',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  },
  productsSectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '60px',
    flexWrap: 'wrap',
    gap: '20px',
  },
  viewAllBtn: {
    background: 'transparent',
    color: '#3B82F6',
    border: 'none',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
  },
  productCard: {
    background: 'white',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    border: '1px solid #E5E7EB',
  },
  productImageContainer: {
    position: 'relative',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  hotBadge: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    background: 'linear-gradient(45deg, #EC4899, #F59E0B)',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
  },
  starButton: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: 'rgba(255,255,255,0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
  },
  productContent: {
    padding: '20px',
  },
  productName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: '12px',
    transition: 'color 0.3s ease',
  },
  productPrice: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  price: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#3B82F6',
  },
  rating: {
    fontSize: '14px',
    color: '#6B7280',
  },
  productFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  soldText: {
    fontSize: '14px',
    color: '#6B7280',
  },
  addToCartBtn: {
    background: '#3B82F6',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  
  // Loading Styles
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '60px 20px',
  },
  spinner: {
    width: '60px',
    height: '60px',
    border: '4px solid #E5E7EB',
    borderTop: '4px solid #3B82F6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#6B7280',
    fontWeight: '500',
  },
  
  // CTA Section Styles
  ctaSection: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '80px 20px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  ctaContent: {
    maxWidth: '800px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
  },
  ctaTitle: {
    fontSize: 'clamp(36px, 6vw, 56px)',
    fontWeight: '800',
    color: 'white',
    marginBottom: '24px',
  },
  ctaDescription: {
    fontSize: '20px',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: '40px',
    lineHeight: '1.6',
  },
  ctaButton: {
    background: 'white',
    color: '#3B82F6',
    border: 'none',
    padding: '20px 40px',
    borderRadius: '16px',
    fontSize: '20px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
  },
};

// CSS Animation cho spinner
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* Hover effects */
  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  }
  
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  }
  
  .product-card:hover .product-image {
    transform: scale(1.05);
  }
  
  .primary-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.3);
  }
  
  .secondary-btn:hover {
    background: white;
    color: #3B82F6;
  }
  
  .add-to-cart-btn:hover {
    background: #2563EB;
    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.4);
  }
  
  .cta-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  }
`;
document.head.appendChild(styleSheet);

export default HomePage;