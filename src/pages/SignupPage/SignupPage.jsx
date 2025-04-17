import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

import useThemeStore from "../../store/themeStore";
import { SERVER_URL } from "../../Constants";

const SignupPage = () => {
  // const theme = useThemeStore((state) => state.theme);
  const theme = "dark";
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    if (localStorage.token && localStorage.name) {
      navigate("/");
    }
  });

  function handleFormSubmit(e) {
    e.preventDefault();
    if (
      email.trim() &&
      name.trim() &&
      password.trim() &&
      passwordConfirm.trim()
    ) {
      const url = `${SERVER_URL}/api/v1/users/signup`;
      toast.promise(
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            firstname: name.trim().split(" ")[0],
            lastname: name.trim().split(" ")[1],
            middlename: name.trim().split(" ")[2],
            password: password.trim(),
            passwordConfirm: passwordConfirm.trim(),
          }),
        })
          .then((dd) => dd.json())
          .then((dd) => {
            setEmail("");
            setName("");
            setPassword("");
            setPasswordConfirm("");
            if (dd.status === "success") {
              localStorage.setItem("token", dd.token);
              localStorage.setItem("name", dd.data.firstname);
              navigate("/login");
            } else {
              if (typeof dd.message === "object") {
                for (const key in dd.message) {
                  toast.error(dd.message[key].message);
                }
                dd.message = "Something went wrong!";
              }

              throw new Error(dd.message || "Something went wrong!");
            }
          }),
        {
          pending: "Signing Up...",
          success: "Signed Up!",
          error: {
            render({ data }) {
              return data.message;
            },
          },
        }
      );
    }
  }

  return (
    <>
      <div
        className={
          "fixed h-full w-full flex justify-center items-center z-10 " +
          (theme === "dark" && "bg-[#2A2B2F] text-white")
        }
      >
        <div
          className={
            "shadow rounded w-[350px] " +
            (theme === "dark" ? "shadow-white" : "shadow-black")
          }
        >
          <div className="flex gap-1 justify-center">
            <div
              className={
                theme === "dark"
                  ? "drop-shadow-[0_4px_8px_rgba(255,255,255,0.3)]"
                  : "drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
              }
            >
              <svg
                width="30"
                height="120"
                viewBox="0 0 30 120"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon
                  points="0,40 30,30 30,62 0,72"
                  fill={theme === "dark" ? "#FFFFFF" : "#2A2B2F"}
                />
                <path
                  d="M0 70 L35 90"
                  fill="none"
                  stroke={theme === "dark" ? "#FFFFFF" : "#2A2B2F"}
                  strokeWidth="5"
                />
              </svg>
            </div>
            <div
              className={
                "rotate-180 " +
                (theme === "dark"
                  ? "drop-shadow-[0_4px_8px_rgba(255,255,255,0.3)]"
                  : "drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]")
              }
            >
              <svg
                width="30"
                height="120"
                viewBox="0 12 30 120"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon
                  points="0,40 30,30 30,62 0,72"
                  fill={theme === "dark" ? "#FFFFFF" : "#2A2B2F"}
                />
                <path
                  d="M0 70 L35 90"
                  fill="none"
                  stroke={theme === "dark" ? "#FFFFFF" : "#2A2B2F"}
                  strokeWidth="5"
                />
              </svg>
            </div>
          </div>
          <h1 className="font-bold text-3xl pb-2 mb-1 border-b flex justify-between px-3">
            Sign Up
          </h1>
          <form
            onSubmit={handleFormSubmit}
            target="/login"
            className="p-3 text-xl"
          >
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full border border-slate-500 rounded-sm p-1 mb-2"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full border border-slate-500 rounded-sm p-1 mb-2"
              placeholder="Enter your fullname..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="block w-full border border-slate-500 rounded-sm p-1 mb-2"
              placeholder="Enter your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="passwordConfirm">Password Confirm</label>
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              className="block w-full border border-slate-500 rounded-sm p-1 mb-2"
              placeholder="Enter your password again..."
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full font-bold mt-2 py-1 px-2 rounded cursor-pointer text-white bg-blue-400 active:bg-blue-500 shadow-md hover:shadow-blue-500"
            >
              Submit
            </button>
            <Link
              to={"/login"}
              className="w-full block text-center font-bold mt-3 py-1 px-2 rounded cursor-pointer text-white bg-green-500 active:bg-green-600 shadow-md hover:shadow-green-600"
            >
              Login
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
