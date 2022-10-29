import React, { useState } from "react";
import styles from "./styles.module.css";
import { useColorMode } from "@docusaurus/theme-common";
import useBaseUrl from '@docusaurus/useBaseUrl';

import Translate, { translate } from "@docusaurus/Translate";

const FeatureList = [
  {
    title: "home.feature.card.tutorials.title",
    link: "tutorials",
    image: "M28 19.3v-2.4q1.65-.7 3.375-1.05Q33.1 15.5 35 15.5q1.3 0 2.55.2 1.25.2 2.45.5v2.2q-1.2-.45-2.425-.675Q36.35 17.5 35 17.5q-1.9 0-3.65.475T28 19.3Zm0 11v-2.45q1.65-.7 3.375-1.025Q33.1 26.5 35 26.5q1.3 0 2.55.2 1.25.2 2.45.5v2.2q-1.2-.45-2.425-.675Q36.35 28.5 35 28.5q-1.9 0-3.65.45T28 30.3Zm0-5.5v-2.4q1.65-.7 3.375-1.05Q33.1 21 35 21q1.3 0 2.55.2 1.25.2 2.45.5v2.2q-1.2-.45-2.425-.675Q36.35 23 35 23q-1.9 0-3.65.475T28 24.8ZM12.4 33q2.7 0 5.225.625 2.525.625 4.975 1.875V14.15q-2.25-1.5-4.875-2.325Q15.1 11 12.4 11q-1.9 0-3.725.475Q6.85 11.95 5 12.65v21.7q1.55-.7 3.525-1.025Q10.5 33 12.4 33Zm13.2 2.5q2.5-1.25 4.9-1.875Q32.9 33 35.6 33q1.9 0 3.925.3t3.475.8V12.65q-1.7-.85-3.6-1.25-1.9-.4-3.8-.4-2.7 0-5.225.825-2.525.825-4.775 2.325ZM24.1 40q-2.55-1.9-5.55-2.925T12.4 36.05q-1.85 0-3.6.45t-3.5 1.1q-1.15.55-2.225-.15Q2 36.75 2 35.45V12.3q0-.75.35-1.375T3.4 9.95q2.1-1 4.375-1.475Q10.05 8 12.4 8q3.15 0 6.125.85t5.575 2.6q2.55-1.75 5.475-2.6Q32.5 8 35.6 8q2.35 0 4.6.475 2.25.475 4.35 1.475.7.35 1.075.975T46 12.3v23.15q0 1.4-1.125 2.125-1.125.725-2.225.025-1.7-.7-3.45-1.125-1.75-.425-3.6-.425-3.15 0-6.05 1.05T24.1 40ZM13.8 23.55Z",
    description: "home.feature.card.tutorials.description",
  },
  {
    title: "home.feature.card.references.title",
    link: "docs/category/references",
    image: "M4 38v-3h20v3Zm0-10.5v-3h10v3ZM4 17v-3h10v3Zm37.9 21-8-8q-1.3 1-2.8 1.5-1.5.5-3.1.5-4.15 0-7.075-2.925T18 22q0-4.15 2.925-7.075T28 12q4.15 0 7.075 2.925T38 22q0 1.6-.5 3.1T36 27.9l8 8ZM28 29q2.9 0 4.95-2.05Q35 24.9 35 22q0-2.9-2.05-4.95Q30.9 15 28 15q-2.9 0-4.95 2.05Q21 19.1 21 22q0 2.9 2.05 4.95Q25.1 29 28 29Z",
    description: "home.feature.card.references.description",
  },
  {
    title: "home.feature.card.blog.title",
    link: "blog",
    image: "M24 42v-3.55l10.8-10.8 3.55 3.55L27.55 42ZM6 31.5v-3h15v3Zm34.5-2.45-3.55-3.55 1.45-1.45q.4-.4 1.05-.4t1.05.4l1.45 1.45q.4.4.4 1.05t-.4 1.05ZM6 23.25v-3h23.5v3ZM6 15v-3h23.5v3Z",
    description: "home.feature.card.blog.description",
  },
];

function Feature({ title, link, image, description }) {
  const [isHovering, setIsHovering] = useState(false);
  const { colorMode } = useColorMode();
  const i18nLink = useBaseUrl(link)

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
          href={i18nLink}
          style={{
            color: "var(--ifm-heading-color)",
            textDecoration: "none",
          }}
        >
          <div className="card__body">
            {/* <img className={styles.cardIcon} src={image} alt="Image alt text" /> */}
            <svg className={styles.cardIcon} xmlns="http://www.w3.org/2000/svg" height="48" width="48">
              <g fill={colorMode=='dark' ? "#fff" : "#000"}>
                <path d={image} />
              </g>
            </svg>
            <h2>
              <Translate id={title} />
            </h2>
            <p>
              <Translate id={description} />
            </p>
          </div>
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
