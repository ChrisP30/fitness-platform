// _app.js
import "tailwindcss/tailwind.css";
import "../styles/globals.scss";
import Layout from "@/components/Layout";
import React from 'react'

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
