// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '{m19v}',
  url: 'https://m19v.github.io',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/m19v.ico',

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

  // themes: [
  //   // Other themes.
  //   [
  //     require.resolve("@easyops-cn/docusaurus-search-local"),
  //     {
  //       // `hashed` is recommended as long-term-cache of index file is possible.
  //       hashed: true,
  //       language: ["en"],
  //     },
  //   ],
  // ],

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
            'https://github.com/m19v/m19v.github.io/blob/main/',
          remarkPlugins: [math],
          rehypePlugins: [katex],
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/m19v/m19v.github.io/blob/main/',
          blogTitle: 'Blog',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-LVEVW4JNSB',
          anonymizeIP: true,
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '',
        hideOnScroll: true,
        logo: {
          alt: 'My Site Logo',
          src: 'img/{m19v}_black_without_bg.png',
          srcDark: 'img/{m19v}_white_without_bg.png',
          className: 'header-m19v-logo'
        },
        items: [
          {
            type: 'doc',
            docId: 'content', // must be the same as the name of file
            position: 'left',
            label: 'Docs',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/m19v',
            position: 'right',
            className: "header-github-link",
            "aria-label": "GitHub repository",
          },
          {
//             href: 'https://www.youtube.com/channel/UCQNWMiFiK4I0ZK9K_s3mRvw',
            href: 'https://youtube.com/@m19v',
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
        copyright: `© ${new Date().getFullYear()} - {m19v}`,
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
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      // announcementBar: {
      //   id: 'announcementBarContent',
      //   // content: `If you like this space, give it a ⭐️ on <a target="_blank" rel="noopener noreferrer" href="https://github.com/m19v">GitHub</a>`,
      //   content: 'This space is under construction!',
      //   backgroundColor: '#fafbfc',
      //   textColor: '#091E42',
      //   isCloseable: true,
      // },
      metadata: [{name: 'google-site-verification', content: '-5zh_8T7Z6ZPupTzJH9LcYznhfRid8I7y2TRsaHcrsE'}],
    }),
};

module.exports = config;
