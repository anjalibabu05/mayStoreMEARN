import { commonApi } from "./commonApi";
import { serverUrl } from "./serverUrl";

// register POST, reqbody ,content tyoe application/json
export const registerApi= async (reqBody)=>{
    return await commonApi('POST',`${serverUrl}/register`,reqBody)
}

// login post,reqbody
export const loginApi= async (reqBody)=>{
    return await commonApi('POST',`${serverUrl}/login`,reqBody)
}

// Google login POST,CREDENTIALS,REQBODY
export const googleLoginApi = async (reqBody)=>{
    return await commonApi("POST",`${serverUrl}/google-login`,reqBody)
}

// get home book
export const homeBookApi=async()=>{
    return await commonApi("GET",`${serverUrl}/all-home-books`,'')
}

// get all user brought books
// export const getAllUserBooksApi=async(reqHeader)=>{
//     return await commonApi("GET",`${serverUrl}/all-home-books`,'')
// }




// ------------------------------------USER----------------------------------
// upload a book
export const uploadBookApi=async (reqBody,reqHeader)=>{
    return await commonApi("POST", `${serverUrl}/add-book`,reqBody,reqHeader)
}

// get all books
export const getAllBookApi=async(searchKey,reqHeader)=>{

    // Query-baseurl?key=value
    return await commonApi("GET",`${serverUrl}/all-books?search=${searchKey}`,'',reqHeader)
}


// get a View books
export const getViewBookApi=async(id)=>{
    return await commonApi("GET",`${serverUrl}/view-book/${id}`,'')
}

// add job application 
export const addApplicationApi=async (reqBody,reqHeader)=>{
    return await commonApi("POST",`${serverUrl}/apply-job`,reqBody,reqHeader)
}

// export const addApplicationApi= aync (reqBody,reqH)

// get all user books
export const getAllUserBooksApi=async(reqHeader)=>{
    return await commonApi("GET",`${serverUrl}/user-tab-books`,"",reqHeader)
}


// get all user brought books
export const getAllUserBroughtBooksApi=async(reqHeader)=>{
    return await commonApi("GET",`${serverUrl}/user-brought-books`,"",reqHeader)
}

// --------------------------Admin---------------------------------


export const getAllAdminBookApi=async(reqHeader)=>{
    return await commonApi("GET",`${serverUrl}/admin-all-books`,'',reqHeader)
}

// Approve Books


export const approveBookApi=async(reqBody,reqHeader)=>{
    return await commonApi("PUT",`${serverUrl}/aprove-books`,reqBody,reqHeader)
}

// get All Users
export const getAllUserApi=async (reqHeader)=>{
    return await commonApi("GET",`${serverUrl}/all-users`,'',reqHeader)
}

// api to add a job
export const addJobApi=async (reqBody)=>{
    return await commonApi("POST",`${serverUrl}/add-job`,reqBody)
}

// api to get all  jobs
export const getallJobsApi=async (searchKey)=>{
    return await commonApi("GET",`${serverUrl}/all-jobs?search=${searchKey}`)
}
// update AdminInfo

export const updateProfileApi=async (reqBody,reqHeader)=>{
    return await commonApi("PUT",`${serverUrl}/admin-profile-update`,reqBody,reqHeader)

}
// update User Profile
export const updateUserProfileApi = async (reqBody, reqHeader) => {
  return await commonApi(
    'PATCH',
    `${serverUrl}/user-edit-profile`,
    reqBody,
    reqHeader
  );
};


// get all books admin
// export const gwtAllJobsApi=async (searchKey)=>{
//     return await commonApi("GET",`${serverUrl}/add-job?search=${searchKey}`,reqBody)
// }

// delete a job
 export const deleteAjobApi=async(id)=>{
     return await commonApi("GET",`${serverUrl}/delete-job/${id}`)
 }

//  get all applications
export const getAllApplicationApi=async()=>{
    return await commonApi("GET",`${serverUrl}/all-application`)
}

// api to make payment
export const makepaymentApi=async(reqBody,reqHeader)=>{
    return await commonApi("PUT",`${serverUrl}/make-payment`,reqBody,reqHeader)
}

