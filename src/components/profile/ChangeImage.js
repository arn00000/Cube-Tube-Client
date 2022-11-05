import { updateImage } from "../../api/users";
import { useQueryClient, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";

export const ChangeImage = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [image, setImage] = useState();

  const mutation = useMutation((image) => updateImage(image), {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      navigate("/profile");
    },
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    mutation.mutate(image);
    navigate("/profile");
    setImage(null);
  };
  return (
    <>
      <form
        encType="multipart/form-data"
        onSubmit={onSubmitHandler}
        className=" bg-grey-lighter"
      >
        <label className=" font-normal text-orange-500 cursor-pointer">
          <span>
            Change profile picture<i className="fa-solid fa-chevron-right"></i>
          </span>
          <input
            type="file"
            className="hidden"
            name="image"
            onChange={imageHandler}
            accept="image/png, image/jpeg, image/webp"
          />
        </label>
        {image ? (
          <>
            <div className="">
              <input
                value={image.name}
                className="bg-gray-100 text-gray-900 text-sm focus:outline-none block w-full p-2.5 text-center"
                disabled
              />
              <div className="grid grid-cols-2">
                <button
                  onClick={() => setImage(null)}
                  className="text-white bg-slate-500 flex justify-center space-x-3 p-2 cursor-pointer hover:bg-slate-400"
                >
                  <span className="text-sm">Cancel</span>
                </button>
                <button className="text-white bg-orange-500 flex justify-center p-2 cursor-pointer hover:bg-orange-400">
                  <HiOutlineUpload className="text-xl" />
                  <span className="text-sm">Upload</span>
                </button>
              </div>
            </div>
          </>
        ) : null}
      </form>
    </>
  );
};
