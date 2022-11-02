import React, { useState, useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";

export default function FetchDataComponent() {
  const [data, setData] = useState("");

  useEffect(() => {
    const url =
      "https://raw.githubusercontent.com/m19v/awesome-cheatsheets/master/languages/bash.sh";

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
      <CodeBlock
        language="bash"
        title="Source: LeCoupa/awesome-cheatsheets"
        showLineNumbers
      >
        {data}
      </CodeBlock>
    </div>
  );
}
