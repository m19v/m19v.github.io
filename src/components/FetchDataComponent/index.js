import React, { useState, useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";

export default function FetchDataComponent({ url, language, title }) {
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
      <CodeBlock language={language} title={title} showLineNumbers>
        {data}
      </CodeBlock>
    </div>
  );
}
