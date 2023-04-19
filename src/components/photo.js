import React from 'react'
import { useState } from "react";
import { FormControl, FormHelperText, Button, Card, CardContent, CardMedia, Chip, Rating, Typography, useMediaQuery, Select, MenuItem  } from "@mui/material";
import { useTheme } from '@mui/material/styles'
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { renderRichText } from 'gatsby-source-contentful/rich-text'

import Container from './container'
import MasonryLayout from "./masonry-layout"

import Tags from './tags'
import * as styles from './book-card.module.css'

/*
<Card key={post.slug} sx={{ display: "flex", mb: 2 }}>
            <CardContent>
              <CardMedia component="img" image={post.photoImage.publicUrl} alt={post.title} sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: 300 ,mb:2,objectFit:"contain" }} />
              {isMobile ?(
                <>
                <Typography gutterBottom variant="h5" component="div">
                  {post.title} 
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {post.location}
                  </Typography>
                </>
                ) : (
                <Typography gutterBottom variant="h5" component="div">
                  {post.title} - {post.location}
                </Typography>
                )
              }
              <Typography gutterBottom variant="subtitle2" component="div">
                {post.shootDate} 
              </Typography>
              
              <Typography gutterBottom variant="p" component="div">
                {post.description?.raw && renderRichText(post.description)}
              </Typography>

              <Typography gutterBottom variant="p" component="div">
                {post.photoNotes?.photoNotes}
              </Typography>
              
              <div>
                <div>
                {post.aspect && <Chip label={post.aspect} size="small" sx={{mr:1}}/>}
                {post.colour && <Chip label={post.colour} size="small" />}
                </div>
              </div>
            </CardContent>
          </Card>
        )

{posts.map((post) => {
               
          return(<MasonryLayout posts={posts} />)
        })}
        */

const Photo = ({ posts, type }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!posts) return null
  if (!Array.isArray(posts)) return null
  return (
    <Container >
    <MasonryLayout posts={posts} />
    </Container>
  )
}
export default Photo
