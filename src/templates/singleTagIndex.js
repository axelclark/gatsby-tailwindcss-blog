import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";

const SingleTagTemplate = ({ data, pageContext }) => {
  const { posts, tagName } = pageContext;
  return (
    <Layout>
      <div>
        <div>Posts about {`${tagName}`}</div>
        <div>
          <ul>
            {posts.map((post, index) => {
              return (
                <li key={index}>
                  <Link to={post.frontmatter.path}>
                    {post.frontmatter.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default SingleTagTemplate;
