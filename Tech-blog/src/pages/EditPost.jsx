import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/configService'
import {Container, PostForm} from '../components/index'

const EditPost = () => {

    const [post, setPost]= useState(null)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(id){
          appwriteService.getPost(id).then((post)=>{
             if(post){
              setPost(post)
             }
          })
        }else{
          navigate('/')
        }
    },[])

    

  return post? (
    <div className='py-8 '>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null
}

export default EditPost