import React from "react";
import Image from "next/image";
import { graphCMSImageLoader } from "../util";

const Author = ({ author }) => {
  return (
    <div className="flex mt-20 mx-auto relative w-full min-h-[200px] shadow-lg bg-black bg-opacity-40 my-[20px] rounded-xl transition-transform duration-1000 hover:scale-[1.02] border-white border-4">
      <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-[65px] h-[65px] rounded-full border-white border-4 shadow-2xl overflow-hidden">
        <Image
          loader={graphCMSImageLoader}
          src={author.photo.url}
          alt={author.name}
          layout="fill"
        />
      </div>
      <div className="flex flex-col mx-auto">
        <div className="mt-10 flex mx-auto px-10">
          <p className="text-white text-2xl">{author.name}</p>
        </div>
        <div className="mt-10 flex mx-auto px-10">
          <p className="text-white text-lg">{author.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default Author;
