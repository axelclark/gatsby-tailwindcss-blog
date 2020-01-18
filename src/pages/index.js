import React from "react";
import { StaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import PageTitle from "../components/page_title";
import SEO from "../components/seo";

function IndexPage() {
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
      />
      <PageTitle />
    </Layout>
  );
}

export default IndexPage;
