import React, { useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Guides and Manuals",
    link: "/docs/category/guides-and-manuals",
    image:
      "https://images.unsplash.com/photo-1467810160588-c86c0deb5d16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    description: (
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec bibendum,
        sem id aliquam iaculis.
      </>
    ),
  },
  {
    title: "Reference",
    link: "/docs/category/references",
    image:
      "https://images.unsplash.com/photo-1472712739516-7ad2b786e1f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
    description: (
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec bibendum,
        sem id aliquam iaculis.
      </>
    ),
  },
  {
    title: "Articles",
    link: "/blog",
    image:
      "https://images.unsplash.com/photo-1507275016429-544fc0875edd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
    description: (
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec bibendum,
        sem id aliquam iaculis.
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
            textDecoration: "none"
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