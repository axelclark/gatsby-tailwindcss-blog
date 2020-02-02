import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";

const AllTagsTemplate = ({ data, pageContext }) => {
  const { tags } = pageContext;

  return (
    <Layout>
      <div className="markdown md:self-start">
        <h1>Find Posts by Tag</h1>
        <div>
          <ul className="list-disc list-outside px-8">
            {tags.map((tagName, index) => {
              return (
                <li key={index}>
                  <Link
                    className="text-lg text-indigo-700 font-bold mt-8 -mb-2 leading-tight hover:underline"
                    to={`/tags/${tagName}`}
                  >
                    {tagName}
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

export default AllTagsTemplate;
