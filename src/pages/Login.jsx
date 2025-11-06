import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthProvider';
import { getFunnel } from '../api/bridgeApi';
import { getMetaContent, setMetaContent, loadScript } from '../api/config';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [funnelLoading, setFunnelLoading] = useState(true);
  const [funnelData, setFunnelData] = useState(null);
  const [pageTitle, setPageTitle] = useState('Login');
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { slug } = useParams();

  // Load funnel configuration on mount
  useEffect(() => {
    const loadFunnelConfig = async () => {
      try {
        // Get funnel_id from meta tag
        const funnelId = getMetaContent('funnel_id');
        
        if (!funnelId) {
          console.warn('No funnel_id found in meta tag, using default configuration');
          setFunnelLoading(false);
          return;
        }

        // Call getFunnel API
        const response = await getFunnel({ funnel_id: funnelId });
        
        if (response.success) {
          setFunnelData(response.data);
          
          // Update page title
          if (response.data.funnel_name) {
            setPageTitle(`${response.data.funnel_name} - Login`);
          }
          
          // Update meta tags
          if (response.data.category_id) {
            setMetaContent('category_id', response.data.category_id);
          }
          
          // Load custom scripts if provided
          if (response.data.custom_scripts) {
            const scripts = Array.isArray(response.data.custom_scripts) 
              ? response.data.custom_scripts 
              : [response.data.custom_scripts];
            
            for (const script of scripts) {
              if (script.type === 'inline') {
                await loadScript(script.content, true);
              } else if (script.type === 'external' && script.src) {
                await loadScript(script.src, false);
              }
            }
          }
        }
      } catch (err) {
        console.error('Failed to load funnel configuration:', err);
      } finally {
        setFunnelLoading(false);
      }
    };

    loadFunnelConfig();
  }, [slug]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Validate slug
  useEffect(() => {
    // List of valid slugs (can be fetched from API in production)
    const validSlugs = ['batch-50', 'default', 'demo'];
    
    if (slug && !validSlugs.includes(slug)) {
      // Invalid slug, redirect to home
      navigate('/');
    }
  }, [slug, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login({ email, password });
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Show loader while funnel is loading
  if (funnelLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-blue-500 to-pink-400">
        <Loader size="lg" text="Loading..." />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {funnelData?.category_id && (
          <meta name="category_id" content={funnelData.category_id} />
        )}
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-blue-500 to-pink-400 p-4">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: funnelData?.background_image || 'url(https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1920&h=1080&fit=crop)',
          }}
        />
        
        {/* Login Card */}
        <div className="relative w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="bg-white border-2 border-green-400 rounded-lg px-8 py-3">
                {funnelData?.logo ? (
                  <img src={funnelData.logo} alt="Logo" className="h-10" />
                ) : (
                  <span className="text-3xl font-bold text-primary-500" style={{ fontFamily: 'cursive' }}>
                    {funnelData?.funnel_name || 'Logo'}
                  </span>
                )}
              </div>
            </div>

            {/* Heading */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {funnelData?.heading || 'Login with'}
              </h2>
              <p className="text-2xl font-bold text-gray-900">
                {funnelData?.subheading || 'your account now'}
              </p>
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
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 text-center mb-2">Demo Credentials:</p>
                <p className="text-xs text-gray-700 text-center">Email: javeed@flexifunnels.com</p>
                <p className="text-xs text-gray-700 text-center">Password: 123456789</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
