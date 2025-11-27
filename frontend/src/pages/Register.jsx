// frontend/src/pages/Register.jsx
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required()
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const res = await axios.post("/api/auth/register", data);
    alert("Registered!");
  };

  return (
    <div className="auth-page">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Full Name" {...register("name")} />
        <p>{errors.name?.message}</p>

        <input placeholder="Email" {...register("email")} />
        <p>{errors.email?.message}</p>

        <input placeholder="Password" type="password" {...register("password")} />
        <p>{errors.password?.message}</p>

        <button>Create Account</button>
      </form>
    </div>
  );
}
