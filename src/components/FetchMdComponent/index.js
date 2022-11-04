import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function FetchMsComponent({ url, sourceName, sourceLink }) {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.text();
        setData(data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <ReactMarkdown children={data} rehypePlugins={[rehypeRaw]} />
      <p align="right">
        <i><a href={sourceLink}>{sourceName}</a></i>
      </p>
    </div>
  );
}
