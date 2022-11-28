import Head from "next/head";
import { Toaster } from "react-hot-toast";
import Layout from "../components/Layout/Layout";
import CartContextProvider from "../store/CartContextProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <CartContextProvider>
      <Layout>
        <Head>
          <title>MS Headphones Store</title>
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          <meta
            name="description"
            content="Buy Headphone, Speaker from number one selling store"
          />
        </Head>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </CartContextProvider>
  );
}

export default MyApp;
