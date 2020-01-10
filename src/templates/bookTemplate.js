import React from 'react';
import Layout from '../components/layout';
import BookItem from '../components/BookItem';
import { graphql } from 'gatsby';

const BookTempate = (props) => {
  console.log(props);
  return (
    <section>
      <BookItem
        bookCover={props.data.book.localImage.childImageSharp.fixed}
        authorName={props.data.book.author.name}
        bookSummary={props.data.book.summary}
        bookTitle={props.data.book.title} />
    </section>
  );
}
export const query = graphql`
 query($bookId: String!){
  book(id: {eq: $bookId}) {
    title
    summary
    localImage {
      childImageSharp {
        fixed(width: 200) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    author {
      name
    }
  }
}
`;
export default BookTempate;