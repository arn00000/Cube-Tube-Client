import { AiOutlineHome } from "react-icons/ai";
import { RiUserFollowLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { MdVideoLibrary } from "react-icons/md";
import { MdPlaylistPlay } from "react-icons/md";
import { Link } from "react-router-dom";

function Sidebar2() {
  return (
    <>
      <div
        id="sidebar2"
        className="flex justify-evenly h-10 w-screen text-xl text-white z-50"
      >
        <Link
          to="/"
          className=" flex items-center hover:bg-orange-100 rounded-full"
        >
          <AiOutlineHome />
        </Link>
        <Link
          to="/follow"
          className=" flex items-center hover:bg-orange-100 rounded-full"
        >
          <RiUserFollowLine />
        </Link>
        <Link
          to="/library"
          className=" flex items-center hover:bg-orange-100 rounded-full"
        >
          <MdVideoLibrary />
        </Link>
        <Link
          to="/playlist"
          className=" flex items-center hover:bg-orange-100 rounded-full"
        >
          <MdPlaylistPlay />
        </Link>
        <Link
          to="/profile"
          className=" flex items-center hover:bg-orange-100 rounded-full"
        >
          <CgProfile />
        </Link>

        {/* <div className="flex flex-col space-y-6 mx-auto mb-5">
          <a
            href="!#"
            className="text-lg text-center text-white bg-orange-500 rounded-full px-5 py-4 hover:bg-orange-400"
          >
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
          </a>
        </div> */}
      </div>
    </>
  );
}
export default Sidebar2;
