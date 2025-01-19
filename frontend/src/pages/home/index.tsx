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
      const e = error as AxiosError<any>;
      toast.error(e.response?.data.message);
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
