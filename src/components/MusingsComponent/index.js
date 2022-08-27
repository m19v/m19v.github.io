import React from "react";
import styles from "./styles.module.css";

const MusingList = [
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
    <section className={styles.featuresSection}>
      <div className="container">
        {MusingList.map((props, idx) => (
          <Musing key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}
