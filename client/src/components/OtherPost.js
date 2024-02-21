import React from 'react'
import {format} from 'date-fns'

const OtherPost = ({title,summary,cover,content,createdAt,author}) => {
  return (
    <div className="post">
          <div className="image">
          <img src="images\image1.jpg" alt="" />
          </div>
        <div className="text">
          <h2>{title}</h2>
          <p className="info">
            <a href="#" className="author">{author.username}</a>
            <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
          </p>
          <p className="summary">{summary}</p>
        </div>
         
        </div>
  )
}

export default OtherPost