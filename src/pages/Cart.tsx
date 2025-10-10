import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity, calculateTotal, showNotification } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 pb-24">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart className="w-20 h-20 mx-auto text-muted mb-4" />
          <p className="text-xl text-muted-foreground mb-6">Your cart is empty</p>
          <Link 
            to="/shop"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full hover:opacity-90 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div>
          <div className="space-y-4 mb-8">
            {cart.map(item => (
              <div key={item.cartId} className="bg-card p-6 rounded-lg shadow-lg flex gap-4">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                  {item.size && <p className="text-sm text-muted-foreground mb-2">Size: {item.size}</p>}
                  <p className="text-lg font-bold text-primary">R{item.price}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button 
                    onClick={() => removeFromCart(item.cartId)}
                    className="text-destructive hover:opacity-80 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateCartQuantity(item.cartId, item.quantity - 1)}
                      className="w-8 h-8 bg-muted rounded hover:bg-muted/80 transition"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button 
                      onClick={() => updateCartQuantity(item.cartId, item.quantity + 1)}
                      className="w-8 h-8 bg-muted rounded hover:bg-muted/80 transition"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-bold">R{item.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold">Total:</span>
              <span className="text-3xl font-bold text-primary">R{calculateTotal()}</span>
            </div>
            <button 
              onClick={() => showNotification('Processing checkout...')}
              className="w-full bg-primary text-primary-foreground py-4 rounded-full text-lg font-semibold hover:opacity-90 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
