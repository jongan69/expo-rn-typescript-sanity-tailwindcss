import { ALCHEMY_API_KEY } from '@env';


const getAllNfts = async (walletAddress) => {

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${ALCHEMY_API_KEY}/getNFTs/`;
  const ownerAddr = walletAddress;
  const fetchURL = `${baseURL}?owner=${ownerAddr}`;

  fetch(fetchURL, requestOptions)
    .then(response => response.json())
    .then(response => {
      console.log('# of nfts found: ', response.totalCount)
      const ownedNFTs = []
      response?.ownedNfts.forEach((item, index) => {
        const urls = [];

        // Check for URLs in NFT
        if (item.media) {
          Object.values(item.media[0]).forEach((item) => {
            const URL = item
            if (URL.indexOf("http://") === 0 || URL.indexOf("https://") === 0) {
              urls.push(URL)
            }
          })

          // Check if ENS Domain NFT found

          ownedNFTs.push({
            "name": item.metadata.name, // string of name
            "contractAddress": item.contract.address, // string of contract address
            "tokenId": item.id.tokenId, // string of token id
            "tokenBalance": item.balance, // string of token balance
            "urls": urls // array of urls
          });
        }
      })

      ownedNFTs.forEach((item, index) => {
        if (item.urls.length > 0) {
          item.urls.forEach((url) => {
            console.log(`NFT #${index} has URL ${url}`)
          })
        }
      })

      return ownedNFTs
    })
    .catch(error => console.log('error', error))
}

export default getAllNfts;