import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import readingTime from 'reading-time'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import Tags from '../components/tags'
import * as styles from './blog-post.module.css'

class PhotoPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulPhotographyPost')
    const previous = get(this.props, 'data.previous')
    const next = get(this.props, 'data.next')
    const plainTextDescription = documentToPlainTextString(
      JSON.parse(post.description.raw)
    )

    const options = {
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
          console.log(node)
          console.log(node.data)
          
          console.log(node.data.target.sys.id)
          
          const gImageData = getImage(node.data.target)
          console.log(gImageData)

          return(<GatsbyImage image={gImageData} alt={node.data.target.description} />)
        },
        [INLINES.HYPERLINK]: node => {
          // Only process youtube links
          if (node.data.uri.includes("youtube.com")) {
            // Extract videoId from the URL
            const match = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/.exec(
              node.data.uri
            )
            const videoId =
              match && match[7].length === 11 ? match[7] : null
            return (
              videoId && (
                <section className={styles.videoContainer}>
                  <iframe
                    className={styles.video}
                    title={`https://youtube.com/embed/${videoId}`}
                    src={`https://youtube.com/embed/${videoId}`}
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                    frameBorder="0"
                    allowFullScreen
                  />
                </section>
              )
            )
          }
        },
      },
    };


    return (
      <Layout location={this.props.location}>
        <Seo
          title={post.title}
          description={plainTextDescription}
          image={`http:${post.photoImage.resize.src}`}
        />
        <Hero
          image={post.photoImage?.gatsbyImage}
          title={post.title}
          content={post.description}
        />
        <div className={styles.container}>
          <span className={styles.meta}>
            {post.author?.name} &middot;{' '}
            <time dateTime={post.rawDate}>{post.shootDate}</time> –{' '}
          </span>
          <div className={styles.article}>
            <Tags tags={post.tags} />
            {(previous || next) && (
              <nav>
                <ul className={styles.articleNavigation}>
                  {previous && (
                    <li>
                      <Link to={`/photography/${previous.slug}`} rel="prev">
                        ← {previous.title}
                      </Link>
                    </li>
                  )}
                  {next && (
                    <li>
                      <Link to={`/photography/${next.slug}`} rel="next">
                        {next.title} →
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </Layout>
    )
  }
}

export default PhotoPostTemplate
/*
export const pageQuery = graphql`
  query PhotographyPostBySlug(
    $slug: String!
    $previousPostSlug: String
    $nextPostSlug: String
  ) {
    contentfulPhotographyPost(slug: { eq: $slug }) {
      slug
      title
      author {
        name
      }
      shootDate(formatString: "MMMM Do, YYYY")
      rawDate: shootDate
      photoImage {
        gatsbyImage(layout: FULL_WIDTH, width: 1280)
        resize(height: 630, width: 1200) {
          src
        }
      }
      body {
        raw
      }
      tags
      description {
        raw
      }
    }
    previous: contentfulPhotographyPost(slug: { eq: $previousPostSlug }) {
      slug
      title
    }
    next: contentfulPhotographyPost(slug: { eq: $nextPostSlug }) {
      slug
      title
    }
  }
`
*/
