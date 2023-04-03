import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Head from "next/head";
import ThirdwebGuideFooter from "../components/GitHubLink";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Polygon;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <Head>
        <title>Z1 WEARABLES</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Z1 minting dapp for 3D assets. Assets can be loadable to metaverse AR/VR gallery applications directly from NFT. 
          These NFTs are mintable with Z1 token and are collectables of Z1nkx's creations on his journey thru this space. 
          These may come with added utility."
        />
        <meta
          name="keywords"
          content="Thirdweb, thirdweb Edition drop, how to make thirdweb nft drop, how to make nft collection thirdweb"
        />
      </Head>
      <Component {...pageProps} />
      
    </ThirdwebProvider>
  );
}

export default MyApp;
