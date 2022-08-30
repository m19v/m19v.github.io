import React, { useState } from "react";
import styles from "./styles.module.css";

import TutorialsImageUrl from "@site/static/img/tutorials.png";
import ReferencesImageUrl from "@site/static/img/references.png";
import ArticlesImageUrl from "@site/static/img/articles.png";

import Translate, { translate } from "@docusaurus/Translate";

const FeatureList = [
  {
    title: "home.feature.card.tutorials.title",
    link: "/docs/category/tutorials",
    image: TutorialsImageUrl,
    description: "home.feature.card.tutorials.description",
  },
  {
    title: "home.feature.card.references.title",
    link: "/docs/category/references",
    image: ReferencesImageUrl,
    description: "home.feature.card.references.description",
  },
  {
    title: "home.feature.card.blog.title",
    link: "/blog",
    image: ArticlesImageUrl,
    description: "home.feature.card.blog.description",
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
          // className={isHovering ? "card shadow--md" : "card shadow--lt"}
          className={isHovering ? "card shadow--tl" : "card shadow--md"}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          href={link}
          style={{
            color: "var(--ifm-heading-color)",
            textDecoration: "none",
          }}
        >
          <div className="card__image" href={link}>
            <img src={image} alt="Image alt text" />
          </div>
          <div className="card__body">
            <h3><Translate id={title}/></h3>
            <p><Translate id={description}/></p>
          </div>
          {/* <div className="card__footer">
            <a className="button button--secondary button--block" href={link}>
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
