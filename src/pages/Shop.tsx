import { ShoppingCart } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { DATABASE } from '@/data/database';

const Shop = () => {
  const { addToCart, selectedSize, setSelectedSize, showNotification } = useApp();

  const handleAddToCart = (product: typeof DATABASE.products[0]) => {
    if (product.sizes && !selectedSize[product.id]) {
      showNotification('Please select a size', 'error');
      return;
    }
    addToCart(product, selectedSize[product.id]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-24">
      <h1 className="text-4xl font-bold mb-8">Shop</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        {DATABASE.products.map(product => (
          <div key={product.id} className="bg-card rounded-xl shadow-lg overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
            <div className="p-6">
              <div className="text-sm text-primary font-semibold mb-2">{product.category}</div>
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-2xl font-bold text-foreground mb-2">R{product.price}</p>
              <p className="text-sm text-muted-foreground mb-4">{product.stock} in stock</p>
              
              {product.sizes && (
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-2">Select Size:</p>
                  <div className="flex gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize({ ...selectedSize, [product.id]: size })}
                        className={`px-4 py-2 border-2 rounded-lg font-semibold transition ${
                          selectedSize[product.id] === size
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-input hover:border-primary/50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <button 
                onClick={() => handleAddToCart(product)}
                className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-full hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
