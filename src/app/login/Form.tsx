"use client";
import { useForm } from "react-hook-form";
import { loginSchema, LoginValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import coverImage from '@/assets/imges/authentication/cover-1.png';
import { useState, useTransition } from "react";
import Button from "@/ui/Button";

export default function LoginForm() {
  const router = useRouter();
const [error,setError]=useState<string>();
const [isPending, stratTransition] = useTransition();

   const { register, handleSubmit, formState: { errors } } =  useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {},
  });

  async function onSubmit(values: LoginValues) {
    console.log("values", values);
    stratTransition(async () => {
    const response = await signIn(`credentials`, {
      username: values.username,
      password: values.password,
      redirect: false,
    });
     console.log("response",response)
    if (!response?.error) {
      router.push("/");
      toast.success("You logedin successfully");
    }else{
      setError(`username or password incorrect ${response.error}`)
      toast.error(`username or password incorrect ${response.error}`)
    }});
  }
  return (
    <>
      <div className="col-lg-6">
        <div className="row align-items-center justify-content-center gx-0 min-vh-100 mt-n1">
          <div className="col-md-7 col-lg-9">
            <h1 className="heading-4 mb-4 text-center">Sign In</h1>
            <p className="text-muted text-center">
              Don’t have an account? <Link href={"/register"}>Sign up</Link>
            </p>
            <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
              {error&&<p className="text-danger text-center">{error}</p>}
              <div className="mb-3">
                <input
                  type="tesxt"
                  className="form-control"
                  id="username"
                  placeholder="Username"
                  {...register("username")}
                />
                {errors.username?.message && <p className="text-danger">{errors.username?.message}</p>}
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  {...register("password")}
                />
                {errors.password?.message && <p className="text-danger">{errors.password?.message}</p>}
              </div>
              <div className="d-grid gap-2">
               <Button loading={isPending}>Login</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-lg-6 d-none d-lg-block bg-cover">
      <Image
  src={coverImage}
  alt="login image"
  className="bg-cover"
/>
      </div>
    </>
  );
}
