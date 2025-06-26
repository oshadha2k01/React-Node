import React, { useState, useEffect } from 'react';
import { productAPI } from '../services/api';
import ProductForm from './ProductForm';
import Swal from 'sweetalert2';

const Home = () => {
  // State declarations
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  // Load products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to fetch product list
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAll();
      console.log('Products response:', response.data);

      let productsData = [];

      if (Array.isArray(response.data)) {
        // New format: Array of products
        productsData = response.data;
      } else if (response.data && Array.isArray(response.data.products)) {
        // Old format: Object with 'products' array
        productsData = response.data.products;
      }

      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to fetch products',
        confirmButtonColor: '#EF4444'
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete a product
  const handleDelete = async (id, productName) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete "${productName}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await productAPI.delete(id);

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Product has been deleted successfully.',
          confirmButtonColor: '#10B981'
        });

        fetchProducts(); // Reload list
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to delete product',
          confirmButtonColor: '#EF4444'
        });
      }
    }
  };

  // Modal handlers
  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowEditModal = (productId) => {
    setEditProductId(productId);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => {
    setEditProductId(null);
    setShowEditModal(false);
  };

  // Callback when a product is added/updated
  const handleProductAdded = () => {
    setShowAddModal(false);
    fetchProducts();
  };
  const handleProductUpdated = () => {
    setShowEditModal(false);
    setEditProductId(null);
    fetchProducts();
  };

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-3">
      {/* Add product button */}
      <div className="d-flex justify-content-center justify-content-md-end align-items-center mb-4">
        <button onClick={handleShowAddModal} className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>Add New Product
        </button>
      </div>

      {/* Product list or no products message */}
      {(!products || products.length === 0) ? (
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-md-6">
            <div className="card text-center shadow-sm">
              <div className="card-body p-5">
                <i className="bi bi-box-seam display-1 text-muted-custom mb-3"></i>
                <h3 className="card-title">No products found</h3>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {products.map(product => (
            <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="product-price" style={{ color: '#1E40AF', fontWeight: '600' }}>
                    ${product.price}
                  </p>
                  <p className="text-muted-custom mb-3">Quantity: {product.quantity}</p>
                  <div className="mt-auto">
                    <div className="d-flex gap-2 justify-content-end">
                      <button
                        onClick={() => handleShowEditModal(product._id)}
                        style={{
                          border: 'none',
                          color: '#1E40AF',
                          fontSize: '16px',
                          cursor: 'pointer',
                          padding: '4px'
                        }}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(product._id, product.name)}
                        style={{
                          border: 'none',
                          color: '#EF4444',
                          fontSize: '16px',
                          cursor: 'pointer',
                          padding: '4px'
                        }}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Product</h5>
                <button type="button" className="btn-close" onClick={handleCloseAddModal}></button>
              </div>
              <div className="modal-body">
                <ProductForm onSuccess={handleProductAdded} onCancel={handleCloseAddModal} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Product</h5>
                <button type="button" className="btn-close" onClick={handleCloseEditModal}></button>
              </div>
              <div className="modal-body">
                <ProductForm
                  productId={editProductId}
                  onSuccess={handleProductUpdated}
                  onCancel={handleCloseEditModal}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
