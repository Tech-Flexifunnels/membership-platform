import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = login(email, password);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-blue-500 to-pink-400 p-4">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1920&h=1080&fit=crop)',
        }}
      />
      
      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="bg-white border-2 border-green-400 rounded-lg px-8 py-3">
              <span className="text-3xl font-bold text-primary-500" style={{ fontFamily: 'cursive' }}>
                Logo
              </span>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Login with</h2>
            <p className="text-2xl font-bold text-gray-900">your account now</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="relative">
              <Input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-2 border-blue-300 focus:border-blue-500"
                rightIcon={<Mail className="w-5 h-5 text-blue-500" />}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-2 border-pink-300 focus:border-pink-500"
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-pink-500 hover:text-pink-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                }
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Forgot Password */}
            <div className="text-center">
              <a href="#" className="text-pink-500 hover:text-pink-600 text-sm font-medium">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              loading={loading}
              disabled={loading}
            >
              Login
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center mb-2">Demo Credentials:</p>
            <p className="text-xs text-gray-700 text-center">Email: javeed@flexifunnels.com</p>
            <p className="text-xs text-gray-700 text-center">Password: 123456789</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
