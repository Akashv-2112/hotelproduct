import React from 'react';
import { Hotel, BarChart3, Globe, Shield, Zap, Users, ArrowRight, CheckCircle } from 'lucide-react';

interface LandingPageProps {
  onLoginClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick }) => {
  const features = [
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Track revenue, occupancy, and performance across all channels with live dashboards'
    },
    {
      icon: Globe,
      title: 'Multi-Channel Management',
      description: 'Manage Booking.com, Expedia, Airbnb, Agoda, and your direct bookings in one place'
    },
    {
      icon: Zap,
      title: 'Instant Synchronization',
      description: 'Automatic rate and availability updates across all connected channels'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime guarantee'
    }
  ];

  const benefits = [
    'Increase revenue by up to 30%',
    'Save 5+ hours daily on manual updates',
    'Prevent overbookings with real-time sync',
    'Optimize pricing with market insights',
    'Streamline operations across all channels'
  ];

  const channels = [
    { name: 'Booking.com', logo: '🏨' },
    { name: 'Expedia', logo: '✈️' },
    { name: 'Airbnb', logo: '🏠' },
    { name: 'Agoda', logo: '🌏' },
    { name: 'Hotels.com', logo: '🏢' },
    { name: 'Direct Bookings', logo: '🌐' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Hotel className="w-8 h-8 text-blue-600 mr-3" />
              <span className="text-xl font-bold text-gray-900">ChannelSync Pro</span>
            </div>
            <button
              onClick={onLoginClick}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Manage All Your
              <span className="text-blue-600 block">Hotel Channels</span>
              <span className="text-gray-700">In One Place</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Streamline your hotel operations with our powerful channel manager. 
              Update rates, manage inventory, and track performance across all booking platforms instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onLoginClick}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center"
              >
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-gray-400 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Channels */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Connect With Leading Booking Platforms
            </h2>
            <p className="text-gray-600">
              Seamlessly integrate with the world's top travel booking sites
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {channels.map((channel, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="text-4xl mb-3">{channel.logo}</div>
                <div className="text-sm font-medium text-gray-700">{channel.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600">
              Powerful tools designed specifically for hotel revenue management
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Transform Your Hotel Operations
              </h2>
              <p className="text-blue-100 text-lg mb-8">
                Join thousands of hotels worldwide who have revolutionized their revenue management 
                with our comprehensive channel management solution.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-white">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-white mb-2">30%</div>
                <div className="text-blue-100 mb-6">Average Revenue Increase</div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white">5000+</div>
                    <div className="text-blue-100 text-sm">Hotels</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">99.9%</div>
                    <div className="text-blue-100 text-sm">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Maximize Your Revenue?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Start your free trial today and see the difference professional channel management makes.
          </p>
          <button
            onClick={onLoginClick}
            className="bg-blue-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all transform hover:scale-105"
          >
            Start Free Trial
          </button>
          <p className="text-gray-400 mt-4">No credit card required • 14-day free trial</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Hotel className="w-6 h-6 text-blue-600 mr-2" />
            <span className="text-gray-600">© 2024 ChannelSync Pro. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;