import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home, BookOpen } from 'lucide-react';
import Button from '../components/common/Button';

const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect after 10 seconds
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-6">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Thank You!
          </h1>

          {/* Message */}
          <p className="text-lg text-gray-600 mb-8">
            Your enrollment has been successfully completed. Welcome to our learning community!
          </p>

          {/* What's Next Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 text-left">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              What's Next?
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="bg-blue-600 rounded-full p-1 mt-1">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Access Your Dashboard</p>
                  <p className="text-sm text-gray-600">
                    View all your enrolled courses and start learning
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-blue-600 rounded-full p-1 mt-1">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Complete Your Profile</p>
                  <p className="text-sm text-gray-600">
                    Add your information to personalize your experience
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-blue-600 rounded-full p-1 mt-1">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Start Your First Lesson</p>
                  <p className="text-sm text-gray-600">
                    Begin your learning journey with our comprehensive courses
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard" className="flex-1 sm:flex-initial">
              <Button variant="primary" className="w-full sm:w-auto">
                <Home className="w-5 h-5 mr-2" />
                Go to Dashboard
              </Button>
            </Link>
            <Link to="/my-learning" className="flex-1 sm:flex-initial">
              <Button variant="secondary" className="w-full sm:w-auto">
                <BookOpen className="w-5 h-5 mr-2" />
                View My Courses
              </Button>
            </Link>
          </div>

          {/* Auto Redirect Message */}
          <p className="text-sm text-gray-500 mt-6">
            You will be automatically redirected to the dashboard in 10 seconds...
          </p>
        </div>

        {/* Support Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-2">
            Need help getting started?
          </p>
          <a
            href="mailto:support@example.com"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
