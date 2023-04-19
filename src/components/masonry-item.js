import React, { useState } from "react"
import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import { renderRichText } from 'gatsby-source-contentful/rich-text'
  
const MasonryItem = ({ image, title, description }) => {
    const [aspectRatio, setAspectRatio] = useState(null)

    const handleLoad = (event) => {
        const { naturalWidth, naturalHeight } = event.target
        setAspectRatio(naturalWidth / naturalHeight)
      }
    return (
        <Card sx={{mb:1}}>
            <CardMedia style={{ height: aspectRatio ? 400 / aspectRatio : null }}>
                <img
                src={image}
                alt={title}
                onLoad={handleLoad}
                style={{ height: "100%", objectFit: "cover" }}
                />
            </CardMedia>
            <CardContent>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body2">{description?.raw && renderRichText(description)}</Typography>
            </CardContent>
        </Card>
    )
}

export default MasonryItem