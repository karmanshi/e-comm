import React, { memo } from 'react';

const ProductList = ({ products, searchTerm, priceFilter, addToCart }) => { 
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice =
      priceFilter === 'all' || (product.price <= priceFilter);

    return matchesSearch && (matchesPrice);
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded shadow-md">
            <img src={product.thumbnail} alt={product.title} style={{ width: '350px', height: '350px', maxWidth: '350px', maxHeight: '350px' }}></img>
            <h3 className="text-xl mb-2" title={product.description}>{product.brand} - {product.title}</h3>
            <p className="text-gray-700">
            <span className='text-bold font-black'>${product.price}</span> 
            <span className='text-s px-2 line-through'>$ {((product.price/product.discountPercentage)*100).toFixed(2)}</span>
            <span className='text-md px-2 text-green-700 font-bold'>{product.discountPercentage.toFixed(0)}% Off</span></p>

            
            <button
              onClick={() => addToCart(product.id)}
              className="bg-blue-500 text-white py-1 px-2 rounded mt-2"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default memo(ProductList);
