/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

const ShopSideNav = ({
  shopCategories,
  setSelectedCategory,
  setSelectedSubCategory,
}) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategoryExpansion = (name) => {
    if (expandedCategory === name) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(name);
    }
  };

  const handleCategoryClick = (name, slug) => {
    toggleCategoryExpansion(name);
    setSelectedCategory(slug);
  };

  const handleSubCategoryClick = (slug) => {
    setSelectedSubCategory(slug);
  };

  return (
    <div className="sticky top-10 h-[90vh] custom-dashboard-item border-4 border-white">
      {shopCategories.map((item, key) => {
        return (
          <div key={key}>
            <div
              className="flex h-[30px] w-full items-center ml-4 my-3"
              onClick={() => handleCategoryClick(item.name, item.slug)}
            >
              <label
                htmlFor="shop-categories"
                id="shopcategories"
                className="text-white text-xl"
              >
                {item.name}
              </label>
              <img
                src="/ArrowDown.png"
                alt=""
                className="w-[20px] h-[20px] ml-1"
              />
            </div>
            {expandedCategory === item.name && (
              <ul className="custom-dashboard border-y-2 border-white">
                {item.subcategory.map((item, key) => {
                  return (
                    <li
                      key={key}
                      className="text-white transition-all duration-300 ease-in-out hover:text-black hover:bg-white"
                      onClick={() => handleSubCategoryClick(item.slug)}
                    >
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ShopSideNav;
