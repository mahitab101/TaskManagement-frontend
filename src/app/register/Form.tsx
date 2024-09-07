"use client";
import { useForm } from "react-hook-form";
import { signUpSchema, SignUpValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import coverImage from "@/assets/imges/authentication/cover-1.png";
import { useRouter } from "next/navigation";


export default function RegisterForm() {
const router = useRouter();
  const {register,handleSubmit,formState:{errors}} = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {},
  });

  async function onSubmit(values: SignUpValues) {
    console.log("values", values);
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify(values),
    });
    const data = await response.json();
    if (data.error) {
      toast.error(data.error);
      return;
    }else{
    toast.success("Account created successfully");
    router.push("/login");
    }
  }
  return (
    <>
      <div className="col-lg-6">
        <div className="row align-items-center justify-content-center gx-0 min-vh-100 mt-n1">
          <div className="col-md-7 col-lg-9">
            <h1 className="heading-4 mb-4 text-center">Sign up</h1>
            <p className="text-muted text-center">
              Already have an account <Link href={"/login"}>Login</Link>
            </p>
            <form
              className="container flex flex-col gap-4 mx-auto max-w-md mt-10"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-3">
                <input
                  {...register("username")}
                  className="form-control"
                  type="text"
                  id="username"
                  placeholder="Username"
                />
                {errors.username?.message && <p className="text-danger">{errors.username?.message}</p>}
              </div>
              <div className="mb-3">
                <input
                  {...register("email")}
                  className="form-control"
                  type="email"
                  id="email"
                  placeholder="Email"
                />
                {errors.email?.message && <p className="text-danger">{errors.email?.message}</p>}
              </div>
              <div className="mb-3">
                <input
                  {...register("password")}
                  className="form-control"
                  type="password"
                  id="password"
                  placeholder="Password"
                />
                {errors.password?.message && <p className="text-danger">{errors.password?.message}</p>}
              </div>
              <button className="btn w-100 btn-primary" type="submit">
              Register
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-lg-6 d-none p-0 d-lg-block bg-cover">
        <Image
          src={coverImage}
          alt="login image"
          className="bg-cover"
        />
      </div>
    </>
  );
}
