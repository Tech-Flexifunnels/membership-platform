import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { Mail, Lock, AlertCircle } from 'lucide-react';

const Access = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate access code verification
    setTimeout(() => {
      if (accessCode === 'BATCH50' || accessCode === 'DEMO2024') {
        navigate('/login', { state: { email, verified: true } });
      } else {
        setError('Invalid access code. Please check and try again.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="border-2 border-teal-500 rounded-lg px-6 py-3">
            <h1 className="text-2xl font-bold text-gray-800">Logo</h1>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify Access</h2>
          <p className="text-gray-600">Enter your email and access code to continue</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="w-5 h-5 text-blue-500" />}
            required
          />

          <Input
            type="text"
            placeholder="Enter Access Code"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
            icon={<Lock className="w-5 h-5 text-orange-500" />}
            required
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify Access'}
          </Button>
        </form>

        {/* Demo Info */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center mb-2">
            <strong>Demo Access Codes:</strong>
          </p>
          <p className="text-xs text-gray-500 text-center">
            BATCH50 or DEMO2024
          </p>
        </div>

        {/* Already have access */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Already verified? Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Access;
