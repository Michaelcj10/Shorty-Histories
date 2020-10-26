import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import Break from "../components/atoms/break"
import ImageLoader from "../components/atoms/imageAsync"
import Input from "../components/atoms/input"
import styled from "styled-components"
import { motion } from "framer-motion"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const [searchVal, setVal] = useState("")

  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0.5 },
  }

  const getPosts = () => {
    // nothing searched, return full list
    if (searchVal.length < 1) {
      return data.allMarkdownRemark.edges
    }

    // filter after search applied
    const f = data.allMarkdownRemark.edges.filter(
      x =>
        x.node.frontmatter.title
          .toLowerCase()
          .indexOf(searchVal.toLowerCase()) > -1 ||
        x.node.frontmatter.tags.toLowerCase().indexOf(searchVal.toLowerCase()) >
          -1
    )

    // if search finds anything, return the list filtered
    if (f && f.length > 0) {
      return f
    } else {
      // just return the full list
      return data.allMarkdownRemark.edges
    }
  }

  const postsShowing = getPosts()

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Short Historys" />
      {
        <div style={{ minHeight: "200px" }}>
          <ImageLoader
            imgAlt="Banner"
            width="100%"
            height="300px"
            imgSrc="1916_banner-min.png"
          />
          <p>
            Let's expore some of the <strong>famous and infamous </strong>
            characters in Irish history. From James Connolly to Brian Boru
            Ireland has one of the richest cultures and historys in the worlds.
            We aim to explore that <strong>10,000 year history</strong> and all
            those characters in as simple and concise terms as we can.
          </p>
          <motion.div
            animate={{ x: 5 }}
            transition={{ ease: "easeOut", duration: 1 }}
          >
            <AllPeopleTitle>
              All people
              <span>{`(${postsShowing.length} showing)`}</span>
            </AllPeopleTitle>
          </motion.div>

          <Input
            label="Search for someone"
            placeholder="Enter a name or tag"
            onChange={val => {
              setVal(val)
            }}
            value={searchVal}
          />
        </div>
      }
      {postsShowing.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        const imgUrl = title.replace(/\s+/g, "_").toLowerCase()
        return (
          <motion.div
            key={node.fields.slug}
            initial="hidden"
            animate="visible"
            variants={variants}
          >
            <Article>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <PersonImage
                    imgAlt="Hero"
                    width="75px"
                    height="75px"
                    imgSrc={`${imgUrl}.jpg`}
                    isCircle={true}
                  />
                  <Link
                    style={{ boxShadow: `none`, color: "rgb(25, 25, 25)" }}
                    to={node.fields.slug}
                  >
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.dob}</small>
                <Break />
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
              <Tags>{node.frontmatter.tags}</Tags>
            </Article>
          </motion.div>
        )
      })}
    </Layout>
  )
}

const PersonImage = styled(ImageLoader)`
  margin-bottom: 0px;
  border-radius: 50%;
  margin-right: 10px;
  box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
`

const AllPeopleTitle = styled.h1`
  span {
    font-size: 14px;
    margin-left: 8px;
  }
`
const Tags = styled.h5`
  font-size: 14px;
  margin-top: 0px;
`
const Article = styled.article`
  img {
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    border: 1px solid #fff;
  }
`

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [], order: ASC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            description
            dob
            date
            tags
            category
          }
        }
      }
    }
  }
`
