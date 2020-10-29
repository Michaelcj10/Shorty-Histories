import React, { Fragment, useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import Break from "../components/atoms/break"
import Label from "../components/atoms/label"
import ImageLoader from "../components/atoms/imageAsync"
import Button from "../components/atoms/button"
import SecondaryButton from "../components/atoms/secondaryButton"
import Input from "../components/atoms/input"
import styled from "styled-components"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const [searchVal, setVal] = useState("")
  const [filteredCategories, setFiltered] = useState([])

  const getPosts = () => {
    // filter all catergories user has unselected first
    var filtered = data.allMarkdownRemark.edges.filter(function(e) {
      return !this.includes(e.node.frontmatter.category)
    }, filteredCategories)

    // nothing searched, return full list
    if (searchVal.length < 1) {
      return filtered
    }

    // filter after search applied
    const f = filtered.filter(
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
      // just return an empty list
      return []
    }
  }

  const getCategories = () => {
    const allCat = []

    data.allMarkdownRemark.edges.forEach(element => {
      const curr = element.node.frontmatter.category

      if (!allCat.includes(curr)) {
        allCat.push(curr)
      }
    })

    return allCat
  }

  const clearFilters = () => {
    setVal("")
    setFiltered([])
  }

  const postsShowing = getPosts()
  const categories = getCategories()

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      {
        <Fragment>
          <ImageLoader
            imgAlt="Banner"
            width="100%"
            height="300px"
            imgSrc="man.svg"
          />
          <CustomH1>About us</CustomH1>
          <blockquote>
            <p>
              Let's expore some of the <strong>famous and infamous </strong>
              characters in Irish history. From James Connolly to Brian Boru
              Ireland has one of the richest cultures and historys in the world.
              We aim to explore that
              <strong>10,000 year history</strong> and all those characters in
              as simple and concise terms as we can.
            </p>
          </blockquote>

          <div>
            <h1 style={{ fontSize: "1.5em" }}>Search for someone</h1>
            <Label text="Select categories" focused={false} />
            <Categories>
              {categories.map((category, i) => {
                return (
                  <Badge
                    style={{
                      opacity: filteredCategories.includes(category)
                        ? "0.2"
                        : "1",
                    }}
                    onClick={() => {
                      const newArr = filteredCategories
                      if (filteredCategories.includes(category)) {
                        console.log("here")
                        const index = newArr.indexOf(category)
                        newArr.splice(index, 1)

                        setFiltered([...newArr])
                      } else {
                        setFiltered([...newArr, category])
                      }
                    }}
                    key={i}
                  >
                    {category}
                  </Badge>
                )
              })}
            </Categories>

            <Input
              label="Search by value"
              placeholder="Enter a name or tag"
              onChange={val => {
                setVal(val)
              }}
              value={searchVal}
            />
            <SecondaryButton
              text="Clear filters"
              onClick={() => {
                clearFilters()
              }}
            />
          </div>
        </Fragment>
      }
      <h1 style={{ fontSize: "1.5em" }}>
        All people
        <span
          style={{ fontWeight: "normal", fontSize: "14px", marginLeft: "8px" }}
        >{`(${postsShowing.length} showing)`}</span>
      </h1>
      <Fragment>
        {postsShowing.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          const imgUrl = title.replace(/\s+/g, "_").toLowerCase()
          return (
            <Article key={node.fields.slug}>
              <header style={{ marginBottom: "20px" }}>
                <EntryItem
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

                  <h3>
                    <PageLink to={node.fields.slug}>{title}</PageLink>
                  </h3>
                </EntryItem>
                <small>{node.frontmatter.dob}</small>
                <Break />
              </header>
              <blockquote>
                <Tags>{node.frontmatter.tags}</Tags>
                <div style={{ fontWeight: "bold" }}>
                  {node.frontmatter.category}
                </div>
              </blockquote>

              <Link to={node.fields.slug}>
                <Button text="Read more" />
              </Link>
            </Article>
          )
        })}
        {postsShowing.length === 0 && (
          <Fragment>
            <p>
              You're filtering out everything, are you sure you're on the right
              site?!
            </p>
            <Button
              text="Clear filters"
              onClick={() => {
                clearFilters()
              }}
            />
          </Fragment>
        )}
      </Fragment>
    </Layout>
  )
}

const PageLink = styled(Link)`
  color: rgb(25, 25, 25);
  box-shadow: none;
`

const PersonImage = styled(ImageLoader)`
  margin-bottom: 0px;
  border-radius: 50%;
  margin-right: 10px;
  box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
`
const Categories = styled.div`
  margin: 5px auto 25px;
  display: flex;
`

const Badge = styled.div`
  width: fit-content;
  background: #007acc;
  padding: 2px 5px;
  color: #fff;
  cursor: pointer;
  margin-right: 8px;
`

const EntryItem = styled.div`
  display: flex;
  align-items: center;

  img {
    margin: 0px 20px 0px 0px;
  }
`

const CustomH1 = styled.h1`
  font-size: 2em;
`

const Tags = styled.h5`
  font-size: 16px;
  margin-top: 0px;
  font-weight: 500;
  line-height: 20px;
`
const Article = styled.div`
  margin-top: 25px;
  border-bottom: 1px solid #efefed;
  small {
    font-weight: 900;
  }
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
