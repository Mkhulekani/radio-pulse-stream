import { useApp } from '@/contexts/AppContext';
import { DATABASE } from '@/data/database';

const Membership = () => {
  const { userMembership, subscribeMembership } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Become a Member</h1>
        <p className="text-xl text-muted-foreground">Support Newtown Radio and get exclusive benefits</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {DATABASE.memberships.map(membership => (
          <div 
            key={membership.id} 
            className={`rounded-2xl shadow-xl overflow-hidden ${
              membership.tier === 'Premium' ? 'ring-4 ring-primary transform scale-105' : 'bg-card'
            }`}
          >
            <div className={`p-8 ${
              membership.tier === 'Premium' ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white' : ''
            }`}>
              <h3 className="text-2xl font-bold mb-2">{membership.tier}</h3>
              <div className="text-4xl font-bold mb-6">
                R{membership.price}
                <span className="text-lg font-normal">{membership.price > 0 ? '/month' : ''}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {membership.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className={`${membership.tier === 'Premium' ? 'text-white' : 'text-primary'}`}>✓</span>
                    <span className={`${membership.tier === 'Premium' ? 'text-purple-100' : 'text-muted-foreground'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => subscribeMembership(membership)}
                className={`w-full py-3 rounded-full font-semibold transition ${
                  userMembership?.id === membership.id
                    ? 'bg-green-500 text-white'
                    : membership.tier === 'Premium' 
                      ? 'bg-white text-purple-600 hover:bg-white/90' 
                      : 'bg-primary text-primary-foreground hover:opacity-90'
                }`}
              >
                {userMembership?.id === membership.id 
                  ? '✓ Current Plan' 
                  : membership.price === 0 ? 'Sign Up Free' : 'Subscribe Now'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Membership;
