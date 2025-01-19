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
      if (error instanceof AxiosError) {
        const e = error as AxiosError<any>;
        toast.error(e.response?.data.message ?? "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
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
              type="password"
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
            {isSubmitted ? (
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
