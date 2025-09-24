import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/api/auth.api";
import toast from "react-hot-toast";
import Loader from "../components/Loader";




const Register = () => {



    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [register, { isSuccess, isLoading, error}] = useRegisterMutation();



    useEffect(() => {
        if(error) {
            toast.error(error?.data?.message || "Something went wrong");
        }

        if(isSuccess) {
            toast.success("registeration successfull");
            navigate("/login");
        }

    }, [error, isSuccess, navigate]);


    // handle registeration form
    const handleRegisterationFormSubmit = async (e) => {
        
        e.preventDefault();

        const registerationData = {
            firstName,
            lastName,
            email,
            password
        }

        await register(registerationData);

    }



    if(isLoading) {
        return <Loader/>
    }

    return (
        <>

            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img src="logo512.png" alt="Your Company" className="mx-auto h-10 w-auto" />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create an account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={ handleRegisterationFormSubmit} className="space-y-6">

                        <div>
                            <label htmlFor="firstName" className="block text-sm/6 font-medium text-gray-900">First Name <span className="text-red-500">*</span></label>
                            <div className="mt-2">
                                <input id="firstName" type="text" name="firstName" placeholder="suraj" required autoComplete="firstName"  value={firstName} onChange={(e) => setFirstName(e.target.value)} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>


                        <div>
                            <label htmlFor="lastName" className="block text-sm/6 font-medium text-gray-900">Last Name <span className="text-red-500">*</span></label>
                            <div className="mt-2">
                                <input id="lastName" type="text" name="lastName" placeholder="prajapati" required autoComplete="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address <span className="text-red-500">*</span></label>
                            <div className="mt-2">
                                <input id="email" type="email" name="email" placeholder="abc@gmail.com" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password <span className="text-red-500">*</span></label>

                            </div>
                            <div className="mt-2">
                                <input id="password" type="password" name="password" placeholder="* * * * * * * * * * *" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">Sign up</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Already have an account?
                        <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500"> Login </Link>
                    </p>
                </div>
            </div>



        </>
    )
}

export default Register;