/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useState } from 'react'
import Logo from '../../assets/ATU-LOGO-AUTHENTIC-edit-1024x980.png'
import { Lock, Unlock } from 'lucide-react'
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [username, setUsername] = useState("");
	const [userId, setUserId] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleLogin = (e: any) => {
		e.preventDefault(); // Prevent form submission default behavior
		// In a real app, you would validate credentials against a backend
		if (userId && password) {
			setIsLoggedIn(true);
			setUsername(userId); // Using userId as username for simplicity
			console.log("Logged in successfully!");
			navigate("/home");
		} else {
			alert("Please enter both ID and password");
		}
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
		setUserId("");
		setPassword("");
		console.log("Logged out successfully!");
	};

	return (
		<section className="min-h-screen w-[100dvw] fex-1 flex items-center justify-center">
			<div className="flex shadow-3xl bg-white rounded-2xl">
				<div className="flex flex-col items-center text-center w-full px-4">
					{/* Heading */}
					<h1 className="text-3xl font-bold text-[#134B70] mt-6 mb-4">
						Login Required
					</h1>

					{/* Logo and University Name */}
					<div className="flex items-center">
						<img src={Logo} alt="Logo" className="w-32 h-32 mr-4" />

						<div
							style={{ color: "#134B70" }}
							className="text-4xl font-extrabold text-left"
						>
							<h1>ACCRA</h1>
							<h2 className="mt-1">TECHNICAL</h2>
							<h3 className="mt-1">UNIVERSITY</h3>
						</div>
					</div>

					{/* Login Form */}
					<form
						onSubmit={handleLogin}
						className="mt-10 w-full max-w-sm text-left"
					>
						<label className="block mb-2 text-gray-700 font-semibold">
							Student ID / Staff ID
						</label>
						<input
							type="text"
							value={userId}
							onChange={(e) => setUserId(e.target.value)}
							className="w-full p-3 border border-gray-400 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>

						<label className="block mb-2 text-gray-700 font-semibold">
							Password
						</label>
						<div className="border px-3 mb-4 border-gray-400 rounded flex items-center gap-4">
							<span
								onClick={() => setShowPassword(!showPassword)}
								className="text-gray-500 cursor-pointer"
							>
								{showPassword ? <Unlock size={20} /> : <Lock size={20} />}
							</span>
							<input
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full py-3 focus:outline-none"
							/>
						</div>

						<button
							type="submit"
							className="w-full bg-[#134B70] text-white py-3 rounded hover:bg-[#0e3a5d] transition"
						>
							Login
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default LoginPage