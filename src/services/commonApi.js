import axios from "axios";

export const commonApi = async (httpRequest, url, reqBody, reqHeader) => {
  try {
    const response = await axios({
      method: httpRequest,
      url,
      data: reqBody,
      headers: reqHeader, // do NOT set Content-Type if reqBody is FormData
    });

    // Return both status and data
    return { status: response.status, data: response.data };
  } catch (err) {
    // If server responded with error
    if (err.response) {
      return { status: err.response.status, data: err.response.data };
    } else {
      // Network error or no response
      return { status: 0, data: { message: err.message } };
    }
  }
};
