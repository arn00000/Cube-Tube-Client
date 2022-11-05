import { likeVideo } from "../../api/video";
import { useMutation, useQueryClient } from "react-query";
import { getVideo } from "../../api/video";
import { useQuery } from "react-query";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

export const Like = ({ id, liked }) => {
  const decoded = localStorage.getItem("token")
    ? jwt_decode(localStorage.getItem("token"))
    : null;

  const { data, isLoading, isError } = useQuery(["video", id], () =>
    getVideo(id)
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(({ id }) => likeVideo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["video"]);
    },
  });

  const likeHandler = (id) => {
    mutation.mutate({ id });
  };

  const notify = () =>
    toast.warning("Login to access this feature", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  if (!localStorage.getItem("token")) {
    return (
      <button
        onClick={notify}
        className="flex items-center space-x-2 ext-sm md:text-xl text-orange-600"
      >
        <i className="fa-regular fa-thumbs-up"></i>
        <h1>Like</h1>
      </button>
    );
  }
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <>
      {data.like.find((user) => user.userId === decoded.data._id) ? (
        <button
          onClick={() => likeHandler(id)}
          className="flex items-center space-x-2 text-sm md:text-xl text-orange-600 hover:text-orange-300"
        >
          <i className={"fa-solid fa-thumbs-up"}></i>
          <h1>{liked.length === 0 ? "Like" : liked.length}</h1>
        </button>
      ) : (
        <button
          onClick={() => likeHandler(id)}
          className="flex items-center space-x-2 text-sm md:text-xl text-orange-600 hover:text-orange-300"
        >
          <i className={"fa-regular fa-thumbs-up"}></i>
          <h1>{liked.length === 0 ? "Like" : liked.length}</h1>
        </button>
      )}
    </>
  );
};
