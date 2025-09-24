import { Link } from "react-router-dom"
import { useLoginMutation } from "../redux/api/auth.api";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const LoginPage = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(state => state.auth);

    const [login, { error, isLoading, isSuccess }] = useLoginMutation();


    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message || "Something went wrong");
        }

        // Wait for both login success AND authentication state to be updated
        if (isSuccess && isAuthenticated) {
            toast.success("login successfull");
            navigate("/tasks");
        }

    }, [error, isSuccess, isAuthenticated, navigate]);




    // handle login form
    const handleLoginFormSubmit = async (e) => {

        e.preventDefault();

        const loginFormData = {
            email,
            password
        }

        await login(loginFormData);
    }

    if (isLoading) {
        return <Loader />;
    }



    return (
        <>

            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img src="logo512.png" alt="Your Company" className="mx-auto h-10 w-auto" />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleLoginFormSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address <span className="text-red-500">*</span></label>
                            <div className="mt-2">
                                <input id="email" type="email" name="email" placeholder="abc@gmail.com" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password <span className="text-red-500">*</span></label>
                                <div className="text-sm">
                                    <Link to="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input id="password" type="password" name="password" placeholder="* * * * * * * * * * *" required autoComplete="current-password"
                                    value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Don't have an account?
                        <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">Create an account</Link>
                    </p>
                </div>
            </div>



        </>
    )
}

export default LoginPage