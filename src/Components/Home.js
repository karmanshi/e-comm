import React, { useState, useEffect, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from './ProductList';

const Home = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [cart, setCart] = useState([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [previousEnabled, setPreviousEnabled] = useState(false)
  const [nextEnabled, setNextEnabled] = useState(true)
  const [limit, setLimitValue] = useState(10);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      // If not logged in, redirect to login page
      navigate('/login');
    } else {
      fetchProducts();
    }
  }, [skip]);

  useEffect(() => {
    if ((skip + limit) >= total) {
      setNextEnabled((prevState) => false)
    }
    else {
      setNextEnabled((prevState) => true)

    }
    if ((skip + limit) <= 10) {
      setPreviousEnabled((prevState) => false)
    }
    else {
      setPreviousEnabled((prevState) => true)
    }
  }, [skip, total]);


  const handleNextPage = useCallback(async () => {
    setSkip((prevSkip) => prevSkip + 10);
  }, []);

  const handlePrevPage = useCallback(async () => {
    // setSkip((skip) => Math.max(0, skip - 10));
    setSkip(prevSkip => prevSkip - 10);

  }, []);

  // hitting the api to get the data
  const fetchProducts = useCallback(async () => {
    try {

      const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
      const data = await response.json();
      setProducts((prevState) => data.products); // set the products
      setTotal((prevState) => data.total) // set the total count of the product

    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, [skip, limit]);

  const addToCart = useCallback(async (productId) => {
    setCart([...cart, productId]);
  }, [cart]);

  return (
    <div className="container mx-auto p-8">
      <div className='w-full text-right'>
        <a >My Cart({cart.length})</a>
      </div>
      <div className='mb-2'>
        <h1 className='text-2xl font-bold'>Welcome to the Home Page!</h1>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products"
          className="border rounded py-1 px-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="border rounded py-1 px-2"
        >
          <option value="all">All Prices</option>
          <option value="100">$100 or less</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <ProductList products={products} searchTerm={searchTerm} priceFilter={priceFilter} addToCart={addToCart} />
      <div>
        {Array.isArray(products) && products.length > 0 ? (
          <div>
            <button disabled={!previousEnabled} className={'bg-blue-500 text-white py-1 px-2 rounded mt-2 ' + (!previousEnabled ? ' bg-gray-500  focus:outline-none disabled:opacity-25' : '')} onClick={handlePrevPage} >
              Previous Page
            </button>
            <button disabled={!nextEnabled} className={'bg-blue-500 text-white py-1 px-2 rounded mt-2 ml-5' + (!nextEnabled ? ' bg-gray-500  focus:outline-none disabled:opacity-25' : '')} onClick={handleNextPage}>Next Page</button>
          </div>
        ) : (
          <button>No data available</button>
        )}
      </div>

    </div>
  );
};

export default memo(Home);
