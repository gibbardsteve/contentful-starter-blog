import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import ArticlePreview from '../components/article-preview'

class BookIndex extends React.Component {
  render() {
    const posts = get(this, 'props.data.allContentfulBookPost.nodes')

    return (
      <Layout location={this.props.location}>
        <Seo title="Books" />
        <Hero title="Books" />
        <ArticlePreview posts={posts} type="books"/>
      </Layout>
    )
  }
}

export default BookIndex

export const pageQuery = graphql`
  query BookIndexQuery {
    allContentfulBookPost(sort: { fields: [publishDate], order: DESC }) {
      nodes {
        title
        slug
        publishDate(formatString: "MMMM Do, YYYY")
        tags
        heroImage {
          gatsbyImage(
            layout: FULL_WIDTH
            width: 424
            height: 212
          )
        }
        description {
          raw
        }
      }
    }
  }
`
