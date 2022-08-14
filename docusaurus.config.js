// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '{ m19v }',
  tagline: 'A page of a Linux enthusiast, DevOps Engineer and Back-End Developer',
  url: 'https://m19v.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/header-m19v-logo-dark.svg',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'm19v', // Usually your GitHub org/user name.
  projectName: 'm19v.github.io', // Usually your repo name.
  deploymentBranch: "gh-pages",
  trailingSlash: false,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tg'],
    path: 'i18n',
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        calendar: 'gregory',
        path: 'en',
      },
      tg: {
        label: 'Тоҷикӣ',
        direction: 'ltr',
        htmlLang: 'tj-TJ',
        calendar: 'gregory',
        path: 'tg',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          blogTitle: 'Blog title',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '',
        hideOnScroll: true,
        logo: {
          alt: 'My Site Logo',
          src: 'img/header-m19v-logo-dark.svg',
          srcDark: 'img/header-m19v-logo-light.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'contents',
            position: 'left',
            label: 'Docs',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          { to: "/about", label: "About", position: "left" },
          {
            href: 'https://github.com/m19v',
            position: 'right',
            className: "header-github-link",
            "aria-label": "GitHub repository",
          },
          {
            href: 'https://youtube.com',
            position: 'right',
            className: "header-youtube-link",
            "aria-label": "GitHub repository",
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Connect',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'Discover',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'Documentation',
                to: '/docs',
              },
              {
                label: 'Projects',
                to: '#',
              },
              {
                label: 'About',
                to: '/about',
              },
              {
                label: 'Resume',
                to: '#',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} - m19v. All rights reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      docs: {
        sidebar: {
          hideable: true,
        },
      },
    }),
};

module.exports = config;
