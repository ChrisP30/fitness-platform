/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const categories = [
    {
      name: "Fitness",
      slug: "fitness",
      type: "category",
      details: [
        { name: "Exercise Science", slug: "exercise-science" },
        { name: "Top 10", slug: "top-10" },
        { name: "Biographies", slug: "bios" },
      ],
    },
    {
      name: "Nutrition",
      slug: "nutrition",
      type: "category",
      details: [
        { name: "Diets", slug: "diets" },
        { name: "Top 10 Diets", slug: "top-10-diets" },
        { name: "Recipes", slug: "recipes" },
        { name: "Nutrition Science", slug: "nutrition-science" },
      ],
    },
    {
      name: "Reviews",
      slug: "reviews",
      type: "category",
      details: [
        { name: "Supplements", slug: "supplements" },
        { name: "Gym Equipment", slug: "gym-equipment" },
        { name: "Gear", slug: "gear" },
        { name: "Gyms", slug: "gyms" },
        { name: "Workout Reviews", slug: "workout-reviews" },
        { name: "Diet Reviews", slug: "diet-reviews" },
      ],
    },
    {
      name: "Programs",
      slug: "programs",
      type: "category",
      details: [
        { name: "Beginner Workout Plans", slug: "beginner-workout-plans" },
        {
          name: "Intermediate Workout Plans",
          slug: "intermediate-workout-plans",
        },
        { name: "Advanced Workout Plans", slug: "advanced-workout-plans" },
        { name: "Nutritional Plans", slug: "nutritional-plans" },
      ],
    },
    {
      name: "Podcast",
      slug: "podcast",
      type: "podcast",
    },
    {
      name: "Shop",
      slug: "shop",
      type: "shop",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call at initial render

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleCategoryExpansion = (slug) => {
    if (expandedCategory === slug) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(slug);
    }
  };

  return (
    <>
      <div className="container mx-auto mt-4 px-4 transition-all duration-1000">
        <nav className="bg-black bg-opacity-60 w-[25%] max-w-[150px] ml-auto h-[45px] rounded-xl border-2 border-white">
          <div className="flex justify-center items-center h-full">
            <div className="mx-3">
              <img src="/icons8-user-24.png" alt="" />
            </div>
            <div className="mx-3">
              <img src="/icons8-cart-24.png" alt="" />
            </div>
          </div>
        </nav>
      </div>
      <nav className="container mx-auto px-4 mb-8 mt-1 transition-all duration-1000">
        <div className="h-[125px] custom-bg rounded-2xl border-4 border-white">
          <div className="flex h-full justify-between">
            <div className="flex justify-center items-center ml-6">
              <Link
                onClick={() => {
                  if (menuOpen) {
                    toggleMenu();
                    toggleCategoryExpansion(null);
                  } else return;
                }}
                href={"/"}
              >
                <h1 className="text-4xl text-gray-700 transition-all duration-500 hover:text-white cursor-pointer">
                  Fitness Geek
                </h1>
              </Link>
            </div>
            <div className="flex justify-center items-center mr-6">
              {isMobile ? (
                <button
                  onClick={toggleMenu}
                  className="text-gray-700 transition-all duration-500 hover:text-white cursor-pointer"
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                </button>
              ) : (
                <ul className="flex">
                  {categories.map((item, index) => (
                    <li
                      key={index}
                      className="mx-4 text-base text-gray-700 transition-all duration-500 hover:text-white cursor-pointer relative"
                      onMouseEnter={() => setExpandedCategory(item.slug)}
                      onMouseLeave={() => setExpandedCategory(null)}
                    >
                      <Link
                        href={
                          item.type === "shop"
                            ? "/shop"
                            : item.type === "podcast"
                            ? "/podcast"
                            : `/category/${item.slug}`
                        }
                      >
                        {item.name}
                      </Link>
                      {item.details &&
                        item.details.length > 0 &&
                        expandedCategory === item.slug && (
                          <ul className="absolute top-[15px] left-0 w-[250px] bg-black bg-opacity-80 shadow-md mt-1 rounded-lg z-10">
                            {item.details.map((detail, detailIndex) => (
                              <Link
                                href={`/subcategory/${detail.slug}`}
                                key={detailIndex}
                              >
                                <li className="text-white py-1 px-1 hover:bg-white hover:text-black rounded-lg">
                                  {detail.name}
                                </li>
                              </Link>
                            ))}
                          </ul>
                        )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        {menuOpen && isMobile && (
          <div className="shadow-md rounded-lg p-2 bg-black bg-opacity-70">
            <ul>
              {categories.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <li className="text-white py-3 px-4 hover:text-white cursor-pointer flex justify-between items-center">
                    {item.details && item.details.length > 0 ? (
                      <>
                        <Link
                          href={`/category/${item.slug}`}
                          onClick={toggleMenu}
                        >
                          {item.name}
                        </Link>
                        <span
                          onClick={() => toggleCategoryExpansion(item.slug)}
                          className="text-white hover:text-black cursor-pointer px-4"
                        >
                          {expandedCategory === item.slug ? "-" : "+"}
                        </span>
                      </>
                    ) : (
                      <Link
                        onClick={toggleMenu}
                        href={
                          item.name === "Shop"
                            ? "/shop"
                            : item.name === "Podcast"
                            ? "/podcast"
                            : "/"
                        }
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                  {expandedCategory === item.slug && item.details && (
                    <ul className="bg-black bg-opacity-55 mt-2 rounded-lg">
                      {item.details.map((detail, detailIndex) => (
                        <Link
                          onClick={() => {
                            toggleMenu();
                            toggleCategoryExpansion(item.slug);
                          }}
                          href={`/subcategory/${detail.slug}`}
                          key={detailIndex}
                        >
                          <li className="text-white py-1 px-2 hover:bg-white hover:text-black">
                            {detail.name}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
