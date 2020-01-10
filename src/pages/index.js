import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"


import Layout from "../components/layout"
import BookItem from '../components/BookItem';

import styled from 'styled-components';

import SEO from "../components/seo"

const LinkButton = styled.div`
  text-align: right;
  a{
    padding: 8px;
    background: rebeccapurple;
    color: white;
    border-radius: 8px;
    text-decoration: none;
    &:hover{
      background: indigo;
    }
  }
`;

const IndexPage = () => {
  const data = useStaticQuery(graphql`
  {
    allBook {
      edges {
        node {
          id
          title
          localImage{
            childImageSharp{
              fixed(width: 200){
                ...GatsbyImageSharpFixed
              }
            }
          }
          summary
          author {
            name
          }

        }
      }
    }
  }
`)
  return (
    <section>
      <SEO title="Home" />
      {data.allBook.edges.map(edge => (

        <BookItem key={edge.node.id}
          bookCover={edge.node.localImage.childImageSharp.fixed}
          bookTitle={edge.node.title}
          authorName={edge.node.author.name}
          bookSummary={edge.node.summary}>
          <LinkButton><Link to={`/book/${edge.node.id}`}>Join conversation</Link></LinkButton>
        </BookItem>
      ))}

    </section>)
}



export default IndexPage
