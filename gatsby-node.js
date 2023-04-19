const { CountertopsOutlined } = require('@mui/icons-material')
const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve('./src/templates/blog-post.js')

  const result = await graphql(
    `
      {
        allContentfulBlogPost {
          nodes {
            title
            slug
          }
        },
        allContentfulBookPost {
          nodes {
            title
            slug
          }
        },allContentfulPhotographyPost {
          nodes {
            title
            slug
          }
        },
        allContentfulContentType {
        edges {
          node {
            id
            name
          }
        }
      }
    
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful posts`,
      result.errors
    )
    return
  }

  // Create blog posts pages
  // But only if there's at least one blog post found in Contentful
  // `context` is available in the template as a prop and as a variable in GraphQL

  const posts = result.data.allContentfulBlogPost.nodes

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostSlug = index === 0 ? null : posts[index - 1].slug
      const nextPostSlug =
        index === posts.length - 1 ? null : posts[index + 1].slug

      createPage({
        path: `/blog/${post.slug}/`,
        component: blogPost,
        context: {
          slug: post.slug,
          previousPostSlug,
          nextPostSlug,
        },
      })
    })
  }

  // Define a template for books post
  const bookPost = path.resolve('./src/templates/book-post.js')


  // Create book posts pages
  // But only if there's at least one post found in Contentful
  // `context` is available in the template as a prop and as a variable in GraphQL
  const bookPosts = result.data.allContentfulBookPost.nodes

  if (bookPosts.length > 0) {
    bookPosts.forEach((post, index) => {
      //const previousPostSlug = index === 0 ? null : posts[index - 1].slug
      //const nextPostSlug =
      //  index === posts.length - 1 ? null : posts[index + 1].slug

      //createPage({
      //  path: `/books/${post.slug}/`,
      //  component: bookPost,
      //  context: {
      //    slug: post.slug,
      //    previousPostSlug,
      //    nextPostSlug,
      //  },
      //})
    })
  }

  const postTypes = result.data.allContentfulContentType.edges

  if (postTypes.length > 0) {
    postTypes.forEach((type, index) => {
      //const previousPostSlug = index === 0 ? null : posts[index - 1].slug
      //const nextPostSlug =
      //  index === posts.length - 1 ? null : posts[index + 1].slug

      //createPage({
      //  path: `/books/${post.slug}/`,
      //  component: bookPost,
      //  context: {
      //    slug: post.slug,
      //    previousPostSlug,
      //    nextPostSlug,
      //  },
      //})
      console.log(type.node.id)
      console.log(type.node.name)
    })
  }
  // Define a template for books post
  //const photoPost = path.resolve('./src/templates/photo-post.js')


  // Create photo posts pages
  // But only if there's at least one post found in Contentful
  // `context` is available in the template as a prop and as a variable in GraphQL
  const photoPosts = result.data.allContentfulPhotographyPost.nodes

  console.log(JSON.stringify(result.data))
  
  if (photoPosts.length > 0) {
    photoPosts.forEach((post, index) => {
      console.log("Photo Post :"+post.title)
      console.log("Photo Post Slug :"+post.slug)
    })
  }else
  {
    console.log("No photography posts!!")
  }
  
}
