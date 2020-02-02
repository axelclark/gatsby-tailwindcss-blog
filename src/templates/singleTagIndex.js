import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import PostItem from "../components/PostItem";

const SingleTagTemplate = ({ data, pageContext }) => {
  const { posts, tagName } = pageContext;
  return (
    <Layout>
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
