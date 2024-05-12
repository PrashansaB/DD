import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
    const URL = "http://localhost:5000/api/createuser"
    const handleSubmit = async (e) => {
        const { name, email, password, geolocation } = credentials;
        e.preventDefault();
        console.log("submit clicked successfully");
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ name: name, password: password, location: geolocation, email: email })
        })
        const json = await response.json()
        console.log(json);

        if (!json.success) {

            alert("Enter Valid Credentials")
        }

    }
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })

    }

    return (
        <div className='container' >
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name='name' value={credentials.name} placeholder="Name" onChange={handleChange} />

                </div>
                <div className="form-group mb-3">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} aria-describedby="emailHelp" placeholder="Enter email" onChange={handleChange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" name='password' value={credentials.password} id="exampleInputPassword1" placeholder="Password" onChange={handleChange} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="exampleInputPassword1">Address</label>
                    <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} placeholder="Password" onChange={handleChange} />
                </div>

                <button type="submit" className="m-3 btn btn-success">Submit</button>
                <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
            </form>
        </div>
    )
}

export default SignUp