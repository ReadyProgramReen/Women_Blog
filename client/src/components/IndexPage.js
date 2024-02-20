import React, { useEffect, useState } from 'react'
import MainPost from './MainPost'
import OtherPost from './OtherPost'

const IndexPage = () => {
  const [posts , setPosts] = useState([])
  useEffect(()=>{
    fetch('http://localhost:4000/post').then(res=>{
res.json().then(posts=>{
setPosts(posts)
});
  });
  },[])
  return (
<>
  <MainPost/>

  {posts.length > 0 && posts.map(post =>(
    <OtherPost{...post}/>
  ))}
  {/* <OtherPost/>
  <OtherPost/>
  <OtherPost/> */}
  
 </>

  )
}

export default IndexPage