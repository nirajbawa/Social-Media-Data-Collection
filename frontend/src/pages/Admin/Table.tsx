import { useEffect, useState } from "react";
import axiosInstance from "../../middlewares/axiosInstance";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import useAuthStore from "../../store/useAuthStore";

const Table = () => {
  const [, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const authData = useAuthStore((state: any) => state.data);
  const [image, setImage] = useState<string>("");

  const openModel = (url: string) => {
    setImage(url);
    const dialog = document.getElementById(
      "my_modal_1"
    ) as HTMLDialogElement | null;
    if (dialog && typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      console.error("Dialog element not found or showModal() not supported.");
    }
  };

  const fetchData = async () => {
    try {
      console.log(authData);
      setIsLoading(true);
      const res = await axiosInstance.get("api/v1/admin/user-form", {
        headers: {
          authorization: authData.token,
        },
      });
      setData(res.data.data);
      console.log(res);
    } catch (error) {
      const e = error as AxiosError<any>;
      toast.error(e.response?.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto w-full h-full">
      <table className="table text-sm">
        {/* head */}
        <thead className="text-lg">
          <tr>
            <th>Sr.No</th>
            <th>Name</th>
            <th>Social Media Handle</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index: number) => (
            <>
              <tr>
                <th>{index + 1}</th>
                <td>{item.data}</td>
                <td>{item.socialMediaHandle}</td>
                <td>
                  <button
                    className="btn btn-active"
                    onClick={() => openModel(item.image)}
                  >
                    Open
                  </button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Image</h3>
          <p className="py-4">
            <img src={image} />
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Table;
