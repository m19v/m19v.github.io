import React from "react";
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
        <div className={styles.minimaliStyle}>
          <h2 >Hi, I am m19v,</h2>
          <h3>
            a software developer with a focus on Backend & DevOps
          </h3>
        </div>
        {/* <p className={styles.heroSubSubtitle}><Translate id="homepage.welcome.to"/></p>
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle"><Translate id="homepage.hero.subtitle"/></p>
        <p className={styles.heroSubSubtitle}><Translate id="homepage.hero.subsubtitle"/>
        </p> */}
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Home`}
      description="Description will go into a meta tag in <head />"
    >
      <HomePageHeader />
      <main>{/* <HomepageFeatures /> */}</main>
    </Layout>
  );
}
