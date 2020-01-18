import React from "react";
import { StaticQuery, graphql } from "gatsby";

const TitleAndDescription = ({ data }) => {
  const title = data.site.siteMetadata.title;
  const description = data.site.siteMetadata.description;

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-4xl">{title}</h2>
      <p>{description}</p>
    </div>
  );
};

const PageTitle = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
              description
            }
          }
        }
      `}
      render={data => <TitleAndDescription data={data} />}
    />
  );
};

export default PageTitle;
