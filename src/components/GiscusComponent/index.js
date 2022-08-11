import React from 'react';
import Giscus from "@giscus/react";
import { useColorMode } from '@docusaurus/theme-common';

import styles from './styles.module.css';

export default function GiscusComponent() {
  const isDarkColorMode = useColorMode().colorMode === "dark";
  const currentColorMode = isDarkColorMode ? "dark" : "light";

  return (
    <Giscus    
      repo="m19v/giscus-repo"
      repoId="R_kgDOHzSRww"
      category="General"
      categoryId="DIC_kwDOHzSRw84CQvbu"
      mapping="url"
      term="Welcome to @giscus/react component!"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="1"
      inputPosition="top"
      theme={currentColorMode}
      lang="en"
      loading="lazy"
      crossorigin="anonymous"
      async
    />
  );
}