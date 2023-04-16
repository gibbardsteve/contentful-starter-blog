import React from 'react'
import { graphql } from 'gatsby'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import BookCard from '../components/book-card'

const BookscardsIndex = (props) => {
  const posts = props.data.allContentfulBookPost.nodes

  return(
    <Layout location={props.location}>
        <Seo title="Reading List" />
        <Hero title="Reading List" />
        <BookCard posts={posts} type="bookscard"/>
    </Layout>
  )
}

export default BookscardsIndex

export const pageQuery = graphql`
  query BookIndexQuery {
    allContentfulBookPost(sort: { fields: [publishDate], order: DESC }) {
      nodes {
        title
        slug
        publishDate(formatString: "MMMM Do, YYYY")
        tags
        rating
        bookAuthor
        characters
        genre
        heroImage {
          gatsbyImage(
            layout: FULL_WIDTH
            width: 424
            height: 212
          )
          publicUrl
        }
        description {
          raw
        }
        body {
          raw
        }
      }
    }
  }
`