import React, { useState } from "react";
import { uploadVideo } from "../../api/video";
import { useMutation, useQueryClient } from "react-query";

export const UploadVideo = () => {
  const [file, setFile] = useState();
  const [image, setImage] = useState();

  const [v, setV] = useState({});
  const [error, setError] = useState();

  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({ v, file, image }) => uploadVideo(v, file, image),
    {
      onSuccess: (e) => {
        queryClient.invalidateQueries("uservideo");
        // e.target.reset();
      },
      onError: (error) => {
        setError(error);
      },
    }
  );

  const onChangeHandler = (e) => {
    setV({ ...v, [e.target.name]: e.target.value });
  };

  const videoHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    mutation.mutate({ v, file, image });
    e.target.reset();
    setFile(null);
    setImage(null);
    setV({});
  };

  return (
    <>
      <button
        type="button"
        className="py-2 px-4 rounded-lg bg-orange-600 text-white hover:bg-orange-400 focus:outline-none focus:ring-0"
        data-bs-toggle="modal"
        data-bs-target="#uploadVideo"
      >
        <i className="fa-solid fa-cloud-arrow-up"></i> Upload video
      </button>

      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="uploadVideo"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="uploadVideoLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5
                className="text-xl font-medium leading-normal text-gray-800"
                id="exampleModalLabel"
              >
                Upload Video
              </h5>
              <button
                onClick={() => {
                  setFile(null);
                  setImage(null);
                }}
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body relative p-2">
              <form encType="multipart/form-data" onSubmit={onSubmitHandler}>
                <div className="p-5">
                  <div className="mb-2">
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-300">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 focus:outline-none block w-full p-2.5"
                      required=""
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-300">
                      Description
                    </label>
                    <input
                      type="textord"
                      name="description"
                      className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 focus:outline-none block w-full p-2.5"
                      required=""
                      onChange={onChangeHandler}
                    />
                  </div>

                  <div className="mb-2">
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-300">
                      Thumbnail
                    </label>
                    <input
                      className="form-control w-full p-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg focus:ring-0 focus:outline-none"
                      type="file"
                      name="image"
                      accept="image/svg,image/png,image/jpg,image/jpeg,image/webp"
                      placeholder="546"
                      onChange={imageHandler}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      File type (SVG, PNG, WEBP, JPG or JPEG)
                    </p>
                  </div>

                  <div className="py-2">
                    <div className="flex justify-center items-center w-full">
                      <label className="flex flex-col justify-center items-center w-full h-32 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col justify-center items-center ">
                          {file ? (
                            <div className="text-center space-x-2">
                              <i className="fa-regular fa-file-video md:text-4xl text-gray-500"></i>
                              <h1 className="text-xs md:text-xl text-gray-500">
                                {file.name}
                              </h1>
                            </div>
                          ) : (
                            <>
                              <svg
                                aria-hidden="true"
                                className="mb-3 w-10 h-10 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                ></path>
                              </svg>
                              <p className=" text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Click to upload
                                </span>
                                <span> or drag and drop</span>
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                File type MP4
                              </p>
                            </>
                          )}
                        </div>
                        <input
                          id="dropzone-file"
                          onChange={videoHandler}
                          name="file"
                          type="file"
                          className="hidden"
                          accept="video/mp4"
                        />
                      </label>
                    </div>

                    <div className="flex justify-end p-2">
                      {file ? (
                        <button
                          className="md:text-lg text-red-700 hover:animate-pulse"
                          onClick={() => setFile(null)}
                        >
                          Remove file{" "}
                          <i className="fa-regular fa-trash-can "></i>
                        </button>
                      ) : null}
                    </div>
                  </div>
                  {error ? (
                    <div
                      id="alert-2"
                      className="flex rounded-lg dark:bg-red-200 mb-2"
                      role="alert"
                    >
                      <svg
                        aria-hidden="true"
                        className="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="sr-only">Info</span>
                      <div className="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
                        {error}
                      </div>
                      <button
                        onClick={() => setError(false)}
                        className="ml-auto -mx-1.5 -my-1.5 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 inline-flex h-8 w-8"
                        data-dismiss-target="#alert-2"
                        aria-label="Close"
                      >
                        <span className="sr-only">Close</span>
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  ) : null}
                  <button className="w-full bg-orange-600 text-white py-2 text-lg rounded-xl focus:outline-none focus:ring-0">
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
