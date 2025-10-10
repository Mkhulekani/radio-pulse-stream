import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';

const Donate = () => {
  const [donationAmount, setDonationAmount] = useState(100);
  const [isRecurring, setIsRecurring] = useState(false);
  const { showNotification } = useApp();

  const handleDonate = () => {
    showNotification(`Thank you for donating R${donationAmount}!`);
    setDonationAmount(100);
    setIsRecurring(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 pb-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Support Newtown Radio</h1>
        <p className="text-xl text-muted-foreground">Your donation keeps independent radio alive</p>
      </div>

      <div className="bg-card rounded-2xl shadow-xl p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">Choose Your Contribution</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[50, 100, 200, 500].map(amount => (
            <button
              key={amount}
              onClick={() => setDonationAmount(amount)}
              className={`p-4 rounded-lg border-2 font-bold transition ${
                donationAmount === amount
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-input hover:border-primary/50'
              }`}
            >
              R{amount}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Custom Amount</label>
          <input
            type="number"
            value={donationAmount}
            onChange={(e) => setDonationAmount(parseInt(e.target.value) || 0)}
            className="w-full px-4 py-3 border-2 border-input rounded-lg focus:border-primary focus:outline-none bg-background"
          />
        </div>

        <div className="mb-8">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              className="w-5 h-5"
            />
            <span className="text-foreground">Make this a monthly donation</span>
          </label>
        </div>

        <button 
          onClick={handleDonate}
          className="w-full bg-primary text-primary-foreground py-4 rounded-full text-lg font-semibold hover:opacity-90 transition"
        >
          Donate R{donationAmount} {isRecurring ? 'Monthly' : 'Once'}
        </button>
      </div>
    </div>
  );
};

export default Donate;
