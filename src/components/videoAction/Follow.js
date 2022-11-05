import { followUser } from "../../api/users";
import { getUserById } from "../../api/users";
import jwt_decode from "jwt-decode";
import { useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import toast2 from "react-hot-toast";
export const Follow = ({ id }) => {
  const decoded = localStorage.getItem("token")
    ? jwt_decode(localStorage.getItem("token"))
    : null;

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery(["user", id], () => getUserById(id));

  const queryClient = useQueryClient();

  const mutation = useMutation(({ id }) => followUser(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      toast2(`Followed ${user.name}`, {
        style: {
          // border: "1px solid #f97316",
          padding: "16px",
          color: "#f97316",
        },
        icon: <i className="fa-solid fa-user-check"></i>,
        iconTheme: {
          primary: "#f97316",
          secondary: "#f97316",
        },
      });
    },
  });

  const followHandler = (id) => {
    mutation.mutate({ id });
  };

  const mutation2 = useMutation(({ id }) => followUser(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });

  const followHandler2 = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Unfollow from ${user.name}`,
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Unfollow",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation2.mutate({ id });
        Swal.fire("Unfollowed!", `${user.name} removed`, "success");
      }
    });
  };

  const notify = () => {
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
  };

  if (!localStorage.getItem("token")) {
    return (
      <button
        onClick={notify}
        className="text-xs md:text-lg py-2 px-5 uppercase bg-orange-600 text-white rounded-lg"
      >
        Follow
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
      {decoded.data._id === id ? null : user.follow.find(
          (follower) => follower.userId === decoded.data._id
        ) ? (
        <button
          onClick={() => followHandler2(id)}
          className="text-xs md:text-lg py-2 px-5 bg-orange-400 text-white rounded-lg"
        >
          Following <i className="fa-solid fa-user-check"></i>
        </button>
      ) : (
        <button
          onClick={() => followHandler(id)}
          className="text-xs md:text-lg py-2 px-5 uppercase bg-orange-600 text-white rounded-lg"
        >
          Follow
        </button>
      )}
    </>
  );
};

export default Follow;
