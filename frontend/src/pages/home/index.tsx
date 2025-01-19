import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { AxiosError } from "axios";
import axiosInstance from "../../middlewares/axiosInstance";
import { toast } from "react-toastify";

interface FormData {
  name: string;
  url: string;
  file: FileList;
}

const schema = z.object({
  name: z
    .string()
    .min(3, "Password must be at least 6 characters")
    .nonempty("Name is required"),
  url: z.string().url("Invalid URL format").nonempty("URL is required"),
  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Image is required.")
    .refine((files) => {
      const file = files[0];
      return (
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/webp"
      );
    }, "Only .jpg, .png, and .webp images are accepted.")
    .refine(
      (files) => files[0].size <= 5 * 1024 * 1024,
      "Image size must be less than 5MB."
    ),
});

const HomePage = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      setIsSubmitted(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("socialMediaHandle", data.url);
      formData.append("file", data.file[0]);
      const res = await axiosInstance.post("api/v1/", formData);
      toast.success(res.data.message);
      reset({
        name: "",
        url: "",
        file: undefined,
      });
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

  return (
    <div className="w-full h-full min-h-screen pt-16 flex justify-center items-center">
      <div className="w-full xl:w-9/12 bg-slate-100 h-full rounded-2xl drop-shadow-lg shadow-[#0000000f] p-10">
        <h1 className="text-3xl font-bold text-center sm:text-left">
          User Submission Form
        </h1>
        <form
          className="pt-5 flex flex-col gap-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full">
            <div className="label">
              <span className="label-text capitalize text-lg">Name:</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="w-full">
            <div className="label">
              <span className="label-text capitalize text-lg">
                Social Media Handle :
              </span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              {...register("url")}
            />
            {errors.url && <p className="text-red-500">{errors.url.message}</p>}
          </div>

          <div className="w-full">
            <div className="label">
              <span className="label-text capitalize text-lg">
                Upload Image :
              </span>
            </div>
            <input
              required
              type="file"
              className="file-input file-input-bordered w-full"
              {...register("file")}
            />
            {errors.file && (
              <p className="text-red-500">{errors.file.message}</p>
            )}
          </div>

          <button
            disabled={isSubmitted}
            className="btn w-28 btn-primary text-lg mt-5"
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
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
