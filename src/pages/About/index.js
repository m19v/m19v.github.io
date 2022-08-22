import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import styles from "./styles.module.css";

function About() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  return (
    <Layout title="About" description={siteConfig.tagline}>
      <header className={styles.aboutHeader}>
        <h2 className="underlineColorSuccess">About me</h2>
      </header>
      <main id="main">
        <div className={styles.about}>
          <div>
            <img
              className={styles.aboutProfilePic}
              src={useBaseUrl("img/header-m19v-logo-dark.svg")}
            />
          </div>
          <div className={styles.aboutText}>
            <h2>Hello,</h2>
            <p>
              I am <a>m19v</a>, a DevOps Engineer and Backend Software Developer.<br />
              I strongly care about documenting, collecting/accumulating and sharing knowledge and valuable information.
              I use this space as a reference in my daily work and would be happy if it also help those who are looking to become a software developer. <br />
              I am flexible, organized and analytical person, a logical problem solver with high attention to details.
              Fan of Football, Mysteries TV series and Persian literature. I am a family person and father of two lovely girls.<br />

              I prefer architecture and server-side business logic over designing FE and visual elements of a UI.<br />

              Feel free to contact me via email: mnineteenv@gmail.com <br />

              Thanks for visiting my space.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default About;
