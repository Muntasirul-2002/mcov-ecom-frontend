import React from "react";
import { Helmet } from "react-helmet";
import HeaderNav from "./HeaderNav";
import Footer from "./Footer";
import {Toaster} from 'react-hot-toast' 

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <title>{title}</title>
        </Helmet>
        <HeaderNav />
        <main>
          <Toaster />
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};
Layout.defaultProps = {
  title: "Mcov.",
  description:
    "Mcov. is a ecommerce platform where you can buy beautiful and attractive phone covers.",
  keywords: "phone cover, mobile cover, back cover, iphone backcover",
  author: "Muntasirul Islam",
};

export default Layout;
