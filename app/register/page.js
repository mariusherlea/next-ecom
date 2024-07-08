"use client";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(name, email, password);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <main>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center vh-100">
          <div className="col-lg-5 shadow bg-light p-5">
            <h2 className="mb-4 text-center">Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control mb-4"
                  id="name"
                  aria-describedby="emailHelp"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control mb-4"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control mb-4"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button
                  type="submit"
                  className="btn btn-primary btn-raised"
                  disabled={loading || !name || !email || !password}
                >
                  {loading ? "Please wait..." : "Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
