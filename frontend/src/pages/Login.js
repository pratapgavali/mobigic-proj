import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { authService } from '../apis';

function Login() {

    const [formState, setFormState] = useState({
        email: '',
        password: '',
    })

    const navigate = useNavigate();

    function handleChange(e) {
        e.preventDefault();
        setFormState({ ...formState, [e.target.name]: e.target.value });
    }

    function handleClick(e) {
        e.preventDefault();
        if (e.target.name === "signup") {
            navigate("/signup");
            return;
        }
        if (!formState.email || !formState.password) {
            toast.error('All fields are mandetory', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            return;
        } else {
            authService.login(formState).then((response) => {
                if (response.status === 200) {
                    toast.success('Logged in successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                    localStorage.setItem('user', JSON.stringify(response.data));
                    navigate('/dashboard')
                }
            })
        }
    }

    return (
        <div className="d-flex justify-content-center mt-5">
            <div className='bg-light p-5 w-50'>
                <div>

                    <h2 className="text-center">Login</h2>
                    <form>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" name="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleChange} />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" className="form-control" placeholder="Password" onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
                        <button type="button" name="signup" class="btn btn-link d-block p-0 mt-2" onClick={handleClick}>Don't have an account? click here to signup</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login