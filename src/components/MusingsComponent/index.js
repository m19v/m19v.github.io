import React from "react";
import styles from "./styles.module.css";

const MusingList = [
  {
    text: "Half knowledge is worse than ignorance.",
    author: "Thomas B. Macaulay",
    date: "January 19, 2019",
  },
  {
    text: "You get in life what you have the courage to ask for.",
    author: "Nancy D. Solomon",
    date: "August 04, 2014",
  },
  {
    text: "You can tell how smart people are by the things they laugh at.",
    author: "Tina Fey",
    date: "February 27, 2014",
  },
  // {
  //   text: "",
  //   author: "",
  //   date: "",
  // },
];

function Musing({ text, author, date }) {
  return (
    <div className={styles.musingsContainer}>
      <span className={styles.musingsText}>{text}</span>
      <span> - </span>
      <span className={styles.musingsAuthor}>{author}</span>
      <div className={styles.musingsDate}>{date}</div>
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
