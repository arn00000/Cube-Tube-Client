import { getUserById } from "../../api/users";
import { followUser } from "../../api/users";
import { useMutation, useQueryClient } from "react-query";
import { useQuery } from "react-query";
import Loadingicon from "../../images/cubetubeicon.webp";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Follower = ({ userId }) => {
  const { data, isLoading, isError } = useQuery(["userId", userId], () =>
    getUserById(userId)
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(({ id }) => followUser(data._id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });

  const followHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Unfollow from ${data.name}`,
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Unfollow",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate({ id });
        Swal.fire("Unfollowed!", `${data.name} removed`, "success");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <img src={Loadingicon} alt="" className="animate-spin w-16" />
      </div>
    );
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <li className="py-3 sm:py-4">
        <div className="flex items-center space-x-4">
          <Link to={`/uservideo/${data._id}`}>
            <div className="flex-shrink-0">
              {data.profile_pic ? (
                <img
                  src={process.env.REACT_APP_API_SERVER + data.profile_pic}
                  alt=""
                  className="w-10 h-10 sm:w-16 sm:h-16 lg:w-10 lg:h-10 rounded-full"
                />
              ) : (
                <div className="">
                  <h1
                    style={{ backgroundColor: data.color }}
                    className="tracking-tight w-full text-center rounded-full px-3.5 py-1.5 text-white uppercase text-xl"
                  >
                    {data.name.substring(0, 1)}
                  </h1>
                </div>
              )}
            </div>
          </Link>
          <div className="flex-1 min-w-0">
            <p className="text-lg font-medium text-gray-900 truncate dark:text-white">
              {data.name}
            </p>
            <p className="text-xs text-gray-500 truncate dark:text-gray-400">
              {data.joined}
            </p>
          </div>

          <button
            onClick={() => followHandler(data._id)}
            className="text-xs py-2 px-2 bg-orange-400 text-white rounded-lg"
          >
            Following <i className="fa-solid fa-user-check"></i>
          </button>
        </div>
      </li>
    </>
  );
};
export default Follower;
