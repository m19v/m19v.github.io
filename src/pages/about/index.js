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
      <header className={styles.aboutHeader}>
        <h2 className="underlineColorSuccess">
          <Translate id="about.aboutMeTittle"/>
        </h2>
      </header>
      <main id="main">
        <div className={styles.about}>
          <div>
            <img className={styles.aboutProfilePic} src={AvatarImageUrl} />
          </div>
          <div className={styles.aboutText}>
            <h2>
              <Translate id="about.aboutMeHello"/>
            </h2>
            <p>
              I am <a>m19v</a>, a software developer with a focus on backend development and DevOps/Cloud technologies.
            </p>
            <p>
              I am (or strive to be) an organized and analytical person, a problem solver with high attention to detail. A fan of football, mysteries TV Series and Tajik/Persian literature. I am a devoted family man and a proud father.
            </p>
            <p>
              I strongly care about documenting and sharing knowledge. I use this website as a reference in my daily work and would be glad if others could benefit from the information provided here.
            </p>
            <p>
              Feel free to contact me via email: <a href="mailto:mnineteenv@gmail.com">mnineteenv@gmail.com</a>
            </p>
            <p>Thanks for stopping by.</p>
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
