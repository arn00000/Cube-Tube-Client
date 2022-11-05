import Follower from "./Follower";
import { getUser } from "../../api/users";
import { useQuery } from "react-query";
import Loadingicon from "../../images/cubetubeicon.webp";
import { Link } from "react-router-dom";

export const MyFollowing = () => {
  const user = localStorage.getItem("token");
  const { data, isLoading, isError } = useQuery(["user", user], () =>
    getUser(user)
  );

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-96 space-y-3">
        <h1 className="text-center sm:hidden text-orange-500 font-semibold text-2xl">
          Sign in now <br />
          to view your following
        </h1>
        <h1 className="hidden sm:block text-orange-500 font-semibold text-2xl">
          Sign in now to view your following
        </h1>
        <Link
          to="/login"
          className="text-center text-orange-700 border-2 border-orange-700 rounded-lg px-5 py-2 hover:bg-orange-700 hover:text-white"
        >
          Sign in
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <img src={Loadingicon} alt="" className="animate-spin w-16" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center h-96 space-y-3">
        <h1 className="text-center sm:hidden text-orange-500 font-semibold text-2xl">
          Please Relogin again <br />
          your session are expired
        </h1>
        <h1 className="hidden sm:block text-orange-500 font-semibold text-2xl">
          Please Relogin again your session are expired
        </h1>
        <Link
          to="/login"
          className="text-center text-orange-700 border-2 border-orange-700 rounded-lg px-5 py-2 hover:bg-orange-700 hover:text-white"
        >
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="p-4 w-full max-w-md bg-white md:rounded-lg md:border md:shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Following
            </h5>
            <p className="text-sm font-medium text-orange-600">Action</p>
          </div>
          <div className="flow-root">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {data.following.length === 0 ? (
                <>
                  <div className="flex justify-center items-center h-96">
                    <h1>No following</h1>
                  </div>
                </>
              ) : (
                data.following.map((user) => (
                  <Follower userId={user.userId} key={user._id} />
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
