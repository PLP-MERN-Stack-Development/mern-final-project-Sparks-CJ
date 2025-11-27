// frontend/src/pages/Login.jsx
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const schema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required()
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const res = await axios.post("/api/auth/login", data);
    localStorage.setItem("token", res.data.token);
    alert("Logged in!");
  };

  return (
    <div className="auth-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Email" {...register("email")} />
        <p>{errors.email?.message}</p>

        <input placeholder="Password" type="password" {...register("password")} />
        <p>{errors.password?.message}</p>

        <button>Login</button>
      </form>
    </div>
  );
}
