/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import moment from "moment";

const CategoryPostCard = ({post}) => {
  return (
    <Link href={`/post/${post.slug}`}>
        <div className='w-[95%] min-h-[250px] sm:h-[250px] py-3 border-2 border-gray-700 mx-auto my-3 shadow-lg transition-all duration-200 hover:bg-black hover:bg-opacity-80 hover:text-white bg-black bg-opacity-60 rounded-2xl'>
            <div className='flex w-full h-full'>
                <div className='w-[40%] h-[225px] md:h-[100%] relative ml-4 border-4 border-white object-cover'>
                    <img src={post.featuredImage.url} alt="" className='absolute w-full h-full object-cover'/>
                </div>
                <div className='px-4 w-[50%]'>
                    <div className='py-3'>
                        <h3 className='text-white custom-shadow'>{post.title}</h3>
                    </div>
                    <div>
                        <p className='text-xs text-white custom-shadow'>{post.excerpt}</p>
                    </div>
                    <div className='flex justify-start items-center mt-2 py-2'>
                        <div className='relative w-[25px] h-[25px] rounded-full mr-1'>
                            <img src={post.author.photo.url} alt="" className='absolute w-full h-full rounded-full'/>
                        </div>
                        <h3 className='text-xs text-white custom-shadow'>{post.author.name}</h3>
                    </div>
                    <div>
                        <p className='text-xs text-white custom-shadow'>🗓️ {moment(post.createdAt).format("MM-DD-YYYY")}</p>
                    </div>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default CategoryPostCard