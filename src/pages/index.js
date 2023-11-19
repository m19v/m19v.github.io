import React from "react";
import Layout from "@theme/Layout";
import useBaseUrl from '@docusaurus/useBaseUrl';

import Translate, { translate } from "@docusaurus/Translate";

import styles from "./index.module.css";

export default function Home() {
  const aboutUrl= useBaseUrl('about'); 
  return (
    <Layout title={`Home`}>
      <div className={styles.minimaliStyle}>
        <p>
          <Translate id="homepage.hello"></Translate>
        </p>
        <h1>&#123;m19v&#125;</h1>
        <p>
          <Translate id="homepage.iam"></Translate>
        </p>
        <br />
        <p>
          <a class="button button--secondary" href={aboutUrl}>
          <Translate id="homepage.more"></Translate>
          </a>
        </p>
      </div>
    </Layout>
  );
}
