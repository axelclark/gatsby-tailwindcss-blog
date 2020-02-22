import React from "react";
import { Link } from "gatsby";

const PostItem = ({ frontmatter }) => {
  console.log(frontmatter);
  return (
    <div className="mb-12" key={frontmatter.path}>
      <Link to={frontmatter.path}>
        <div>
          <p className="text-gray-500 font-semibold text-sm font-light mb-1">
            {frontmatter.date}
          </p>
          <h2 className="text-xl md:text-2xl leading-none mb-4">
            {frontmatter.title}
          </h2>
          <p className="text-gray-700 leading-tight font-light mb-4">
            {frontmatter.excerpt}
          </p>
          <p className="text-gray-500 text-sm leading-tight font-light border-b border-solid border-indigo-500 pb-3">
            {frontmatter.tags.join(`, `)}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default PostItem;
