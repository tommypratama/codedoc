module.exports = {
  title: "Codedoc",
  tagline: "Code Documentation",
  url: "https://codedoc.vercel.app",
  baseUrl: "/",
  onBrokenLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: "tommypratama", // Usually your GitHub org/user name.
  projectName: "codedoc", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "Codedoc",
      logo: {
        alt: "My Site Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          href: 'https://github.com/tommypratama/codedoc',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    prism: {
      theme: require("prism-react-renderer/themes/github"),
      darkTheme: require("prism-react-renderer/themes/dracula"),
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} Codedoc. Built with ❤️ + Docusaurus.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          //   routeBasePath: "/",
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: "doc1",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/tommypratama/codedoc/tree/master",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/tommypratama/codedoc/tree/master",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
