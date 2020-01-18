import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import PageTitle from "../components/page_title";
import SEO from "../components/seo";

const IndexPage = ({ data }) => {
  const { edges } = data.allMarkdownRemark;
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
      />
      <PageTitle />
      {edges.map(edge => {
        const { frontmatter } = edge.node;
        return <div key={frontmatter.path}>{frontmatter.title}</div>;
      })}
    </Layout>
  );
};

export const query = graphql`
  query HomepageQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            title
            path
            date
            excerpt
          }
        }
      }
    }
  }
`;

export default IndexPage;
