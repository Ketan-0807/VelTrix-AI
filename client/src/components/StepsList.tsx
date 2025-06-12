import React from 'react';
import { Check } from 'lucide-react';
import { useBuilder } from '../context/BuilderContext';

const StepsList: React.FC = () => {
  const { steps } = useBuilder();

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Build Steps</h2>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div 
            key={step.id} 
            className={`flex items-start p-3 rounded-lg ${
              step.completed ? 'bg-green-900/20' : 'bg-gray-800/50'
            }`}
          >
            <div className="mr-3 mt-0.5">
              {step.completed ? (
                <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
                  <Check size={14} />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full border-2 border-gray-600 flex items-center justify-center text-sm">
                  {index + 1}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-medium">{step.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepsList;