import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

function AboutPage() {
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="About"
      />

      <section className="flex flex-col items-center">
        <div className="markdown">
          <h1>Who is Axel?</h1>
          <p>
            I live and work in New Jersey. I program mostly in Elixir and
            JavaScript.
          </p>
          <p>
            I also co-host the{` `}
            <a href="https://soundcloud.com/noisecancellingpod">
              Noise Cancelling Pod
            </a>
            , a podcast about streamlining life, encouraging discourse, and
            appreciating each other.
          </p>
          <p>
            You can contact or follow me on{` `}
            <a href="https://twitter.com/axelclark2">Twitter</a> or{` `}
            <a href="https://github.com/axelclark">GitHub</a>.
          </p>
        </div>
      </section>
    </Layout>
  );
}

export default AboutPage;
