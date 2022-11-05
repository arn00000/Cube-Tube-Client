import { getUser } from "../../api/users";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Loadingicon from "../../images/cubetubeicon.webp";
import { ChangeImage } from "./ChangeImage";
import { ViewImage } from "./ViewImage";
import { deleteProfilePic } from "../../api/users";
import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";

function Profile() {
  const user = localStorage.getItem("token");

  const { data, isLoading, isError } = useQuery(["user", user], () =>
    getUser(user)
  );

  const queryClient = useQueryClient();

  const delMutation = useMutation(() => deleteProfilePic(), {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });

  const deleteHandler = () => {
    data.profile_pic &&
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonColor: "#f97316",
        cancelButtonColor: "#9ca3af",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          delMutation.mutate();
          Swal.fire(
            "Deleted!",
            "Your profile picture has been deleted.",
            "success"
          );
        }
      });
  };

  if (!user || !data) {
    return (
      <div className="flex flex-col justify-center items-center h-96 space-y-3">
        <h1 className="text-center sm:hidden text-orange-500 font-semibold text-2xl">
          Sign in now <br />
          to view your profile
        </h1>
        <h1 className="hidden sm:block text-orange-500 font-semibold text-2xl">
          Sign in now to view your profile
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
  // let likeArray = data2.map((x) => x.like);
  // let x = likeArray.map((items, index) => {
  //   {
  //     items.map((subItems, sIndex) => {
  //       return { subItems };
  //     });
  //   }
  // });
  // console.log(x);
  // for (var i = 0; i < likeArray.length; i++) {
  //   let sum;
  //   console.log(likeArray[i].length);
  //   sum += likeArray[i][1].length;
  //   console.log(sum);
  // }
  // console.log(sum);

  return (
    <>
      <div className="flex justify-center">
        <div className=" w-full max-w-md md:bg-white md:rounded-xl md:border border-gray-200 md:shadow-md ">
          <div
            style={{ backgroundColor: data.color }}
            className=" md:rounded-t-xl h-32"
          ></div>
          <div className="flex justify-center -mt-10">
            <ViewImage data={data} />
            {/* {data.profile_pic ? (
              <img
                src={process.env.REACT_APP_API_SERVER + data.profile_pic}
                alt=""
                className="rounded-full border-solid border-white border-4 -mt-10 w-32 h-32"
              />
            ) : (
              // <div className=" rounded-full border-solid border-orange-500 border-4 -mt-10 w-32 h-32 bg-white">
              <h1
                style={{ backgroundColor: data.color }}
                className="border-solid border-white border-4 tracking-tight w-28 h-28 pt-7 text-center rounded-full  text-white uppercase text-5xl"
              >
                {data.name.substring(0, 1)}
              </h1>
              // </div>
            )} */}
          </div>

          <div className="flex justify-evenly mb-3">
            <div className="text-center ">
              <h2 className="font-bold text-xl">
                {data.follow.length === 0 ? "0" : data.follow.length}
              </h2>
              <span className="text-orange-500">Follower</span>
            </div>
            <div className="text-center ">
              <h2 className="font-bold text-xl">
                {data.following.length === 0 ? "0" : data.following.length}
              </h2>
              <span className="text-orange-500">Following</span>
            </div>
          </div>
          <div className="p-5">
            <h5 className="text-center mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {data.name}
            </h5>
            <p className=" font-normal text-orange-500">Email</p>
            <p className="mb-3 font-normal text-gray-500">{data.email}</p>
            <p className=" font-normal text-orange-500">Joined date</p>
            <p className="mb-3 font-normal text-gray-500">{data.joined}</p>
            <hr />
            <div className="flex flex-col space-y-2 pt-2">
              <button
                onClick={() => deleteHandler()}
                className="text-start font-normal text-orange-500"
              >
                Delete profile picture
                <i className="fa-solid fa-chevron-right"></i>
              </button>
              {/* <ViewImage data={data} /> */}
              <ChangeImage />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
