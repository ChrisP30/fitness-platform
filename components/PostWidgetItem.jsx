/* eslint-disable @next/next/no-img-element */
import "tailwindcss/tailwind.css";
import Link from "next/link";
import moment from "moment";
import { graphCMSImageLoader } from "../util";
import Image from "next/image";
const PostWidgetItem = ({ post }) => {
  return (
    <Link href={`/post/${post.slug}`}>
      <div className="border-b-white border-b-[2px] p-1 transition-all duration-500 hover:bg-white hover:text-black">
        <div className="flex items-center">
          <div className="relative w-[50px] h-[50px] rounded-full border-2 border-white">
            <Image
              loader={graphCMSImageLoader}
              src={post.featuredImage.url}
              alt={post.title} // Providing a meaningful alt attribute
              layout="fill" // Ensures the image covers the area without stretching
              className="rounded-full object-fill" // Applying rounding to the Image component
            />
          </div>
          <div className="w-[75%]">
            <h4 className="ml-3 text-xs">
              {moment(post.createdAt).format("MM-DD-YYYY")}
            </h4>
            <h4 className="ml-3 text-sm">{post.title}</h4>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostWidgetItem;
