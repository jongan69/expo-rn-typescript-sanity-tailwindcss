import React, { createContext, ReactElement, useEffect, useState } from "react";
import checkMatches from "../lib/checkMatches";
import createUserOnSanity from '../lib/createUser';
import fetchCurrentUserData from '../lib/fetchCurrentUserData';
import getAllNfts from '../lib/getAllNfts';
import getUsersInfo from "../lib/getUsersInfo";
import saveLike from "../lib/saveLike";
import saveMatch from "../lib/saveMatch";

export const AppContext = createContext({});

export const AppProvider = (props: { children: ReactElement }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserWallet, setCurrentUserWallet] = useState<string>();
  const [cardsData, setCardsData] = useState([]);
  const [currentUserData, setCurrentUserData] = useState([]);

  useEffect(() => {
    if (currentUserWallet !== undefined) {
      console.log('The Current User Wallet was updated!: ', currentUserWallet)
      setIsLoggedIn(true);
      checkUserInsanity(currentUserWallet);
    }
  }, [currentUserWallet])


  // useEffect(() => {
  //   const currentUserDataResponse = fetchCurrentUserData(currentUserWallet);
  //   setCurrentUserData(currentUserDataResponse);
  //   updateUser(currentUserWallet)
  // }, [])


  // Check if the user is in our database, if not add them and add their Nfts
  const checkUserInsanity = async (currentUserWallet: string) => {
    const checkuser = await fetchCurrentUserData(currentUserWallet);
    if (checkuser.length > 0) {
      console.log('found user in sanity: ', checkuser);
      // Fetch all User Data
      setCurrentUserData(checkuser);
      await getCardData(currentUserWallet);
    } else {
      // Else Create User in sanity
      const createuser = await createUserOnSanity(currentUserWallet);
      console.log('Created user in sanity: ', createuser);
      // Get all NFTs from user and post to sanity
      const updateNfts = await getAllNfts(currentUserWallet);
      console.log('Created Nfts in sanity: ', updateNfts);
      updateUser(currentUserWallet)
      await getCardData(currentUserWallet);
    }
  }

  const updateUser = async (currentUserWallet: string) => {
    const update = await fetchCurrentUserData(currentUserWallet)
    setCurrentUserData(update);
  }


  // Retrieve all but current User Profile and set state for cards
  const getCardData = async (currentUserWallet: string) => {
    const userDataResponse = await getUsersInfo(currentUserWallet);
    setCardsData(userDataResponse);
  }


  // Add User to Array of liked
  const handleRightSwipe = async (currentUserWallet, likedUserAddress) => {
    await saveLike(currentUserWallet, likedUserAddress)
    console.log(`saving like between ${currentUserWallet} and ${likedUserAddress}:`)
    const check = await checkMatches(currentUserWallet, likedUserAddress)
    console.log('Match result: ', check)
    if (check === true) {
      saveMatch(currentUserWallet, likedUserAddress)
      console.log('Match was found and saved')
    }
  }


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
        setCardsData,
        handleRightSwipe
      }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppProvider
