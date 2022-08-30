import React, { useState } from "react";
import styles from "./styles.module.css";

import TutorialsImageUrl from "@site/static/img/tutorials.png";
import ReferencesImageUrl from "@site/static/img/references.png";
import ArticlesImageUrl from "@site/static/img/articles.png";

const FeatureList = [
  {
    title: "Tutorials",
    link: "/docs/category/tutorials",
    image: TutorialsImageUrl,
    description: (
      <>
        Browse through the tutorials on programming languages and DevSecOps tools.
      </>
    ),
  },
  {
    title: "References",
    link: "/docs/category/references",
    image: ReferencesImageUrl,
    description: (
      <>
      Check out the CLI and API reference documentation of programming languages and DevSecOps tools.
      </>
    ),
  },
  {
    title: "Articles",
    link: "/blog",
    image: ArticlesImageUrl,
    description: (
      <>
        Read and Follow recent blog posts and articles on Software Development and DevSecOps topics.
      </>
    ),
  },
];

function Feature({ title, link, image, description }) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div className="col col--4">
      <div className={styles.cardContainer}>
        <a
          // class={isHovering ? "card shadow--md" : "card shadow--lt"}
          class={isHovering ? "card shadow--tl" : "card shadow--md"}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          href={link}
          style={{
            color: "var(--ifm-heading-color)",
            textDecoration: "none",
          }}
        >
          <div class="card__image" href={link}>
            <img src={image} alt="Image alt text" />
          </div>
          <div class="card__body">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
          {/* <div class="card__footer">
            <a class="button button--secondary button--block" href={link}>
              Visit
            </a>
          </div> */}
        </a>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
