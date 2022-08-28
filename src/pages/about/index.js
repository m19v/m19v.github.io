import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import AvatarImageUrl from "@site/static/img/m19v-avatar-placeholder.png";

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
            <img className={styles.aboutProfilePic} src={AvatarImageUrl} />
          </div>
          <div className={styles.aboutText}>
            <h2>Hello,</h2>
            <p>
              I am <a>m19v</a>, a DevSecOps Engineer and Backend Software
              Developer.
            </p>
            <p>
              I am organized and analytical person, a problem solver with high
              attention to details. A fan of Football, Mysteries TV Series and
              Persian Literature. I am a family person and father of two lovely
              girls.
            </p>
            <p>
              I strongly care about documenting and sharing knowledge. I use
              this space as a reference in my daily work and would be happy if
              it could help those who want to become software developers as
              well.
            </p>
            <p>
              Feel free to contact me via email: <a>mnineteenv@gmail.com</a>
            </p>
            <p>Thanks for stopping by.</p>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default About;
