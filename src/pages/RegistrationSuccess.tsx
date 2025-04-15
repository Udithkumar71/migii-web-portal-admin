
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RegistrationSuccess = () => {
  const [searchParams] = useSearchParams();
  const workerId = searchParams.get('id');
  const navigate = useNavigate();
  
  useEffect(() => {
    // Auto-redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate('/worker-dashboard');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <CheckCircle size={80} className="mx-auto text-green-500 mb-6" />
        </motion.div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Registration Successful!</h1>
        
        {workerId && (
          <div className="mb-6">
            <p className="text-gray-600 mb-2">Your Worker ID:</p>
            <div className="bg-gray-50 p-3 rounded-md border border-gray-200 font-mono text-lg">
              {workerId}
            </div>
          </div>
        )}
        
        <p className="text-gray-600 mb-6">
          Your registration has been completed successfully. You will be redirected to your dashboard in a moment.
        </p>
        
        <Button 
          onClick={() => navigate('/worker-dashboard')}
          className="w-full"
        >
          Go to Dashboard Now
        </Button>
      </motion.div>
    </div>
  );
};

export default RegistrationSuccess;
