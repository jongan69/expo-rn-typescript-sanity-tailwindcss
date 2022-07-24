import React, { createContext, ReactElement, useEffect, useState } from "react";
import createUserOnSanity from '../lib/createUser';
import getAllNfts from '../lib/getAllNfts';
import getUsersInfo from "../lib/getUsersInfo";

export const AppContext = createContext({});

export const AppProvider = (props: { children: ReactElement }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserWallet, setCurrentUserWallet] = useState<string>();
  const [cardsData, setCardsData] = useState([]);
  const [currentUserData, setCurrentUserData] = useState();
  const [isUserInDb, setIsUserInDb] = useState(true);


  useEffect(() => {
    console.log('The Current User Wallet was updated!')
    console.log('Current User Wallet: ', currentUserWallet)
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
      setIsLoggedIn(true)
      setIsUserInDb(true);
      // Fetch all User Data
      const userDataResponse = await getUsersInfo(currentUserWallet);
      console.log('Current user data in sanity: ', userDataResponse);
      setCurrentUserData(userDataResponse);
    } else {
      // Create User in sanity
      const createuser = await createUserOnSanity(currentUserWallet);
      console.log('Created user in sanity: ', createuser);
      // Get all NFTs from user and post to sanity
      const updateNfts = await getAllNfts(currentUserWallet);
      console.log('Created Nfts in sanity: ', updateNfts);
    }
  }


  // Retrieve all but current User Profile
  // const getCardData = async (currentUserWallet) => {

  // }


  // Add User to Array of liked
  // const handleRightSwipe = async() = {

  // }


  // Add User to array of disliked (keep local)
  // const handleLeftSwipe = async() = {

  // }

  return (
    <AppContext.Provider
      value={{
        isUserInDb,
        setIsUserInDb,
        isLoggedIn,
        setIsLoggedIn,
        currentUserWallet,
        setCurrentUserWallet,
        currentUserData,
        setCurrentUserData,
        cardsData,
        setCardsData
      }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppProvider
