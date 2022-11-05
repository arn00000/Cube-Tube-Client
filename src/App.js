import React from "react";
import { Routes, Route } from "react-router-dom";
import { VideosList } from "./components/videosList";
import { ShowPlaylist } from "./components/playlist";
import { ViewPlaylist } from "./components/viewPlaylist";
import { GetVideo } from "./components/getVideo";
import { MyLibrary } from "./components/myLibrary";
import { MyFollowing } from "./components/myFollowing";
import { UserVideo } from "./components/userVideo";
import Register from "./partials/Register";
import Login from "./partials/Login";
import Sidebar from "./components/Sidebar";
import Sidebar2 from "./components/Sidebar2";
import Navbar from "./components/Navbar";
import Profile from "./components/profile/Profile";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <div className="h-screen w-full md:flex">
        <div className="hidden md:block w-20 h-screen fixed">
          <Sidebar />
        </div>

        <div className="h-screen md:w-full md:overflow md:ml-20">
          <Navbar />
          <div className="">
            <Routes>
              <Route path="/" element={<VideosList />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/playlist" element={<ShowPlaylist />} />
              <Route path="/viewplaylist/:id" element={<ViewPlaylist />} />
              <Route path="/getvideo/:id" element={<GetVideo />} />
              <Route path="/library" element={<MyLibrary />} />
              <Route path="/follow" element={<MyFollowing />} />
              <Route path="/uservideo/:id" element={<UserVideo />} />
            </Routes>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            {/* Same as */}
            <ToastContainer />
            <Toaster position="bottom-center" />
          </div>
          <div className="h-10 w-full"></div>
        </div>
      </div>
      <div className="fixed bottom-0 md:hidden z-50">
        <Sidebar2 />
      </div>
    </>
  );
}
export default App;
