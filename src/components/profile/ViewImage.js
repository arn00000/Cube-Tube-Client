export const ViewImage = ({ data }) => {
  return (
    <>
      <button
        type="button"
        className="font-normal text-orange-500 text-start"
        data-bs-toggle="modal"
        data-bs-target="#viewImage"
      >
        {/* View profile picture
        <i className="fa-solid fa-chevron-right"></i> */}
        {data.profile_pic ? (
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
        )}
      </button>
      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto "
        id="viewImage"
        tabIndex="-1"
        aria-labelledby="viewImageLabel"
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-xl relative w-auto pointer-events-none">
          <div className="modal-content border-none relative flex flex-col w-full pointer-events-auto bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-end p-4">
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body relative p-4 flex justify-center h-96 items-center">
              {data.profile_pic ? (
                <img
                  src={process.env.REACT_APP_API_SERVER + data.profile_pic}
                  alt=""
                  className="rounded-full w-40 h-40  md:w-64 md:h-64"
                />
              ) : (
                <h1
                  style={{ backgroundColor: data.color }}
                  className="tracking-tight w-40 h-40 md:w-64 md:h-64 pt-10 md:pt-16 text-center rounded-full  text-white uppercase text-7xl md:text-9xl "
                >
                  {data.name.substring(0, 1)}
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
