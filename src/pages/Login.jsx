import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

function Login() {
    const [formdata, setFormdata] = useState({ username: '', password: '' })
    const [success, setSuccess] = useState(false)
    const [errors, setErrors] = useState({})
    const { setUserCred } = useContext(AuthContext)
    const navigate = useNavigate()
    const validate = (data) => {
        const errorsmsg = {}
        const emailregex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
        const passwordregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/

        if (!data.username.trim()) errorsmsg.username = "Username is required"
        else if (!emailregex.test(data.username)) errorsmsg.username = "Please enter a valid email address (e.g., name@example.com)"
        if (!data.password.trim()) errorsmsg.password = "Password is required"
        else if (!passwordregex.test(data.password)) errorsmsg.password = "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, and a number"
        return errorsmsg
    }
    const submitHandler = (e) => {
        e.preventDefault()
        const formErrors = validate(formdata)
        // Check if the errors object is completely empty
        const isFormValid = Object.keys(formErrors).length === 0
        setErrors(formErrors)
        if (isFormValid) {
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(formdata)
            }).then((response) => response.json())
                .then((data) => {
                    console.log('server response', data);
                    localStorage.setItem('userData', JSON.stringify(formdata))
                    setUserCred(data);
                    setSuccess(true)
                    setFormdata({ username: '', password: '' })
                    navigate("/dashboard")
                }).catch((error) => {
                    console.error('Network error:', error)
                })

        }
        else {
            console.log("Something went Wrong !!");
            setSuccess(false)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setErrors((prev) => ({ ...prev, [name]: '' }))
        setSuccess(false)
        // setFormdata((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        setFormdata((prev) => ({ ...prev, [name]: value }))
        // setFormdata({ ...formdata, [e.target.name]: e.target.value });
    }


    return (
        <>
            <form onSubmit={submitHandler} className='login-form'>
                <div className='py-2'>
                    <input type='text' name="username" value={formdata.username} autoComplete='false' className='border border-solid border-gray-400 rounded px-4 py-1 h-[36px]'

                        // onChange={(e) => {
                        //   setFormdata((prev) => ({ ...prev, username: e.target.value }))
                        // }} 
                        onChange={handleInputChange}
                    />
                    {errors.username && <p className='error-text'>{errors.username}</p>}
                </div>
                <div className='py-2'>
                    <input type='password' name="password" value={formdata.password} autoComplete='false' className='border border-gray-400 rounded px-4 py-1 h-[36px]'
                        // onChange={(e) => {
                        //   setFormdata((prev) => ({ ...prev, password: e.target.value }))
                        // }}
                        onChange={handleInputChange}
                    />
                    {errors.password && <p className='error-text'>{errors.password}</p>}
                </div>
                <button type="submit" className='submit-btn h-[36px] rounded px-4 py-1 my-2'>Submit</button>
            </form>
            {
                success && <><p style={{ 'color': 'green', 'textAlign': 'center' }}>Submit Successfull !!</p></>
            }

        </>
    )
}

export default Login
