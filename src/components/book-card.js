import React from 'react'
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

import Container from './container'
import Tags from './tags'
import * as styles from './book-card.module.css'

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
                {post.title}
              </Typography>
              <Typography gutterBottom variant="p" component="div">
                This book was a great read, I enjoyed the opening chapter very much.
              </Typography>
              <StarIcon/><StarIcon/><StarIcon/>
              <Tags tags={post.tags} />
            </CardContent>
          </Card>
        )
      })}
    </Container>
  )
}

export default BookCard
