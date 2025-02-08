import React from 'react'
import { useState } from "react";
import { FormControl, FormHelperText, Button, Card, CardContent, CardMedia, Chip, Rating, Typography, useMediaQuery, Select, MenuItem  } from "@mui/material";
import { useTheme } from '@mui/material/styles'
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(0);

  if (!posts) return null
  if (!Array.isArray(posts)) return null

  const resetFilter = () => {
    console.log(selectedMonth)
    console.log(selectedYear)
    console.log(selectedRating)
    setSelectedRating(null)
    setSelectedMonth(0)
    setSelectedYear(0)
  }

  const months = [
    { value: 0, label: 'All Months' },
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  const years = [
    { value: 0, label: 'All Years' },
    { value: 2021, label: '2021' },
    { value: 2022, label: '2022' },
    { value: 2023, label: '2023' },
    { value: 2024, label: '2024' },
    { value: 2025, label: '2025' }
  ];

  // Filter the posts based on the rating (when selected)
  const filteredPosts = posts.filter((post) => {
    // Get month and year from publishDate
    const myDateArray = post.publishDate.split(",")
    const year = Number(myDateArray[1].trim())
    const monthArray = myDateArray[0].split(" ")

    console.log("Month:"+monthArray[0])
    console.log("Year:"+year)

    const monthNumber = new Date(Date.parse(monthArray[0] + ' 1, 2023')).getMonth();
    console.log("Month number:"+monthNumber)

    if (selectedRating && post.rating !== selectedRating) return false

    if (selectedMonth) {      
      console.log("Selected Month:"+selectedMonth)

      if (selectedMonth !== monthNumber+1) {
        return false
      }
    }

    if (selectedYear) {
      console.log("Selected Year:"+selectedYear)

      if (selectedYear !== year) {
        return false
      }
    }

    return true

  });

  return (
    <Container>

    <div style={isMobile ? { display: 'flex', flexDirection: 'column' } : { display: 'flex', marginBottom: '1rem' }}>
      <div>
      <FormControl sx={{ m: 1}}>
        <Rating size="large" sx={{ minHeight:40}} name="filter-rating" value={selectedRating} onChange={(event, newValue) => setSelectedRating(newValue)} />
        <FormHelperText>Filter by Rating</FormHelperText>
      </FormControl>
      </div>
      
      <div>
        <FormControl sx={{ m: 1 }}>
        <Select size="small" value={selectedMonth} onChange={(event) => setSelectedMonth(Number(event.target.value))}>
          {months.map((month) => (
            <MenuItem key={month.value} value={month.value}>
              {month.label}            
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Filter by Month</FormHelperText>
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ m: 1 }}>
        <Select size="small" value={selectedYear} onChange={(event) => setSelectedYear(Number(event.target.value))}>
          {years.map((year) => (
            <MenuItem key={year.value} value={year.value}>
              {year.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Filter by Year</FormHelperText>
        </FormControl>
      </div>
      
      <div style={isMobile ? {} : { marginLeft: 'auto' }}>
      <FormControl sx={{ m: 1}}>
        <Button size='medium' variant="outlined" onClick={resetFilter}>Reset</Button>
        <FormHelperText sx={{mt:1}}>Reset Filters</FormHelperText>
        </FormControl>
      </div>
    </div>  
      

      {filteredPosts.map((post) => {
               
          return(
          <Card key={post.slug} sx={{ display: "flex", mb: 2 }}>
            {!isMobile && (
            <CardContent>
              <CardMedia component="img" image={post.heroImage.publicUrl} alt={post.title} sx={{ width: 200 }} />
            </CardContent>
            )}
            <CardContent>
              {isMobile && (
                <CardMedia component="img" image={post.heroImage.publicUrl} alt={post.title} sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%",mb:2 }} />
              )}
              {isMobile ?(
                <>
                <Typography gutterBottom variant="h5" component="div">
                  {post.title} 
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {post.bookAuthor}
                  </Typography>
                </>
                ) : (
                <Typography gutterBottom variant="h5" component="div">
                  {post.title} - {post.bookAuthor}
                </Typography>
                )
              }
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
                <div>
                  {post.genre && <Chip label={post.genre} size="small" />}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </Container>
  )
}
export default BookCard
