import React from "react";

import Layout from "../components/layout";
import PostItem from "../components/PostItem";
import SEO from "../components/seo";

const SingleTagTemplate = ({ data, pageContext }) => {
  const { posts, tagName } = pageContext;
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title={`${tagName} tags`}
      />
      <div>
        <h1 className="text-3xl font-light mt-4 mb-6 text-indigo-500">
          Posts about {`${tagName}`}
        </h1>
        <div>
          {posts.map(post => {
            const { frontmatter } = post;
            return <PostItem frontmatter={frontmatter} />;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default SingleTagTemplate;
