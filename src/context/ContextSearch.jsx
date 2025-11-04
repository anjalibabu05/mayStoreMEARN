import React, { createContext, useState } from 'react';

export const searchKeyContext = createContext("");
export const adminProfileUpdteContext = createContext("");
export const userProfileUpdateContext = createContext("");

const ContextSearch = ({ children }) => {
  const [searchKey, setsearchKey] = useState('');
  const [adminProfileUpdateStatus, setAdminProfileUpdateStatus] = useState({});
  const [userProfileUpdateStatus, setUserProfileUpdateStatus] = useState({});

  return (
    <userProfileUpdateContext.Provider value={{ userProfileUpdateStatus, setUserProfileUpdateStatus }}>
      <adminProfileUpdteContext.Provider value={{ adminProfileUpdateStatus, setAdminProfileUpdateStatus }}>
        <searchKeyContext.Provider value={{ searchKey, setsearchKey }}>
          {children}
        </searchKeyContext.Provider>
      </adminProfileUpdteContext.Provider>
    </userProfileUpdateContext.Provider>
  );
};

export default ContextSearch;
