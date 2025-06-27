import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productAPI } from '../services/api';
import Swal from 'sweetalert2';

function ProductForm({ productId, onSuccess, onCancel }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const [nameError, setNameError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [quantityError, setQuantityError] = useState('');

  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchId = id || productId;
    if (fetchId) {
      setIsEdit(true);
      loadProduct(fetchId);
    }
  }, [id, productId]);

  const loadProduct = async (fetchId) => {
    setLoading(true);
    try {
      const res = await productAPI.getById(fetchId);
      const product = res.data;
      setName(product.name);
      setPrice(product.price.toString());
      setQuantity(product.quantity.toString());
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error loading product',
        text: 'Could not fetch product data',
      });
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
    setName(value);
    if (!value) setNameError('Name is required');
    else if (value.length < 2) setNameError('At least 2 characters');
    else setNameError('');
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPrice(value);
    const number = parseFloat(value);
    if (!value) setPriceError('Price is required');
    else if (isNaN(number)) setPriceError('Enter a valid number');
    else if (number <= 0) setPriceError('Must be greater than 0');
    else setPriceError('');
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    setQuantity(value);
    const number = parseInt(value);
    if (value === '') setQuantityError('Quantity is required');
    else if (isNaN(number)) setQuantityError('Enter a valid number');
    else if (number < 0) setQuantityError('Cannot be negative');
    else setQuantityError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) setNameError('Name is required');
    if (!price) setPriceError('Price is required');
    if (quantity === '') setQuantityError('Quantity is required');

    if (nameError || priceError || quantityError || !name || !price || quantity === '') {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fix the fields and try again.',
      });
      return;
    }

    const product = {
      name: name.trim(),
      price: parseFloat(price),
      quantity: parseInt(quantity),
    };

    setLoading(true);

    try {
      if (isEdit) {
        await productAPI.update(id || productId, product);
        Swal.fire({ icon: 'success', title: 'Updated!', text: 'Product updated.' });
      } else {
        await productAPI.create(product);
        Swal.fire({ icon: 'success', title: 'Created!', text: 'Product added.' });
        setName('');
        setPrice('');
        setQuantity('');
        setNameError('');
        setPriceError('');
        setQuantityError('');
      }

      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else {
          navigate('/products');
        }
      }, 1500);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Save failed',
        text: err.response?.data?.error || 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    if (onCancel) onCancel();
    else navigate('/products');
  };

  if (loading && isEdit) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary"></div>
        <p className="mt-3">Loading product...</p>
      </div>
    );
  }

  const formJSX = (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Product Name</label>
        <input
          type="text"
          className={`form-control ${nameError ? 'is-invalid' : ''}`}
          value={name}
          onChange={handleNameChange}
          required
          placeholder="Enter product name"
        />
        {nameError && <div className="invalid-feedback d-block">{nameError}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Price ($)</label>
        <input
          type="number"
          className={`form-control ${priceError ? 'is-invalid' : ''}`}
          value={price}
          onChange={handlePriceChange}
          step="0.01"
          required
          placeholder="Enter product price"
        />
        {priceError && <div className="invalid-feedback d-block">{priceError}</div>}
      </div>

      <div className="mb-4">
        <label className="form-label">Quantity</label>
        <input
          type="number"
          className={`form-control ${quantityError ? 'is-invalid' : ''}`}
          value={quantity}
          onChange={handleQuantityChange}
          required
          placeholder="Enter product quantity"
        />
        {quantityError && <div className="invalid-feedback d-block">{quantityError}</div>}
      </div>

      <div className="d-flex justify-content-end gap-3">
        <button type="button" className="btn btn-secondary" onClick={handleCancelClick}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Add Product'}
        </button>
      </div>
    </form>
  );

  if (onSuccess) {
    return formJSX;
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h3>{isEdit ? 'Edit Product' : 'Add New Product'}</h3>
            </div>
            <div className="card-body p-4">{formJSX}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
