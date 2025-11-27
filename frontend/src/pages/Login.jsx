import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  email: yup.string().email().required("Email required"),
  password: yup.string().required("Password required")
});

export default function Login() {
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      nav("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-3">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

        <div>
          <label>Email</label>
          <input {...register("email")} className="border p-2 w-full" />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        <div>
          <label>Password</label>
          <input type="password" {...register("password")} className="border p-2 w-full" />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        <button disabled={isSubmitting} className="bg-blue-600 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
