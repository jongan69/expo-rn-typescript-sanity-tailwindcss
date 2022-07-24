import React, { createContext, ReactElement, useEffect, useState } from "react";
import getUsersInfo from "../lib/getUsersInfo";
import createUserOnSanity from '../lib/createUser';
import getAllNfts from '../lib/getAllNfts';

export const AppContext = createContext({});

export const AppProvider = (props: { children: ReactElement }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserWallet, setCurrentUserWallet] = useState<string>();
  const [cardsData, setCardsData] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [isUserInDb, setIsUserInDb] = useState(true);


  useEffect(() => {
    console.log('The Current User Wallet was updated!')
    console.log('Current User Wallet: ', currentUserWallet)
    setIsLoggedIn(true)
    checkUserInsanity(currentUserWallet);
    // return () => {
    //   second
    // }
  }, [currentUserWallet])


  // Check if the user is in our database, if not add them and add their Nfts
  const checkUserInsanity = async (currentUserWallet: string | undefined) => {
    const checkuser = await getUsersInfo(currentUserWallet);
    console.log('Checked user in sanity: ', checkuser);
    if (checkuser.length > 0) {
      setIsUserInDb(true);
      // Fetch all User Data
    } else {
      const createuser = createUserOnSanity(currentUserWallet)
      console.log('Created user in sanity: ', createuser);
      // Get all NFTs from user and post to sanity
      const updateNfts = getAllNfts(currentUserWallet)
      console.log('Created Nfts in sanity: ', updateNfts);
    }
  }

  return (
    <AppContext.Provider
      value={{
        isUserInDb,
        setIsUserInDb,
        isLoggedIn,
        setIsLoggedIn,
        currentUserWallet,
        setCurrentUserWallet,
        currentUser,
        setCurrentUser,
        cardsData,
        setCardsData
      }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppProvider
