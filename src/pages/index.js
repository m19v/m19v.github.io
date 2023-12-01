import React from "react";
import Layout from "@theme/Layout";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { TypeAnimation } from "react-type-animation";

import Translate, { translate } from "@docusaurus/Translate";

import styles from "./index.module.css";

export default function Home() {
  const aboutUrl = useBaseUrl("about");
  const CURSOR_CLASS_NAME = "custom-type-animation-cursor";
  const CURSOR_CLASS_NAME1 = "custom-type-animation-cursor1";
  return (
    <Layout title={`Home`}>
      <div className={styles.minimaliStyle}>
        <p>
          {/* <Translate id="homepage.hello"></Translate> */}
          <TypeAnimation
            cursor={false}
            speed={150}
            style={{
              whiteSpace: "pre-line",
              display: "block",
              // fontSize: "2rem",
            }}
            className={CURSOR_CLASS_NAME}
            sequence={[
              `Hi, `,
              // (el) => el.classList.remove(CURSOR_CLASS_NAME), // A reference to the element gets passed as the first argument of a callback function
              1000,
              `Hi, my name is`,
              1000,
              `Hi, my name is\n`,
              1000,
              (el) => el.classList.remove(CURSOR_CLASS_NAME),
            ]}
          />
          <TypeAnimation
            cursor={false}
            style={{
              whiteSpace: "pre-line",
              fontSize: "4.8rem",
              lineHeight: "5.4rem",
              fontWeight: "600",
              marginBottom:"10px",
            }}
            className={CURSOR_CLASS_NAME}
            sequence={[
              (el) => el.classList.remove(CURSOR_CLASS_NAME),
              4000,
              (el) => el.classList.add(CURSOR_CLASS_NAME),
              1000,
              `{m19v}`,
              (el) => el.classList.remove(CURSOR_CLASS_NAME),
              `{m19v}\n`,
            ]}
          />
          <TypeAnimation
            cursor={false}
            speed={150}
            style={{
              whiteSpace: "pre-line",
              // display: "block",
              marginTop: "10px",
            }}
            className={CURSOR_CLASS_NAME}
            sequence={[
              (el) => el.classList.remove(CURSOR_CLASS_NAME),
              6000,
              (el) => el.classList.add(CURSOR_CLASS_NAME),
              1000,
              `I am a Software Developer `,
              1000,
              `I am a Software Developer passionate about tech `,
              1000,
              `I am a Software Developer passionate about tech and programming.`,
              (el) => el.classList.remove(CURSOR_CLASS_NAME),
            ]}
          />
        </p>
        {/* <h1>&#123;m19v&#125;</h1> */}
        <h1>
          {/* <TypeAnimation
            sequence={[
              `{m19v}\n`, // actual line-break inside string literal also gets animated in new line, but ensure there are no leading spaces
              1000,
              "",
            ]}
            speed={150}
            // style={{ fontSize: '2em' }}
          /> */}
        </h1>
        <p>{/* <Translate id="homepage.iam"></Translate> */}</p>
        <br />
        <p>
          <a class="button button--secondary" href={aboutUrl}>
            <Translate id="homepage.more"></Translate>
          </a>
        </p>
      </div>
    </Layout>
  );
}
