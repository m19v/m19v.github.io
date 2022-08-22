import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import Translate, { translate } from "@docusaurus/Translate";

import styles from "./index.module.css";

function HomePageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <p className={styles.customPTag}>
          <Translate
            id="homepage.welcome.to"
            description="Welcome to message"
          >
            Welcome to in Translate Tag
          </Translate>
        </p>
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p className={styles.customPTag}>
          Here I aim to accumulate the articles and tutorials on Linux, DevOps
          and Software Development. For researchers, software developers
          and those looking to become a software developer.
        </p>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomePageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
