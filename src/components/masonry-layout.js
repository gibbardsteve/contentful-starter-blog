import React from "react"
import Masonry from '@mui/lab/Masonry'
import MasonryItem from "./masonry-item"


const MasonryLayout = ({posts}) => {
    

  return (
    <Masonry
      columns={{ xs: 1, sm: 2, md: 3 }}
      spacing={2}
    >
      {posts.map((post) => (
        <MasonryItem
          key={post.id}
          image={post.photoImage.publicUrl}
          title={post.title}
          description={post.description}
        />
      ))}
    </Masonry>
  )
}

export default MasonryLayout
