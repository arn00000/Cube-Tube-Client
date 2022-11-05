import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { register } from "../api/users";
import { toast } from "react-toastify";

function Register() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState();

  const mutation = useMutation(async (user) => register(user), {
    onSuccess: () => {
      navigate("/");
      toast.success("Register successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    onError: (error) => {
      setError(error);
    },
  });

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    mutation.mutate(user);
  };
  return (
    <>
      <div className="pt-10 px-1 flex justify-center items-center ">
        <div className="p-4 w-full max-w-md bg-white sm:rounded-xl sm:shadow-2xl sm:p-6 md:p-8">
          <form className="space-y-4" method="POST" onSubmit={onSubmitHandler}>
            <h1 className="text-center font-semibold text-2xl underline text-orange-500">
              Register
            </h1>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-semibold text-orange-500 "
              >
                Channel Name
              </label>
              <input
                type="text"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-orange-500 focus:outline-none block w-full p-2.5"
                placeholder="cube tube"
                required=""
                onChange={onChangeHandler}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-semibold text-orange-500 "
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-orange-500 focus:outline-none block w-full p-2.5"
                placeholder="name@email.com"
                required=""
                onChange={onChangeHandler}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-semibold text-orange-500 "
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-orange-500 focus:outline-none block w-full p-2.5"
                required=""
                onChange={onChangeHandler}
              />
            </div>
            {error ? (
              <div
                id="alert-2"
                class="flex rounded-lg dark:bg-red-200"
                role="alert"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Info</span>
                <div className="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
                  {error}
                </div>
                <button
                  onClick={() => setError(false)}
                  className="ml-auto -mx-1.5 -my-1.5 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 inline-flex h-8 w-8"
                  data-dismiss-target="#alert-2"
                  aria-label="Close"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            ) : null}
            <button className="w-full text-white bg-orange-700 hover:bg-orange-800 focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Submit
            </button>
            <div className="text-sm font-medium text-gray-500 md:flex justify-between">
              <div>
                <Link to="/" className="text-orange-700 hover:underline">
                  Back to Home
                </Link>
              </div>
              <div>
                Already registered?
                <Link to="/login" className="text-orange-700 hover:underline">
                  Login now
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
