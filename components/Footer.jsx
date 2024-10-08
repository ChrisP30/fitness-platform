/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

const Footer = () => {
  const footerSide1 = [
    { name: "About Us", slug: "about" },
    { name: "Careers", slug: "careers" },
    { name: "FAQs", slug: "faq" },
    { name: "Contact Us", slug: "contact" },
  ];

  const footerSide2 = [
    { name: "Shop", slug: "shop" },
    { name: "Podcast", slug: "podcast" },
    { name: "Fitness", slug: "category/fitness" },
    { name: "Nutrition", slug: "category/nutrition" },
  ];

  return (
    <>
      <div className="flex justify-between custom-bg w-full h-[100px] mt-20 border-t-2 border-white">
        <div className="flex items-center h-full ml-8 w-[35%]">
          <Link href={'/'}>
            <h2 className="text-base md:text-3xl">Fitness Geek</h2>
          </Link>
        </div>
        <div className="flex flex-row items-center mr-3">
          <div className="mr-5">
            <h4 className="text-white text-xs">Connect With Us</h4>
          </div>
          <div className="mx-2">
            <img
              src="/icons8-facebook-48.png"
              alt=""
              className="w-[30px] h-[30px]"
            />
          </div>
          <div className="mx-2">
            <img
              src="/icons8-instagram-48.png"
              alt=""
              className="w-[30px] h-[30px]"
            />
          </div>
          <div className="mx-2">
            <img
              src="/icons8-twitterx-50.png"
              alt=""
              className="w-[30px] h-[30px]"
            />
          </div>
          <div className="mx-2">
            <img
              src="/icons8-youtube-48.png"
              alt=""
              className="w-[30px] h-[30px]"
            />
          </div>
        </div>
      </div>
      <div className="bg-black w-[100%] h-[550px] lg:h-[500px] bg-opacity-80 text-white border-t-2 border-t-white">
        <div className="w-[70%] flex flex-col mx-auto">
          <h4 className="mx-auto text-lg md:text-2xl my-4">
            Join Are Email List For Latest News
          </h4>
          <div className="flex items-center mx-auto w-[100%]">
            <input
              type="text"
              className="h-[40px] flex-grow rounded-bl-lg rounded-tl-lg pl-2"
              placeholder="Your Email"
            />
            <button className="bg-orange-500 hover:bg-orange-700 text-black text-sx h-[42px] py-2 px-4 border border-orange-700 rounded-br-lg rounded-tr-lg">
              Add Me
            </button>
          </div>
        </div>
        <div className="flex justify-center h-[150px] items-center mx-auto mt-[20px]">
          <div className="p-8 md:p-10 md:mx-4 lg:p-14 lg:mx-6">
            <ul>
              {footerSide1.map((items, index) => (
                <Link key={index} href={`/${items.slug}`}>
                  <li className="hover:text-orange-600 h-[30px]">
                    {items.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div className="p-8 md:p-10 md:mx-4 lg:p-14 lg:mx-6">
            <ul>
              {footerSide2.map((items, index) => (
                <Link key={index} href={`/${items.slug}`}>
                  <li className="hover:text-orange-600 h-[30px]">
                    {items.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        <div className="py-10 px-20">
          <p className="text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            auctor dolor in nisi facilisis, sed facilisis nibh tincidunt. Etiam
            volutpat, arcu in tristique interdum, ligula nulla aliquam nisi,
            eget consequat augue lacus non risus. Vivamus pharetra, erat vel
            pellentesque porttitor, sapien urna bibendum nunc, a blandit orci
            nunc non ante.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
