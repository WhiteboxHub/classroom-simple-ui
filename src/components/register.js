import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="bg-white p-4 rounded shadow w-50">
        <h2 className="h4 font-weight-bold mb-4 text-center">Register</h2>
        <form>
          <div className="mb-3">
            <label className="form-label" htmlFor="fullname">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              className="form-control"
              // placeholder="John Doe"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              // placeholder="you@example.com"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              // placeholder="********"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="city">
              City
            </label>
            <input
              type="text"
              id="city"
              className="form-control"
              // placeholder="Your City"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="phonenumber">
              Phone Number
            </label>
            <input
              type="tel"
              id="phonenumber"
              className="form-control"
              // placeholder="123-456-7890"
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <button
              type="submit"
              className="btn btn-primary"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
