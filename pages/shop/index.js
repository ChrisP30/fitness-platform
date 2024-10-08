import Head from "next/head";
import React, { useEffect, useState } from "react";
import Products from "@/components/Products";
import ShopSideNav from "@/components/ShopSideNav";
import Welcome from "@/components/Welcome";

const ShopHome = () => {
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentSubcategory, setCurrentSubcategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const handleCategoryClick = (slug) => {
    setCurrentCategory(slug);
    setCurrentSubcategory(null);
    setError(null);
  };

  const handleSubcategoryClick = (slug) => {
    setCurrentSubcategory(slug);
    setError(null);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      let url = "/api/productsServices/getProductsByCategory";
      let slug = currentCategory;

      if (currentSubcategory) {
        url = "/api/productsServices/getProductsBySubcategory";
        slug = currentSubcategory;
      }

      try {
        const response = await fetch(`${url}?slug=${encodeURIComponent(slug)}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
        setProducts([]);
      }
    };

    if (currentCategory || currentSubcategory) {
      fetchProducts();
    }
  }, [currentCategory, currentSubcategory]);

  const ShopCategories = [
    {
      name: "Supplements",
      slug: "supplements",
      subcategory: [
        { name: "Protein", slug: "protein" },
        { name: "Pre-Workout", slug: "pre-workout" },
        { name: "Vitamins & Wellness", slug: "vitamins-wellness" },
        { name: "Post-Workout", slug: "post-workout" },
        { name: "Nootropics", slug: "nootropics" },
      ],
    },
    {
      name: "Wearables",
      slug: "wearables",
      subcategory: [
        { name: "Fitbit", slug: "fitbit" },
        { name: "Google Watches", slug: "google-watches" },
        { name: "Samsung Watches", slug: "samsung-watch" },
        { name: "Apple Watches", slug: "apple-watch" },
      ],
    },
    {
      name: "Equipment",
      slug: "equipment",
      subcategory: [
        { name: "Treadmills", slug: "treadmills" },
        { name: "Benches", slug: "benches" },
        { name: "Weights & Dumbbells", slug: "weights-dumbbells" },
        { name: "Bikes", slug: "bikes" },
        { name: "Weight Lifting Bars", slug: "lifting-bars" },
      ],
    },
    {
      name: "Apparel",
      slug: "apparel",
      subcategory: [
        { name: "T-Shirts", slug: "t-shirts" },
        { name: "Hoodies", slug: "hoodies" },
        { name: "Shorts", slug: "shorts" },
        { name: "Hats", slug: "hats" },
        { name: "Gloves", slug: "gloves" },
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>Shop Home</title>
      </Head>
      <div className="container mx-auto px-2 mb-8 flex transition-all duration-700 ease-in-out">
        <div className="lg:w-1/4 w-full md:w-1/2 transition-all mr-4 duration-1000 ease-in-out">
          <ShopSideNav
            shopCategories={ShopCategories}
            setSelectedCategory={handleCategoryClick}
            setSelectedSubCategory={handleSubcategoryClick}
          />
        </div>
        <div className="lg:w-3/4 w-full transition-all duration-700 ease-in-out">
          {error && <div className="error">{error}</div>}
          <div
            className={`grid ${
              products.length > 0
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            } gap-4 transition-all duration-1000 ease-in-out`}
          >
            {products.length > 0
              ? products.map((item) => <Products key={item.id} item={item} />)
              : !error && <Welcome />}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopHome;
