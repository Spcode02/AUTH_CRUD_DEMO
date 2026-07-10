import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import {
    Field,
    FieldLabel,
} from "@/components/ui/field"
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
                    <Field>
                        <Input type='text' name="username" value={formdata.username}
                            autoComplete='false'

                            // onChange={(e) => {
                            //   setFormdata((prev) => ({ ...prev, username: e.target.value }))
                            // }} 
                            onChange={handleInputChange}
                            placeholder="Username or Email"
                        />
                    </Field>
                    {errors.username && <p className='error-text mt-1'>{errors.username}</p>}
                </div>
                <div className='py-2'>
                    <Input type='password' name="password" value={formdata.password} autoComplete='false'
                        // onChange={(e) => {
                        //   setFormdata((prev) => ({ ...prev, password: e.target.value }))
                        // }}
                        placeholder="Enter Password"
                        onChange={handleInputChange}
                    />
                    {errors.password && <p className='error-text mt-1'>{errors.password}</p>}
                </div>
                <Button type="submit">Submit</Button>
            </form>
            {
                success && <><p style={{ 'color': 'green', 'textAlign': 'center' }}>Submit Successfull !!</p></>
            }

        </>
    )
}

export default Login
