import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Programming",
    Svg: require("@site/static/img/Hand-coding.svg").default,
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
  {
    title: "Coding Workshop",
    Svg: require("@site/static/img/Coding-workshop.svg").default,
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: "Software Development",
    Svg: require("@site/static/img/Software-Developer.svg").default,
    description: (
      <>
        Дар ин саҳифа то кунун матне вуҷуд надорад. Шумо метавонед дар дигар
        саҳифаҳо унвони ин саҳифаро ҷустуҷӯ кунед, гузоришҳои алоқамандро
        ҷустуҷӯ намоед, ё ин саҳифаро <code>docs</code> вироиш кунед.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
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
