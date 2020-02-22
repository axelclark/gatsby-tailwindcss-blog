module.exports = {
  siteMetadata: {
    title: `Axel Clark`,
    description: `A blog about programming and innovation.`,
    author: `Axel Clark`,
    siteUrl: `https://axelclark.com`
  },
  plugins: [
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src`
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Axel Clark`,
        short_name: `Axel`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#3c366b`,
        display: `minimal-ui`,
        icon: `src/images/axelclark_icon.png`
      }
    },
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true,
        printRejected: true,
        develop: false, // Enable while using `gatsby develop`
        purgeOnly: [`src/css/style.css`],
        whitelist: [
          `code`,
          `pre`,
          `dd`,
          `dl`,
          `h3`,
          `h4`,
          `h5`,
          `h6`,
          `ol`,
          `table`,
          `td`,
          `th`,
          `hr`,
          `abbr[title]`,
          `b`,
          `kbd`,
          `samp`,
          `small`,
          `sub`,
          `sup`,
          `optgroup`,
          `select`,
          `fieldset`,
          `progress`,
          `details`,
          `template`,
          `audio`,
          `embed`,
          `iframe`,
          `object`,
          `video`,
          `gatsby-resp-image-wrapper`,
          `markdown`,
          `gatsby-highlight`,
          `language-text`
        ]
      }
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-sharp`
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (e.g. <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (e.g. for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: `language-`,
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: null,
              // This lets you set up language aliases.  For example,
              // setting this to '{ sh: "bash" }' will let you use
              // the language "sh" which will highlight using the
              // bash highlighter.
              aliases: {},
              // This toggles the display of line numbers globally alongside the code.
              // To use it, add the following line in gatsby-browser.js
              // right after importing the prism color scheme:
              //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
              // Defaults to false.
              // If you wish to only show line numbers on certain code blocks,
              // leave false and use the {numberLines: true} syntax below
              showLineNumbers: false,
              // If setting this to true, the parser won't handle and highlight inline
              // code used in markdown i.e. single backtick code like `this`.
              noInlineHighlight: false,
              // This adds a new language definition to Prism or extend an already
              // existing language definition. More details on this option can be
              // found under the header "Add new language definition or extend an
              // existing language" below.
              languageExtensions: [
                {
                  language: `superscript`,
                  extend: `javascript`,
                  definition: {
                    superscript_types: /(SuperType)/
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/
                    }
                  }
                }
              ],
              // Customize the prompt used in shell output
              // Values below are default
              prompt: {
                user: `root`,
                host: `localhost`,
                global: false
              },
              // By default the HTML entities <>&'" are escaped.
              // Add additional HTML escapes by providing a mapping
              // of HTML entities and their escape value IE: { '}': '&#123;' }
              escapeEntities: {}
            }
          }
        ]
      }
    },
    `gatsby-plugin-feed`
  ]
};
