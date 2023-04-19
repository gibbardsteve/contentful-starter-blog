import React from 'react'
import { graphql } from 'gatsby'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import Photo from '../components/photo'

const PhotographyIndex = (props) => {
  const posts = props.data.allContentfulPhotographyPost.nodes

  return(
    <Layout location={props.location}>
        <Seo title="Photography" />
        <Hero title="Photography" />
        <Photo posts={posts} type="photo"/>
    </Layout>
  )
}

export default PhotographyIndex

export const pageQuery = graphql`
query PhotographyQuery {
  allContentfulPhotographyPost {
    nodes {
      title
      slug
      aspect
      colour
      location
      photoNotes {
        photoNotes
      }
      photoImage {
        gatsbyImage(layout: FULL_WIDTH, width: 10, height: 10)
        publicUrl
        title
      }
      shootDate(formatString: "MMMM Do, YYYY")
      description {
        raw
      }
      tags
      id
    }
  }
}
`