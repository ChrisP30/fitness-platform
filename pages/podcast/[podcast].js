/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { getPodcastDetails } from '../../services'
const Podcast = ({ podcastDetails }) => {
  console.log("Podcast Details:", podcastDetails);
  const renderElement = (element, index) => {
    console.log(element);
    switch (element.type) {
        case 'paragraph':
            return <p key={index} className="text-white text-sm lg:text-base my-5 p-5">{element.children.map((child, index) => child.text)}</p>;
        case 'image':
            return <img key={index} src={element.url} alt={element.alt || 'Image'} />;
        case 'iframe':
            return <iframe className='w-full h-[400px] border-2 border-white rounded-lg' key={index} src={element.url} alt={element.alt || 'Image'} />;
        // Add more cases as needed for other element types
        default:
            return null; // or some default rendering
    }
};
  return (
    <div className='custom-dashboard-item w-[95%] h-[100%] mx-auto'>
      <div className='w-[90%] h-[100%] mx-auto pt-6'>
        <h2 className='text-white text-2xl font-bold'>{podcastDetails.title}</h2>
      </div>
      <div className='w-[90%] h-[100%] mx-auto '>
        {podcastDetails.content.raw.children.map((element, index) => renderElement(element, index))}
      </div>
    </div>
  )
}

export default Podcast

export async function getServerSideProps(context) {
  const { params } = context;
  const { podcast: slug } = params;
  console.log("Fetching podcast details for slug:", slug);

  try {
    const podcastDetails = await getPodcastDetails(slug);
    return {
      props: {
        podcastDetails,
      },
    };
  } catch (error) {
    console.error("Failed to fetch podcast details:", error);
    return {
      props: {
        error: "Failed to fetch podcast details",
      },
    };
  }
}