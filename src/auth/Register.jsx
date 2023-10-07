import { useState } from "react"
import { useAuth } from "../context/AuthContext"

function Register() {

    const {registerUser, user, loading, error} = useAuth()

    
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
    })

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        registerUser(formData)

        if(user) {
            setFormData({
                email: '',
                firstName: '',
                lastName: '',
            })
        }

    }

  return (
    <div className="flex items-center justify-center md:mt-16 my-[50%] md:px-24 px-8">
        <div className="md:w-5/12 p-10 bg-white border border-blue-100 drop-shadow-md">
            <h1>Register</h1>

            {/* Register form  */}
            <form
                onSubmit={handleFormSubmit}
                className="mt-4"
            >
                <input 
                    onChange={handleInputChange}
                    value={formData.email}
                    type="email" 
                    name="email"
                    placeholder="Email"
                    required
                    className="w-full py-2 border border-blue-600 rounded-md px-4 mb-4"
                />
                <input 
                    onChange={handleInputChange}
                    value={formData.firstName}
                    type="text" 
                    name="firstName"
                    placeholder="First Name"
                    required
                    className="w-full py-2 border border-blue-600 rounded-md px-4 mb-4"
                />
                <input 
                    onChange={handleInputChange}
                    value={formData.lastName}
                    type="text" 
                    name="lastName"
                    placeholder="Last Name"
                    required
                    className="w-full py-2 border border-blue-600 rounded-md px-4 mb-4"
                />
                    {error && (
                        <div className="text-red-500">
                            {error}
                        </div>
                    )}
                <div className="flex justify-center items-center mt-4">
                    <button className="px-8 py-3 rounded-md text-white uppercase bg-blue-700">
                        {loading ? 'Loading...' : 'Register'}
                    </button>
                </div>

            </form>
        </div>
    </div>
  )
}

export default Register