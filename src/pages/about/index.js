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
              I am <a>m19v</a>, a Software Developer with a focus on Backend Development and DevOps/Cloud.
            </p>
            <p>
              I am organized and analytical person, a problem solver with high
              attention to details. A fan of Football, Mysteries TV Series and
              Tajik/Persian Literature. I am a family person and father of two lovely
              girls.
            </p>
            <p>
              I strongly care about documenting and sharing knowledge. I use
              this space as a reference in my daily work and would be happy if
              it could help those who want to become software developers as
              well.
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
