import React, { useEffect, useState } from 'react'
import {Container, PostCard} from "../components/index"
import appwriteService from '../appwrite/configService'

const AllPost = () => {

    const [posts, setPosts] = useState([])

    useEffect(()=>{
        appwriteService.getPosts([]).then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    }, [])



  return (
    <div className=''>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post)=>(
                <div className='p-2 w-1/4' key={post.$id}>
                    {posts.map((post)=>(
                <div className='p-2 w-1/4' key={post.$id}>
                    <PostCard {...post} />
                </div>
            ))}
                </div>
            ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPost