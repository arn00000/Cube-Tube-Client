import { AiOutlineHome } from "react-icons/ai";
import { RiUserFollowLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { MdVideoLibrary } from "react-icons/md";
import { MdPlaylistPlay } from "react-icons/md";
import Logo from "../images/cubetubeicon.webp";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/users";
import { useState } from "react";
import { getUser } from "../api/users";
import { useQuery } from "react-query";

function Sidebar() {
  const navigate = useNavigate();
  const [acn1, setAcn1] = useState("bg-orange-100 text-orange-500"); // assumes link 1 is default active
  const [acn2, setAcn2] = useState("");
  const [acn3, setAcn3] = useState("");
  const [acn4, setAcn4] = useState("");
  const [acn5, setAcn5] = useState("");

  const startChangeVis = (id) => {
    setAcn1("");
    setAcn2("");
    setAcn3("");
    setAcn4("");
    setAcn5("");

    if (id === "home") setAcn1("bg-orange-100 text-orange-500");
    else if (id === "follower") setAcn2("bg-orange-100 text-orange-500");
    else if (id === "library") setAcn3("bg-orange-100 text-orange-500");
    else if (id === "playlist") setAcn4("bg-orange-100 text-orange-500");
    else if (id === "profile") setAcn5("bg-orange-100 text-orange-500");
    else if (id === "logout") setAcn1("bg-orange-100 text-orange-500");
  };

  const user = localStorage.getItem("token");

  const { data, isLoading, isError } = useQuery(["user", user], () =>
    getUser(user)
  );

  return (
    <>
      <div className="grid grid-cols-1 content-between h-screen bg-slate-200">
        <div className="flex flex-col mx-auto mt-5 text-3xl text-slate-600 space-y-2 xl:space-y-5">
          <div className="flex justify-center mb-2">
            <img src={Logo} alt="" className="w-12 " />
          </div>
          <Link
            id="home"
            to="/"
            onClick={() => {
              startChangeVis("home");
            }}
            className={`${acn1} p-3 flex items-center hover:bg-orange-100 rounded-full focus-ring-0`}
          >
            <AiOutlineHome />
          </Link>
          <Link
            id="follower"
            to="/follow"
            onClick={() => {
              startChangeVis("follower");
            }}
            className={`${acn2} p-3 flex items-center hover:bg-orange-100 rounded-full focus-ring-0`}
          >
            <RiUserFollowLine />
          </Link>
          <Link
            id="library"
            to="/library"
            onClick={() => {
              startChangeVis("library");
            }}
            className={`${acn3} p-3 flex items-center hover:bg-orange-100 rounded-full focus-ring-0`}
          >
            <MdVideoLibrary />
          </Link>
          <Link
            id="playlist"
            to="/playlist"
            onClick={() => {
              startChangeVis("playlist");
            }}
            className={`${acn4} p-3 flex items-center hover:bg-orange-100 rounded-full focus-ring-0`}
          >
            <MdPlaylistPlay />
          </Link>
          <Link
            id="profile"
            to="/profile"
            onClick={() => {
              startChangeVis("profile");
            }}
            className={`${acn5} p-3 flex items-center hover:bg-orange-100 rounded-full focus-ring-0`}
          >
            <CgProfile />
          </Link>
        </div>
        <div className="flex flex-col space-y-2 xl:space-y-5 mx-auto mb-5">
          {!user ? null : (
            <>
              {isLoading || isError ? null : data.profile_pic ? (
                <img
                  src={process.env.REACT_APP_API_SERVER + data.profile_pic}
                  alt=""
                  className="w-14 h-14 rounded-full"
                />
              ) : (
                <div className="">
                  <h1
                    style={{ backgroundColor: data.color }}
                    className="tracking-tight w-full text-center rounded-full px-5 py-3 text-white uppercase text-2xl font-semibold"
                  >
                    {data.name.substring(0, 1)}
                  </h1>
                </div>
              )}

              <button
                onClick={() => {
                  logout();
                  navigate("/");
                  startChangeVis("logout");
                }}
                id="logout"
                className="text-lg text-center text-white bg-orange-600 rounded-full px-4 py-3.5 hover:bg-orange-400"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default Sidebar;
