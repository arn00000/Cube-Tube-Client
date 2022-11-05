export const getAllVideos = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/video/all`);
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw new Error(data.msg);
    }
  } catch (e) {
    throw e.msg;
  }
};

export const getVideo = async (id) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/video/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw new Error(data.msg);
    }
  } catch (e) {
    throw e.message;
  }
};

export const searchVideo = async (search) => {
  console.log(search);
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/video/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search }),
      }
    );
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw new Error(data.msg);
    }
  } catch (e) {
    throw e.message;
  }
};

export const getUserVideo = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/video`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw new Error(data.msg);
    }
  } catch (e) {
    throw e.msg;
  }
};

export const getUserVideo2 = async (id) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/video/user/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw new Error(data.msg);
    }
  } catch (e) {
    throw e.msg;
  }
};

export const uploadVideo = async (v, video, image) => {
  try {
    const formData = new FormData();
    formData.append("title", v.title);
    formData.append("description", v.description);
    formData.append("video", video);
    formData.append("thumbnail", image);

    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/video`, {
      method: "POST",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
      body: formData,
    });
    const data = await res.json();

    if (res.ok) {
      return data;
    } else {
      throw new Error(data.msg);
    }
  } catch (e) {
    throw e.message;
  }
};

export const likeVideo = async (id) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/like/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw new Error(data.msg);
    }
  } catch (e) {
    throw e.message;
  }
};

export const dislikeVideo = async (id) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/dislike/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw new Error(data.msg);
    }
  } catch (e) {
    throw e.message;
  }
};

export const commentVideo = async (id, comment) => {
  console.log(JSON.stringify(comment));
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/comment/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ comment }),
      }
    );
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw new Error(data.msg);
    }
  } catch (e) {
    throw e.message;
  }
};

export const getComments = async (id) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/comment/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.msg);
    } else {
      return data;
    }
  } catch (e) {
    throw e.message;
  }
};

export const deleteVideo = async (videoId) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/video/${videoId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.msg);
    } else {
      return data;
    }
  } catch (e) {
    throw e.message;
  }
};

export const updateVideo = async (list, image, id) => {
  try {
    const formData = new FormData();
    formData.append("title", list.title);
    formData.append("description", list.description);
    formData.append("thumbnail", image);
    // formData.append("video", vid);

    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/video/${id}`, {
      method: "PUT",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.msg);
    } else {
      return data;
    }
  } catch (e) {
    throw e.message;
  }
};
