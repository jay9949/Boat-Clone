import React from "react";
import { Product, FooterBanner, HeroBanner } from "@/components";
import { client } from "../../lib/Client";

const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2 className="">Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

export async function getStaticProps() {
  const query =
    '*[_type == "product"] {name,details,price,image, "slug": slug.current}';
  const products = await client.fetch(query);

  const bannerQuery =
    '*[_type == "banner"] {smallText,midText,largeText1, image, buttonText, desc, discount,largeText1,largeText2,saleTime,smallText,product,midText}';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {
      products,
      bannerData,
    },
  };
}

export default Home;
