import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import { Login } from "../redux/Slice/userSlice";

const LoginComponent = () => {
    const [email, setEmail] = useState<string>('mohmmed2010@gmail.com');
    const [password, setPassword] = useState<string>('20018555passsword');
    const dispatch = useAppDispatch();
    const { error, isLoading, isAuthenticated } = useAppSelector((state) => state.User);

    const handleLogin = async () => {
        if (!email || !password) {
            alert('Please fill all fields');
            return;
        }

        await dispatch(Login({ email, password })).unwrap();
    };

    useEffect(() => {
        if (isAuthenticated) {
            console.log("User authenticated!");
        }
    }, [isAuthenticated]);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-96">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Login Admin PetsWave</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-600 text-sm font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleLogin}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginComponent;
