"use client";

import { Spinner, useToast } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.email === "" || input.password === "") {
      toast({
        title: " please fill all inputs",
        description: "",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    setLoading(true);

    axios
      .post("https://webd-back.onrender.com/user/register", input)
      .then((res) => {
        toast({
          title: res.data.message,
          description: "",
          position: "top-right",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        
        setLoading(false);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
        setInput({
          email: "",
          password: "",
        });
      });
  };
  return (
    <div className="flex min-h-full flex-1 bg-slate-300 w-full lg:w-1/3 m-auto flex-col justify-center mt-8 px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register to create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                value={input.email}
                onChange={handleChange}
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm"></div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                value={input.password}
                onChange={handleChange}
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? <Spinner /> : "Register"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Allready a member?{" "}
         
          <Link to={'/login'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Please Login</Link>
        </p>
      </div>
    </div>
  );
}
