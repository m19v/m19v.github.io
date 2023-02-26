import React from "react";
import Layout from "@theme/Layout";

import Translate, { translate } from "@docusaurus/Translate";

import styles from "./index.module.css";

export default function Home() {

  return (
    <Layout title={`Home`}>
      <div className="container">
        <div className={styles.minimaliStyle}>
          <p>Hi, my name is</p>
          <h1>&#123; m19v &#125;</h1>
          <p>
            I am a Software Developer and Cloud Engineer passionate about tech
            and science.
          </p>
          <br />
          <button class="button button--secondary" href="#">more...</button>
        </div>
      </div>
    </Layout>
  );
}
