/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import Link from "next/link";
const Podcast = ( { podcast } ) => {
  return (
    <div className="custom-dashboard-item w-[90%] mx-auto">
      <div className="w-[85%] h-[350px] mx-auto flex justify-center items-center mt-4">
        <img src={podcast.image.url} alt={podcast.title} className="w-full h-full object-cover border-2 border-white"/>
      </div>
      <div className="w-[85%] mx-auto mb-5">
        <h2 className="text-white text-sm md:text-md font-bold">{moment(podcast.createdAt).format("MMM DD, YYYY")}</h2>
      </div>
      <div className="w-[85%] mx-auto pb-5">
        <h3 className="text-white text-lg md:text-xl font-bold">{podcast.title}</h3>
      </div>
      <div className=" w-[100%] mx-auto flex justify-center items-center mb-3">
          <Link href={`/podcast/${podcast.slug}`}>
            <button className="bg-orange-600 w-[150px] h-[35px] rounded-lg border-2 border-white">
              Listen Now
            </button>
          </Link>
      </div>
    </div>
  )
}

export default Podcast;