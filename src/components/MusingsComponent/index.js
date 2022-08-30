import React from "react";
import styles from "./styles.module.css";

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

const MusingListEnglish = [
  {
    text: "The best people are those most beneficial to [other] people.",
    author: "Prophet Muhammad (saw)",
  },
  {
    text: "Half knowledge is worse than ignorance.",
    author: "Thomas B. Macaulay",
  },
  {
    text: "You get in life what you have the courage to ask for.",
    author: "Nancy D. Solomon",
  },
  {
    text: "You can tell how smart people are by the things they laugh at.",
    author: "Tina Fey",
  },
  {
    text: "Yesterday is history, tomorrow is a mystery, and today is a gift… that's why they call it the present.",
    author: "Eleanor Roosevelt",
  },
  // {
  //   text: "",
  //   author: "",
  // },
];

const MusingListTajik = [
  {
    text: "Дар касб ва кори нек ҷиддӣ бош!",
    author: "Луқмони Ҳаким",
  },
  {
    text: "То реша дар об аст, умеди` самаре ҳаст!",
    author: "Гуфтори ҳалқ",
  },
  {
    text: "Бо падару модарат беҳтарин рафторро ихтиёр кун.",
    author: "Луқмони Ҳаким",
  },
  {
    text: "Фарди кунҷков дар нимароҳаи хирадмандӣ аст.",
    author: "",
  },
  {
    text: "Он касе, ки аз ранҷи зиндагӣ битарсад, аз тарс дар ранҷ хоҳад буд.",
    author: "",
  },
  {
    text: "Дуруғгӯ ба фиреби дигарон шурӯъ мекунад ва ба фиреби худаш поён меёбад.",
    author: "",
  },
  {
    text: "Ҷавоби аблаҳ хомўшист.",
    author: "Гуфтори ҳалқ",
  },
  // {
  //   text: "",
  //   author: "",
  // },
];

function Musing({ text, author }) {
  return (
    <div className={styles.musingsContainer}>
      <span className={styles.musingsText}>{text}</span>
      <div className={styles.musingsAuthor}>{author}</div>
    </div>
  );
}

export default function MusingsComponent() {
  return (
    <section>
      <Tabs
        defaultValue="english"
        values={[
          { label: "English", value: "english" },
          { label: "Тоҷикӣ", value: "tajik" },
        ]}
      >
        <TabItem value="english">
          <div className="container">
            {MusingListEnglish.map((props, idx) => (
              <Musing key={idx} {...props} />
            ))}
          </div>
        </TabItem>
        <TabItem value="tajik">
          <div className="container">
            {MusingListTajik.map((props, idx) => (
              <Musing key={idx} {...props} />
            ))}
          </div>
        </TabItem>
      </Tabs>
    </section>
  );
}
