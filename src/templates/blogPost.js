import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout.js";
import SEO from "../components/seo";

const Template = ({ data, pageContext }) => {
  const { next, prev } = pageContext;
  const { markdownRemark } = data;
  const title = markdownRemark.frontmatter.title;
  const html = markdownRemark.html;

  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title={title}
      />
      <div className="markdown">
        <h1>{title}</h1>
        <div
          className="blog-post mb-16"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <div>
          {next && (
            <Link className="btn btn-gray mr-2" to={next.frontmatter.path}>
              Prev
            </Link>
          )}
          {prev && (
            <Link className="btn btn-gray" to={prev.frontmatter.path}>
              Next
            </Link>
          )}
        </div>
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
