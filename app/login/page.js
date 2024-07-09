"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("marius@marius.ro");
  const [password, setPassword] = useState("marius");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        toast.error(result?.error);
        setLoading(false);
      } else {
        toast.success("Logged in successfully");
        router.push(callbackUrl);
      }
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
            <h2 className="mb-4 text-center">Login</h2>
            <form onSubmit={handleSubmit}>
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
                  disabled={loading || !email || !password}
                >
                  {loading ? "Please wait..." : "Register"}
                </button>
              </div>
            </form>
            <button
              className="btn btn-danger btn-raised mb-4"
              onClick={() => signIn("google", { callbackUrl: callbackUrl })}
            >
              Sign In with Google
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
