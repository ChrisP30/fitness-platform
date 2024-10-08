import React from 'react'
import { getPodcasts } from '../../services';
import Podcast from '../../components/Podcast';
const PodcastHome = ({ podcasts }) => {
  console.log(podcasts);
  return (
    <div>
      <div className='flex justify-center items-center p-5 custom-dashboard-item w-[85%] mx-auto'>
        <h1 className='text-white text-xl md:text-3xl font-bold'>Welcome to the Fitness Geek Podcast</h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
        {podcasts.map((podcast, index) => (
          <Podcast key={index} podcast={podcast.node} />
        ))}
      </div>
    </div>
  )
}

export default PodcastHome

export async function getStaticProps() {
  try {
    const podcasts = await getPodcasts();
    return {
      props: {
        podcasts,
      },
    };
  } catch (error) {
    console.error("Failed to fetch podcasts:", error);
    return {
      props: {
        podcasts: [],
      },
      revalidate: 60, // Attempt to regenerate the page after 60 seconds
    };
  }
}