import React from "react";
import styles from "./styles.module.css";


function Literature({ text, author }) {
  return (
    <div className={styles.literatureContainer}>
      <span className={styles.literatureText}>{text}</span>
      <div className={styles.literatureAuthor}>{author}</div>
    </div>
  );
}

export default function LiteratureComponent({ props }) {
  return (
      <div className="container">
        {props.map((props, idx) => (
          <Literature key={idx} {...props} />
        ))}
      </div>
  );
}
