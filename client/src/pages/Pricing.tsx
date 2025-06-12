import React from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

type Plan = 'Basic' | 'Pro' | 'Enterprise';

const PricingPage: React.FC = () => {
    const { user } = useUser();

    const handleSubscribe = async (plan: Plan) => {
        if (!user?.primaryEmailAddress?.emailAddress) {
            alert('User email not found.');
            return;
        }

        try {
            await axios.post('http://localhost:3000/subscription', {
                email: user.primaryEmailAddress.emailAddress,
                subscriptionType: plan,
            });

            alert('Subscription successful!');
        } catch (error: any) {
            console.error('Subscription failed:', error);
            alert('Failed to subscribe.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
            <h1 className="text-4xl font-bold mb-10">Choose Your Plan</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                {['Basic', 'Pro', 'Enterprise'].map((plan) => (
                    <div key={plan} className="bg-white p-6 rounded-xl shadow-md text-center">
                        <h2 className="text-2xl font-semibold mb-4">{plan}</h2>
                        <p className="text-gray-600 mb-6">
                            {plan === 'Basic' && 'Free access with limited features.'}
                            {plan === 'Pro' && 'Advanced features for individual users.'}
                            {plan === 'Enterprise' && 'All features for teams and businesses.'}
                        </p>
                        <button
                            onClick={() => handleSubscribe(plan as Plan)}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                        >
                            Subscribe
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PricingPage;
