import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { authService } from '../apis';
import { useNavigate } from 'react-router';

function Signup() {

    const [formState, setFormState] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();

    function handleChange(e) {
        console.log(e.target)
        e.preventDefault();
        setFormState({ ...formState, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (formState.confirmPassword !== formState.password) {
            toast.error('Password and confirm password must be same', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            return;
        }

        if (!formState.email || !formState.firstname || !formState.lastname || !formState.password || !formState.confirmPassword) {
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
        }
        else {
            const { confirmPassword, ...payload } = formState;
            authService.signup(payload).then((response) => {
                if (response.data) {
                    toast.success('Signup successful you can login now', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })

                    navigate("/login");
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
                            <label>First Name</label>
                            <input type="text" name="firstname" value={formState.firstname} className="form-control" placeholder="Enter first name" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" name="lastname" value={formState.lastname} className="form-control" placeholder="Enter last name" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" name="email" value={formState.email} className="form-control" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleChange} />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" value={formState.password} className="form-control" placeholder="Password" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" name="confirmPassword" value={formState.confirmPassword} className="form-control" placeholder="Password" onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Signup