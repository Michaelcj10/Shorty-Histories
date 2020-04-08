import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { rhythm } from "../utils/typography";
import Break from "../components/atoms/break";

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Irish Shorts" />
      <div style={{minHeight: '200px'}}>
      <img style={{width: '100%'}} src={`1916_banner-min.png`} />

      </div>
      {posts.map(({ node }, index) => {
        const title = node.frontmatter.title || node.fields.slug;
        const imgUrl = title.replace(/\s+/g, '_').toLowerCase();

        return (
          <article key={node.fields.slug}>
            <header>

              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <img style={{width: '75px', marginBottom: '0px', borderRadius: '50%', marginRight: '10px',
    boxShadow: '0 5px 15px 0px rgba(0, 0, 0, 0.6)'}} src={`${imgUrl}.jpg`} />                  

                <Link
                  style={{ boxShadow: `none`, color: "rgb(25, 25, 25)" }}
                  to={node.fields.slug}
                >
                  {title}
                </Link>

              </h3>
              <small>{node.frontmatter.dob}</small>
              <Break  />

            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___priority], order: ASC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            description
            priority
            dob
            date
          }
        }
      }
    }
  }
`
