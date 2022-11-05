import { useQuery } from "react-query";
import { getUserVideo } from "../../api/video";
import { UploadVideo } from "../videoAction/UploadVideo";
import { Link } from "react-router-dom";
import Loadingicon from "../../images/cubetubeicon.webp";
import Library from "./Library";
export const MyLibrary = () => {
  const { data, isLoading, isError } = useQuery("uservideo", getUserVideo);
  if (!localStorage.getItem("token")) {
    return (
      <div className="flex flex-col justify-center items-center h-96 space-y-3">
        <h1 className="text-center sm:hidden text-orange-500 font-semibold text-2xl">
          Sign in now <br />
          to view your playlist
        </h1>
        <h1 className="hidden sm:block text-orange-500 font-semibold text-2xl">
          Sign in now to view your library
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

  const sorted = data.sort(
    (a, b) => new Date(b.published) - new Date(a.published)
  );

  return (
    <>
      <div className="flex justify-between items-center px-2 py-2 sm:px-10 md:mx-5 bg-orange-100 md:rounded-lg">
        <div className="sm:flex items-center sm:space-x-2">
          <h1 className="sm:text-2xl text-orange-600">My Library</h1>
          <p className="text-xs sm:text-lg text-gray-500 underline">
            {data.length === 0 ? "0 Upload" : data.length + " Uploads"}
          </p>
        </div>
        <UploadVideo />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 md:p-2 justify-items-center">
        {sorted.map((video) => (
          <Library data={video} key={video._id} />
        ))}
      </div>
    </>
  );
};
