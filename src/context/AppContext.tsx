import React, { createContext, ReactElement, useEffect, useState } from "react";
import createUserOnSanity from '../lib/createUser';
import fetchCurrentUserData from '../lib/fetchCurrentUserData';
import getAllNfts from '../lib/getAllNfts';
import getUsersInfo from "../lib/getUsersInfo";

export const AppContext = createContext({});

export const AppProvider = (props: { children: ReactElement }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserWallet, setCurrentUserWallet] = useState<string>();
  const [cardsData, setCardsData] = useState([]);
  const [currentUserData, setCurrentUserData] = useState([]);

  useEffect(() => {
    console.log('The Current User Wallet was updated!: ', currentUserWallet)
    setIsLoggedIn(true);
    checkUserInsanity(currentUserWallet);
  }, [currentUserWallet])


  useEffect(() => {
    const currentUserDataResponse = fetchCurrentUserData(currentUserWallet);
    setCurrentUserData(currentUserDataResponse);
  }, [])


  // Check if the user is in our database, if not add them and add their Nfts
  const checkUserInsanity = async (currentUserWallet: string | undefined) => {
    const checkuser = await fetchCurrentUserData(currentUserWallet);
    if (checkuser) {
      console.log('found user in sanity: ', checkuser);
      // Fetch all User Data
      const currentUserDataResponse = await fetchCurrentUserData(currentUserWallet);
      setCurrentUserData(currentUserDataResponse);
      await getCardData(currentUserWallet);
    } else {
      // Else Create User in sanity
      const createuser = await createUserOnSanity(currentUserWallet);
      console.log('Created user in sanity: ', createuser);
      // Get all NFTs from user and post to sanity
      const updateNfts = await getAllNfts(currentUserWallet);
      console.log('Created Nfts in sanity: ', updateNfts);
    }
  }


  // Retrieve all but current User Profile and set state for cards
  const getCardData = async (currentUserWallet: string) => {
    const userDataResponse = await getUsersInfo(currentUserWallet);
    setCardsData(userDataResponse);
  }


  // Add User to Array of liked
  // const handleRightSwipe = async() = {

  // }


  // Add User to array of disliked (keep local)
  // const handleLeftSwipe = async() = {

  // }

  return (
    <AppContext.Provider
      value={{
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
