import React from 'react'
import { Card, CardContent, CardMedia, Chip, Rating, Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { renderRichText } from 'gatsby-source-contentful/rich-text'

import Container from './container'
import Tags from './tags'
import * as styles from './book-card.module.css'

const MAXRATING = 5

/* Read the ratings element and render a star for each */
const getRatings = rating => {
  let stars = [];
  for (let index = 0; index<rating; index++)
  {
    stars.push(<StarIcon/>)
  }

  console.log("Array length"+stars.length)
  
  if(stars.length <= MAXRATING)
  {
    stars.push(<StarBorderOutlinedIcon/>)
  } 
  console.log("Rating"+rating)
  console.log(stars)
  return(stars)
}

//<StarIcon/><StarIcon/><StarIcon/>

const BookCard = ({ posts, type }) => {
  if (!posts) return null
  if (!Array.isArray(posts)) return null

  return (
    <Container>
      {posts.map((post) => {
        return(
          <Card key={post.slug} sx={{ display: "flex", mb: 2 }}>
            <CardContent>
              <CardMedia component="img" image={post.heroImage.publicUrl} alt={post.title} sx={{ width: 200 }} />
            </CardContent>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {post.title} - {post.bookAuthor}
              </Typography>
              <Typography gutterBottom variant="subtitle2" component="div">
                {post.publishDate} 
              </Typography>

              <Typography gutterBottom variant="p" component="div">
                {post.description?.raw && renderRichText(post.description)}
              </Typography>
              
              <Typography gutterBottom variant="p" component="div">
                {post.body?.raw && renderRichText(post.body)}
              </Typography>
              <div>
                <Rating name="read-only" value={post.rating} readOnly sx={{color:'black'}}/>            
                <div>{post.genre ? <Chip label={post.genre} size="small" /> : null}</div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </Container>
  )
}

export default BookCard
