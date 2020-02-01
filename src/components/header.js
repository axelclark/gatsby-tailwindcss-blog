import { graphql, useStaticQuery, Link } from "gatsby";
import React, { useState } from "react";
import Img from "gatsby-image";

function Header() {
  const [isExpanded, toggleExpansion] = useState(false);
  const data = useStaticQuery(graphql`
    query headerQuery {
      site {
        siteMetadata {
          title
        }
      }
      fileName: file(relativePath: { eq: "images/clark_profile.jpg" }) {
        childImageSharp {
          fixed(width: 35, height: 35) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);
  console.log(data);
  const { site } = data;

  return (
    <header className="bg-purple-900">
      <div className="flex flex-wrap items-center justify-between max-w-2xl mx-auto p-4 md:p-4">
        <Link className="flex items-center no-underline text-white" to="/">
          <Img
            alt=""
            className="mr-3 rounded"
            fixed={data.fileName.childImageSharp.fixed}
            objectFit="cover"
            objectPosition="50% 50%"
          />
          <span className="font-bold text-xl tracking-tight">
            {site.siteMetadata.title}
          </span>
        </Link>

        <button
          className="block md:hidden border border-white flex items-center px-3 py-2 rounded text-white"
          onClick={() => toggleExpansion(!isExpanded)}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>

        <nav
          className={`${
            isExpanded ? `block` : `hidden`
          } md:block md:flex md:items-center w-full md:w-auto`}
        >
          {[
            {
              route: `/`,
              title: `Posts`
            },
            {
              route: `/about`,
              title: `About`
            }
          ].map(link => (
            <Link
              className="block md:inline-block mt-4 md:mt-0 md:ml-6 no-underline text-white"
              key={link.title}
              to={link.route}
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
