import React, { useState } from 'react';
import registerImage from '../../../assets/loginIllustration.png';

const AuthPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState<'member' | 'manager'>('member');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const isPasswordStrong = (pwd: string) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(pwd);

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
            setMessage('Password must be at least 8 characters, include 1 uppercase letter and 1 number.');
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
            setMessage(
                result.success ? 'Registration successful! Please login.' : result.message || 'Registration failed.'
            );
            if (result.success) {
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
        <div className="w-screen h-screen flex bg-green-100">
            <div className="w-1/2 hidden lg:flex items-center justify-center bg-green-200">
                <img
                    src={registerImage}
                    alt="Register Illustration"
                    className="object-contain w-[90%] max-h-[90%]"
                />
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
                <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg border-t-4 border-green-600">
                    <h2 className="text-2xl font-bold text-center text-green-700 mb-2">Create Your Account</h2>
                    <p className="text-sm text-center text-gray-500 mb-6">Only university emails are allowed</p>

                    <div className="mb-4">
                        <label className="block font-medium mb-1 text-sm">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium mb-1 text-sm">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your university email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium mb-1 text-sm">Password</label>
                        <input
                            type="password"
                            placeholder="Minimum 8 chars, 1 uppercase & 1 digit"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium mb-1 text-sm">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Re-enter your password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block font-medium mb-2 text-sm">Register As</label>
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

                    <button
                        onClick={handleRegister}
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition"
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>

                    {message && <p className="text-sm text-center text-red-600 mt-4">{message}</p>}

                    <p className="text-xs text-center mt-6 text-gray-500">
                        © 2025 All Rights Reserved by IIT 16
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;