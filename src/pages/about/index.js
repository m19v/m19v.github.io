import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import AvatarImageUrl from "@site/static/img/m19v-avatar-placeholder.png";

import styles from "./styles.module.css";

import Translate, { translate } from "@docusaurus/Translate";

function About() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  return (
    <Layout title="About" description={siteConfig.tagline}>
      <main id="main">
        <div className={styles.about}>
          <div>
            <img className={styles.aboutProfilePic} src={AvatarImageUrl} />
          </div>
          <div className={styles.aboutText}>
            <h2>
              <Translate id="about.hello" />
            </h2>
            <p>
              <Translate id="about.p.1.1" />
              <a>m19v</a>
              <Translate id="about.p.1.2" />
            </p>
            <p>
              <Translate id="about.p.2" />
            </p>
            <p>
              <Translate id="about.p.3" />
            </p>
            <p>
              <Translate id="about.p.4" /><a href="mailto:mnineteenv@gmail.com">mnineteenv@gmail.com</a>
            </p>
            <p><Translate id="about.p.5"/></p>
            {/* <a href="https://stackoverflow.com/users/12501050/m19v">
              <img
                src="https://stackexchange.com/users/flair/17263784.png"
                width="208"
                height="58"
                alt="profile for m19v on Stack Overflow, a network of free, community-driven Q&amp;A sites"
                title="profile for m19v on Stack Overflow, a network of free, community-driven Q&amp;A sites"
              />
            </a> */}
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default About;
