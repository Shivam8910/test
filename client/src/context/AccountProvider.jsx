import React, { createContext, useState } from 'react'

export const AccountContext = createContext(null);

const AccountProvider = ({children})=> {
    const [account,setAc] = useState();
  return (
    <AccountContext.Provider value={{
        account,
        setAc
    }}
   >
        {children}
   </AccountContext.Provider>
  )
}

export default AccountProvider;