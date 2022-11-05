import { useQuery } from "react-query";
import Loadingicon from "../../images/cubetubeicon.webp";
import { useParams } from "react-router-dom";
import { getUserVideo2 } from "../../api/video";
import Videos from "./Videos";
import Follow from "./Follow";

export const UserVideo = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery("userId", () =>
    fetch(`${process.env.REACT_APP_API_SERVER}/user/${id}`).then((res) =>
      res.json()
    )
  );

  const {
    data: data2,
    isLoading: isLoading2,
    isError: isError2,
  } = useQuery(["uservideo2", id], () => getUserVideo2(id));

  if (isLoading || isLoading2) {
    return (
      <div className="flex justify-center items-center h-96">
        <img src={Loadingicon} alt="" className="animate-spin w-16" />
      </div>
    );
  }
  if (isError || isError2) {
    return <h1>Error</h1>;
  }

  const sorted = data2.sort(
    (a, b) => new Date(b.published) - new Date(a.published)
  );

  return (
    <>
      {/* <div className="md:px-2 mb-5">
        <div className="bg-slate-100 p-2">
          <div className="flex justify-center">
            {data.profile_pic ? (
              <img
                src={process.env.REACT_APP_API_SERVER + data.profile_pic}
                alt=""
                className="w-10 h-10 md:w-20 md:h-20 rounded-full"
              />
            ) : (
              <div className="">
                <h1
                  style={{ backgroundColor: data.color }}
                  className="tracking-tight w-full text-center rounded-full px-4 py-2 md:px-5 md:py-3 text-white uppercase md:text-4xl"
                >
                  {data.name.substring(0, 1)}
                </h1>
              </div>
            )}
          </div>
          <h1 className="font-bold sm:text-2xl text-center">{data.name}</h1>
          <div className="w-full flex items-center justify-center space-x-2">
            <div className="flex flex-row items-center space-x-2 ">
              <h1 className="text-xs md:text-sm text-gray-500">
                {data2.length < 2
                  ? data2.length + " video"
                  : data2.length + " videos"}
              </h1>
            </div>
            <span>|</span>
            <div className="flex flex-row items-center space-x-2 ">
              <h1 className="text-xs md:text-sm text-gray-500">
                {data.follow.length < 2
                  ? data.follow.length + " follower"
                  : data.follow.length + " fllowers"}
              </h1>
            </div>
          </div>
          <div className="w-full p-2 flex items-center justify-center ">
            <Follow id={id} />
          </div>
        </div>

        <div className="bg-slate-100 w-full sm:h-10 flex flex-col sm:flex-row sm:items-center justify-evenly px-5">
          <div className="flex flex-row items-center space-x-2 ">
            <i className="fa-regular fa-circle-play text-orange-600 text-lg"></i>
            <h1 className="text-md text-gray-500">
              {data2.length < 2
                ? data2.length + " video"
                : data2.length + " videos"}
            </h1>
          </div>
          <div className="flex flex-row items-center space-x-2 ">
            <i className="fa-regular fa-calendar-check text-orange-600 text-lg"></i>{" "}
            <h1 className="text-md text-gray-500">{data.joined}</h1>
          </div>
          <div className="flex flex-row items-center space-x-2 ">
            <i className="fa-regular fa-envelope text-orange-600 text-lg"></i>{" "}
            <h1 className="text-md text-gray-500">{data.email}</h1>
          </div>
        </div>
      </div> */}
      <div className="md:px-2 mb-5 grid grid-cols-1 lg:grid-cols-2">
        <div className=" bg-slate-100 p-2 flex items-center justify-center space-x-2 xl:space-x-32 md:rounded-xl">
          <div className="flex justify-center items-center md:space-x-2">
            {data.profile_pic ? (
              <img
                src={process.env.REACT_APP_API_SERVER + data.profile_pic}
                alt=""
                className="w-10 h-10 md:w-20 md:h-20 rounded-full"
              />
            ) : (
              <div className="">
                <h1
                  style={{ backgroundColor: data.color }}
                  className="tracking-tight w-full text-center rounded-full px-4 py-2 md:px-5 md:py-3 text-white uppercase md:text-4xl"
                >
                  {data.name.substring(0, 1)}
                </h1>
              </div>
            )}
            <div>
              <h1 className="font-bold sm:text-2xl text-center">{data.name}</h1>
              <div className="w-full flex items-center justify-center space-x-2">
                <div className="flex flex-row items-center space-x-2 ">
                  <h1 className="text-xs md:text-sm text-gray-500">
                    {data2.length < 2
                      ? data2.length + " video"
                      : data2.length + " videos"}
                  </h1>
                </div>
                <span>|</span>
                <div className="flex flex-row items-center space-x-2 ">
                  <h1 className="text-xs md:text-sm text-gray-500">
                    {data.follow.length < 2
                      ? data.follow.length + " follower"
                      : data.follow.length + " fllowers"}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <Follow id={id} />
        </div>
        {/* <div className=" sm:h-10 flex flex-col sm:flex-row sm:items-center justify-evenly px-5">
          <div className="flex flex-row items-center space-x-2 ">
            <i className="fa-regular fa-calendar-check text-orange-600 text-lg"></i>{" "}
            <h1 className="text-md text-gray-500">{data.joined}</h1>
          </div>
          <div className="flex flex-row items-center space-x-2 ">
            <i className="fa-regular fa-envelope text-orange-600 text-lg"></i>{" "}
            <h1 className="text-md text-gray-500">{data.email}</h1>
          </div>
        </div> */}
      </div>
      {sorted.length === 0 ? (
        <h1 className="text-orange-500 text-center text-2xl mt-10">
          No videos yet
        </h1>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-2 gap-y-8 p-2 justify-items-center">
          {sorted.map((video) => (
            <Videos data={video} key={video._id} />
          ))}
        </div>
      )}
    </>
  );
};
