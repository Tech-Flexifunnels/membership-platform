import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getInviteLogin } from '../api/bridgeApi';
import Loader from '../components/common/Loader';

/**
 * InviteCode Landing Page
 * Replicates the UI from membershipdata.flexifunnels.com
 */
const InviteCode = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Mock data for events/memberships
  const events = [
    {
      id: 1,
      name: 'LifeWheel Event',
      logo: 'https://via.placeholder.com/400x100/4CAF50/FFFFFF?text=LifeWheel',
      buttonText: 'Access Event',
      buttonColor: 'bg-orange-500 hover:bg-orange-600',
      borderColor: 'border-green-500',
      backgroundImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920',
      inviteCode: 'LIFEWHEEL2024',
    },
    {
      id: 2,
      name: 'Funnel Growth Summit',
      logo: 'https://via.placeholder.com/400x100/00BCD4/FFFFFF?text=Funnel+Growth+Summit',
      buttonText: 'Access Event',
      buttonColor: 'bg-cyan-500 hover:bg-cyan-600',
      borderColor: 'border-yellow-500',
      backgroundImage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920',
      inviteCode: 'FUNNELGROWTH2024',
    },
    {
      id: 3,
      name: 'FlexiFunnels Membership',
      logo: 'https://via.placeholder.com/400x100/4CAF50/FFFFFF?text=FlexiFunnels',
      buttonText: 'Access Membership',
      buttonColor: 'bg-green-500 hover:bg-green-600',
      borderColor: 'border-green-500',
      backgroundImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920',
      inviteCode: 'FLEXIFUNNELS2024',
    },
  ];

  // Handle access button click
  const handleAccess = async (event) => {
    setLoading(true);
    setError('');

    try {
      // Call getinvitelogin API
      const response = await getInviteLogin({
        invite_code: event.inviteCode,
        event_id: event.id,
      });

      if (response.success && response.step_url) {
        // Redirect to the returned step_url
        window.location.href = response.step_url;
      } else {
        setError(response.message || 'Failed to access event');
        setLoading(false);
      }
    } catch (err) {
      console.error('Invite login error:', err);
      setError('Failed to access event. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Flexi Funnels - Access Your Events</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Access your events and memberships" />
      </Helmet>

      <div className="min-h-screen bg-black">
        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <Loader size="lg" text="Redirecting..." />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
            {error}
          </div>
        )}

        {/* Event Cards */}
        <div className="w-full">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
              style={{
                backgroundImage: `url(${event.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center space-y-6 px-4">
                {/* Logo */}
                <div className={`border-4 ${event.borderColor} rounded-lg p-4 bg-white bg-opacity-10 backdrop-blur-sm`}>
                  <img
                    src={event.logo}
                    alt={`${event.name} Logo`}
                    className="h-20 w-auto"
                  />
                </div>

                {/* Access Button */}
                <button
                  onClick={() => handleAccess(event)}
                  disabled={loading}
                  className={`${event.buttonColor} text-white font-semibold text-lg px-12 py-4 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {event.buttonText}
                </button>
              </div>

              {/* Scroll Indicator (only on first card) */}
              {index === 0 && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="animate-bounce">
                    <svg
                      className="w-6 h-6 text-white opacity-75"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InviteCode;
