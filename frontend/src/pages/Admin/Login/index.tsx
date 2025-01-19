import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axiosInstance from "../../../middlewares/axiosInstance";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";

interface FormData {
  username: string;
  password: string;
}

const schema = z.object({
  username: z
    .string()
    .min(3, "Name must have at least 5 characters")
    .nonempty("Name is required"),
  password: z
    .string()
    .min(8, "Password must have at least 5 characters")
    .nonempty("Password is required"),
});

const AdminLoginPage = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  let navigate = useNavigate();
  const [authData, setAuthData] = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      setIsSubmitted(true);
      const res = await axiosInstance.post("api/v1/auth", data);
      setAuthData({
        isAuthenticated: true,
        token: res.data.data.token,
      });
      toast.success("Login successful");
      navigate("/admin");
    } catch (error) {
      const e = error as AxiosError<any>;
      toast.error(e.response?.data.message);
    } finally {
      setIsSubmitted(false);
    }
  };

  useEffect(() => {
    if (authData.isAuthenticated) {
      navigate("/admin");
    }
  }, [authData]);

  return (
    <div className="w-full h-full min-h-screen pt-16 flex justify-center items-center">
      <div className="w-full xl:w-9/12 bg-slate-100 h-full rounded-2xl drop-shadow-lg shadow-[#0000000f] p-10">
        <h1 className="text-3xl font-bold text-center sm:text-left">
          Admin Login
        </h1>
        <form
          className="pt-5 flex flex-col gap-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full">
            <div className="label">
              <span className="label-text capitalize text-lg">Username:</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div className="w-full">
            <div className="label">
              <span className="label-text capitalize text-lg">Password :</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            className="btn w-28 btn-primary text-lg mt-5"
            disabled={isSubmitted}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
