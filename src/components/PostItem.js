import React from "react";
import { Link } from "gatsby";

const PostItem = ({ frontmatter }) => {
  return (
    <div key={frontmatter.path}>
      <Link to={frontmatter.path}>
        <div className="mb-6 border-2 border-solid font-bold border-gray-500 p-4">
          <h2 className="text-xl md:text-2xl leading-none mb-2">
            {frontmatter.title}
          </h2>
          <p className="text-gray-700 leading-tight font-light">
            {frontmatter.excerpt}
          </p>
          <p className="text-gray-500 font-light">{frontmatter.date}</p>
        </div>
      </Link>
    </div>
  );
};

export default PostItem;
