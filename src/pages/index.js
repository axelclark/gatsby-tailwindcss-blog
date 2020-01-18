import React from "react";
import { StaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

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

const Header = () => {
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

function IndexPage() {
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
      />
      <Header />
    </Layout>
  );
}

export default IndexPage;
