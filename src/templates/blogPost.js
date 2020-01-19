import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout.js";

const Template = ({ data, pageContext }) => {
  const { next, prev } = pageContext;
  const { markdownRemark } = data;
  const title = markdownRemark.frontmatter.title;
  const html = markdownRemark.html;

  return (
    <Layout>
      <div>
        <h1>{title}</h1>
        <div className="blogpost" dangerouslySetInnerHTML={{ __html: html }} />
        {prev && <Link to={prev.frontmatter.path}>Previous</Link>}
        <br />
        {next && <Link to={next.frontmatter.path}>Next</Link>}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

export default Template;
