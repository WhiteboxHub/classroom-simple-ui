import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="bg-white p-4 rounded shadow w-25">
        <h2 className="h4 font-weight-bold mb-4 text-center">Login</h2>
        <form>
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
          <div className="d-flex justify-content-between align-items-center">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <Link to="/register" className="text-decoration-none">
              Not registered? Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;