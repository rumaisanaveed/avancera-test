import axios from "axios";

const axiosReq = async (method, path, postData) => {
  try {
    // TODO : FIX ENV VARIABLE NOT LOADING
    // const url = `${process.env.NEXT_PUBLIC_API_URL}/${path}`;
    const url = `http://localhost:3000/api/${path}`;

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
