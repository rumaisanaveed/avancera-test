import axios from "axios";

const axiosReq = async (method, path, postData) => {
  try {
    // TODO : FIX ENV VARIABLE NOT LOADING

    const url = `http://localhost:3000/api/${path}`;
    // console.log(url);

    const config = {
      method,
      url,
      data: postData,
      headers: {
        "Content-type": "application/json",
      },
    };

    const response = await axios(config);

    return response;
  } catch (error) {
    throw error;
  }
};

export default axiosReq;
