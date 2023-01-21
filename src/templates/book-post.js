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

class BookPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBookPost')
    const previous = get(this.props, 'data.previous')
    const next = get(this.props, 'data.next')
    const plainTextDescription = documentToPlainTextString(
      JSON.parse(post.description.raw)
    )
    const plainTextBody = documentToPlainTextString(JSON.parse(post.body.raw))
    const { minutes: timeToRead } = readingTime(plainTextBody)

    console.log("Raw Body :")
    console.log(JSON.parse(post.body.raw))

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
          image={`http:${post.heroImage.resize.src}`}
        />
        <Hero
          image={post.heroImage?.gatsbyImage}
          title={post.title}
          content={post.description}
        />
        <div className={styles.container}>
          <span className={styles.meta}>
            {post.author?.name} &middot;{' '}
            <time dateTime={post.rawDate}>{post.publishDate}</time> –{' '}
            {timeToRead} minute read
          </span>
          <div className={styles.article}>
            <div className={styles.body}>
              {post.body?.raw && renderRichText(post.body, options)}
            </div>
            <Tags tags={post.tags} />
            {(previous || next) && (
              <nav>
                <ul className={styles.articleNavigation}>
                  {previous && (
                    <li>
                      <Link to={`/books/${previous.slug}`} rel="prev">
                        ← {previous.title}
                      </Link>
                    </li>
                  )}
                  {next && (
                    <li>
                      <Link to={`/books/${next.slug}`} rel="next">
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

export default BookPostTemplate

export const pageQuery = graphql`
  query BookPostBySlug(
    $slug: String!
    $previousPostSlug: String
    $nextPostSlug: String
  ) {
    contentfulBookPost(slug: { eq: $slug }) {
      slug
      title
      author {
        name
      }
      publishDate(formatString: "MMMM Do, YYYY")
      rawDate: publishDate
      heroImage {
        gatsbyImage(layout: FULL_WIDTH, width: 1280)
        resize(height: 630, width: 1200) {
          src
        }
      }
      body {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            title
            description
            gatsbyImageData(width: 1000)
            file {
              url
            }
            __typename
          }
        }
      }
      tags
      description {
        raw
      }
    }
    previous: contentfulBookPost(slug: { eq: $previousPostSlug }) {
      slug
      title
    }
    next: contentfulBookPost(slug: { eq: $nextPostSlug }) {
      slug
      title
    }
  }
`
/*
export const pageQuery = graphql`
  query BookPostBySlug(
    $slug: String!
    $previousPostSlug: String
    $nextPostSlug: String
  ) {
    contentfulBookPost(slug: { eq: $slug }) {
      slug
      title
      author {
        name
      }
      publishDate(formatString: "MMMM Do, YYYY")
      rawDate: publishDate
      heroImage {
        gatsbyImage(layout: FULL_WIDTH, width: 1280)
        resize(height: 630, width: 1200) {
          src
        }
      }
      body {
        raw
        references {
          ... on ContentfulAsset {
             contentful_id
             title
             file {
                url
             }
          }
       }
      }
      tags
      description {
        raw
      }
    }
    previous: contentfulBookPost(slug: { eq: $previousPostSlug }) {
      slug
      title
    }
    next: contentfulBookPost(slug: { eq: $nextPostSlug }) {
      slug
      title
    }
  }
`
*/
