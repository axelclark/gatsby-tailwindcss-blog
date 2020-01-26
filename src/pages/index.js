import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";
import PostItem from "../components/PostItem";
import SEO from "../components/seo";

const IndexPage = ({ data }) => {
  const { edges } = data.allMarkdownRemark;
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
      />
      <h1 className="text-3xl font-light mt-4 mb-6 text-gray-600">
        Recent Posts
      </h1>
      {edges.map(edge => {
        const { frontmatter } = edge.node;
        return <PostItem frontmatter={frontmatter} />;
      })}
      <div>
        <Link className="hover:underline" to="/tags">
          Browse by Tag
        </Link>
      </div>
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
            date(formatString: "YYYY-MM-DD")
            excerpt
          }
        }
      }
    }
  }
`;

export default IndexPage;
