import { commonApi } from "./commonApi";
import { serverUrl } from "./serverUrl";

// AUTH
export const registerApi = async (reqBody) =>
  await commonApi('POST', `${serverUrl}/register`, reqBody);

export const loginApi = async (reqBody) =>
  await commonApi('POST', `${serverUrl}/login`, reqBody);

export const googleLoginApi = async (reqBody) =>
  await commonApi("POST", `${serverUrl}/google-login`, reqBody);

// PUBLIC
export const homeBookApi = async () =>
  await commonApi("GET", `${serverUrl}/all-home-books`, '');

// USER
export const uploadBookApi = async (reqBody, reqHeader) =>
  await commonApi("POST", `${serverUrl}/add-book`, reqBody, reqHeader);

export const getAllBookApi = async (searchKey, reqHeader) =>
  await commonApi("GET", `${serverUrl}/all-books?search=${searchKey}`, '', reqHeader);

export const getViewBookApi = async (id) =>
  await commonApi("GET", `${serverUrl}/view-book/${id}`, '');

export const addApplicationApi = async (reqBody, reqHeader) =>
  await commonApi("POST", `${serverUrl}/apply-job`, reqBody, reqHeader);

export const getAllUserBooksApi = async (reqHeader) =>
  await commonApi("GET", `${serverUrl}/user-tab-books`, "", reqHeader);

export const getAllUserBroughtBooksApi = async (reqHeader) =>
  await commonApi("GET", `${serverUrl}/user-brought-books`, "", reqHeader);

export const updateUserProfileApi = async (reqBody, reqHeader) =>
  await commonApi('PATCH', `${serverUrl}/user-edit-profile`, reqBody, reqHeader);

export const makepaymentApi = async (reqBody, reqHeader) =>
  await commonApi("PUT", `${serverUrl}/make-payment`, reqBody, reqHeader);

// ADMIN
export const getAllAdminBookApi = async (reqHeader) =>
  await commonApi("GET", `${serverUrl}/admin-all-books`, '', reqHeader);

export const approveBookApi = async (reqBody, reqHeader) =>
  await commonApi("PUT", `${serverUrl}/approve-books`, reqBody, reqHeader);

export const getAllUserApi = async (reqHeader) =>
  await commonApi("GET", `${serverUrl}/all-users`, '', reqHeader);

export const addJobApi = async (reqBody) =>
  await commonApi("POST", `${serverUrl}/add-job`, reqBody);

export const getallJobsApi = async (searchKey) =>
  await commonApi("GET", `${serverUrl}/all-jobs?search=${searchKey}`);

export const updateProfileApi = async (reqBody, reqHeader) =>
  await commonApi("PUT", `${serverUrl}/admin-profile-update`, reqBody, reqHeader);

export const deleteAjobApi = async (id) =>
  await commonApi("DELETE", `${serverUrl}/delete-job/${id}`);

export const getAllApplicationApi = async () =>
  await commonApi("GET", `${serverUrl}/all-application`);
