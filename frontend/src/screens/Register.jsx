import React,{useState, useContext} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { UserContext } from '../context/user.context.jsx';
import axios from '../config/axios.js';



const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {setUser} = useContext(UserContext)

    const navigate = useNavigate()

    function submitHandler(e){
        e.preventDefault()
        axios.post('/users/register',{
            email,
            password
        }).then((res)=>{
            console.log(res.data)
            localStorage.setItem('token',res.data.token)
            setUser(res.data.user)
            navigate('/')
        }).catch((err)=>{
            console.log(err.response.data)
        })
    }  


  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Register</h2>
        <form className="space-y-4" onSubmit={submitHandler}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              onChange={(e)=>setEmail(e.target.value)} 
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              onChange={(e)=>setPassword(e.target.value)} 
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
        <p className="text-gray-400 text-center mt-5">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

