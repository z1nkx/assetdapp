import {
  useContractMetadata,
  useActiveClaimCondition,
  useNFT,
  Web3Button,
  useContract,
} from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import { useState } from "react";
import type { NextPage } from "next";
import styles from "../styles/Theme.module.css";

// Put Your Edition Drop Contract address from the dashboard here
const myEditionDropContractAddress =
  "0xbAB5bF866924478130A0636CB83d36c8196F4617";

// Put your token ID here


const Home: NextPage = () => {
  const { contract: editionDrop } = useContract(myEditionDropContractAddress);

  // The amount the user claims, updates when they type a value into the input field.
  // default to 1

  const [tokenId, setTokenId] = useState<number>(1)

  // Load contract metadata
  const { data: contractMetadata } = useContractMetadata(editionDrop);

  // Load the NFT metadata
  const { data: nftMetadata } = useNFT(editionDrop, tokenId);

  // Load the active claim condition
  const { data: activeClaimCondition } = useActiveClaimCondition(
    editionDrop,
    BigNumber.from(tokenId)
  );

  // Loading state while we fetch the metadata
  if (!editionDrop || !contractMetadata) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.mintInfoContainer}>
        <div className={styles.infoSide}>
          {/* Title of your NFT Collection */}
          <h1>{contractMetadata?.name}</h1>
          {/* Description of your NFT Collection */}
          <p className={styles.description}>{contractMetadata?.description}</p>
        </div>

        <div className={styles.imageSide}>
          {/* Image Preview of NFTs */}
          <img
            className={styles.image}
            src={nftMetadata?.metadata?.image || ""}
            alt={`${nftMetadata?.metadata?.name} preview image`}
          />

          {/* Amount claimed so far */}
          <div className={styles.mintCompletionArea}>
            <div className={styles.mintAreaLeft}>
              <p>Total Minted</p>
            </div>
            <div className={styles.mintAreaRight}>
              {activeClaimCondition ? (
                <p>
                  {/* Claimed supply so far */}
                  <b>{activeClaimCondition.currentMintSupply}</b>
                  {" / "}
                  {activeClaimCondition.maxClaimableSupply}
                </p>
              ) : (
                // Show loading state if we're still loading the supply
                <p>Loading...</p>
              )}
            </div>
          </div>

          {/* Show claim button or connect wallet button */}
          <>
            <p>Select NFT - 200GZ1</p>
            <div className={styles.quantityContainer}>
              <button
                className={`${styles.quantityControlButton}`}
                onClick={() => setTokenId(tokenId - 1)}
                disabled={tokenId <= 1}
              >
                -
              </button>

              <h4>{tokenId}</h4>


              <button
                className={`${styles.quantityControlButton}`}
                onClick={() => setTokenId(tokenId + 1)}
                disabled={tokenId === 1}
              >
                +
              </button>
            </div>
            <div className={styles.mintContainer}>
              <Web3Button
                contractAddress={myEditionDropContractAddress}
                action={async (contract) =>
                  await contract.erc1155.claim(tokenId, 1)
                }
                // If the function is successful, we can do something here.
                onSuccess={(result) => alert("Claimed!")}
                // If the function fails, we can do something here.
                onError={(error) => alert(error?.message)}
                accentColor="#41b9ff"
                colorMode="dark"
              >
                Mint 200GZ1
              </Web3Button>
            </div>
          </>
        </div>
      </div>
      {/* Powered by thirdweb */}{" "}
      
    </div>
  );
};

export default Home;
