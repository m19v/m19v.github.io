import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import Translate, { translate } from "@docusaurus/Translate";

import styles from "./index.module.css";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`Home`}>
      <div className="container">
        <div className={styles.minimaliStyle}>
          <p>Hi, I am <a>m19v</a>,</p>
          <p>a software developer with a focus on Backend & DevOps</p>
        </div>
      </div>
    </Layout>
  );
}
