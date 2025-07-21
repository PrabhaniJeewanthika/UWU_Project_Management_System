import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImage from '../../assets/loginIllustration.png';

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'member' | 'manager'>('member');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isPasswordStrong = (pwd: string) =>
    /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(pwd);

  const handleLogin = () => {
    const isValidEmail =
      email.endsWith('@std.uwu.ac.lk') || email.endsWith('@uwu.ac.lk');
    if (!email || !password || !isValidEmail) {
      setMessage('Please use a valid university email to login.');
      return;
    }
    localStorage.setItem('user', JSON.stringify({ email, role }));
    localStorage.setItem('token', 'mock-token');
    navigate(role === 'manager' ? '/manager' : '/member');
  };

  const handleRegister = async () => {
    setMessage('');
    if (!name || !email || !password || !confirmPassword) {
      setMessage('All fields are required.');
      return;
    }

    if (!email.endsWith('@std.uwu.ac.lk') && !email.endsWith('@uwu.ac.lk')) {
      setMessage('Use a valid university email.');
      return;
    }

    if (!isPasswordStrong(password)) {
      setMessage(
        'Password must be at least 8 characters, include 1 uppercase letter and 1 number.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost/uwu_pms/api/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });

      const result = await response.json();
      setMessage(result.success ? 'Registration successful! Please login.' : result.message || 'Registration failed.');
      if (result.success) {
        setActiveTab('login');
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setRole('member');
      }
    } catch {
      setMessage('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-screen h-screen flex items-center justify-center transition-all duration-300 ${activeTab === 'login' ? 'bg-cyan-100' : 'bg-green-100'} px-4`}>
      <div className="w-full max-w-5xl h-auto flex flex-col md:flex-row overflow-hidden shadow-2xl rounded-xl border border-gray-300 bg-white">

        {/* Image Section */}
        <div className={`w-full md:w-1/2 ${activeTab === 'login' ? 'bg-cyan-50' : 'bg-green-50'} flex items-center justify-center p-4`}>
          <img src={loginImage} alt="Login Illustration" className="object-contain w-[90%] max-h-[360px]" />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
          <div className="flex justify-center mb-4">
            <button
              onClick={() => {
                setActiveTab('login');
                setMessage('');
              }}
              className={`px-4 py-2 text-sm font-semibold rounded-l-md ${activeTab === 'login' ? 'bg-cyan-900 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setActiveTab('register');
                setMessage('');
              }}
              className={`px-4 py-2 text-sm font-semibold rounded-r-md ${activeTab === 'register' ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Register
            </button>
          </div>

          <h2 className={`text-2xl font-bold text-center mb-2 ${activeTab === 'login' ? 'text-cyan-900' : 'text-green-700'}`}>
            {activeTab === 'login' ? 'Welcome UVA PMS!!' : 'Create Your Account'}
          </h2>
          <p className="text-sm text-center text-gray-500 mb-5">
            Only university emails are allowed.
          </p>

          {activeTab === 'register' && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${activeTab === 'login' ? 'focus:ring-cyan-600' : 'focus:ring-green-600'}`}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder={activeTab === 'login' ? 'Enter your password' : 'Min 8 chars, 1 uppercase & 1 digit'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${activeTab === 'login' ? 'focus:ring-cyan-600' : 'focus:ring-green-600'}`}
            />
          </div>

          {activeTab === 'register' && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
          )}

          <div className="mb-5">
            <label className="block text-sm font-medium mb-2">
              {activeTab === 'login' ? 'Login As' : 'Register As'}
            </label>
            <div className="flex gap-6 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="member"
                  checked={role === 'member'}
                  onChange={() => setRole('member')}
                />
                Member
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="manager"
                  checked={role === 'manager'}
                  onChange={() => setRole('manager')}
                />
                Project Manager
              </label>
            </div>
          </div>

          {activeTab === 'login' && (
            <div className="flex justify-between items-center mb-6 text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <span className="text-cyan-700 hover:underline cursor-pointer">
                forgot password?
              </span>
            </div>
          )}

          <button
            onClick={activeTab === 'login' ? handleLogin : handleRegister}
            disabled={loading}
            className={`w-full ${activeTab === 'login' ? 'bg-cyan-900 hover:bg-cyan-800' : 'bg-green-700 hover:bg-green-600'} text-white py-2 rounded-md transition`}
          >
            {loading
              ? activeTab === 'login'
                ? 'Signing in...'
                : 'Registering...'
              : activeTab === 'login'
                ? 'Sign in'
                : 'Register'}
          </button>

          {message && (
            <p className="text-sm text-center text-red-600 mt-4">{message}</p>
          )}

          <p className="text-xs text-center mt-6 text-gray-500">
            © 2025 All Rights Reserved by IIT 16
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
