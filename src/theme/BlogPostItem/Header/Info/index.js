import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { translate } from "@docusaurus/Translate";
import { usePluralForm } from "@docusaurus/theme-common";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import styles from "./styles.module.css";
import countapi from "countapi-js";
import useIsBrowser from "@docusaurus/useIsBrowser";

// Very simple pluralization: probably good enough for now
function useReadingTimePlural() {
  const { selectMessage } = usePluralForm();
  return (readingTimeFloat) => {
    const readingTime = Math.ceil(readingTimeFloat);
    return selectMessage(
      readingTime,
      translate(
        {
          id: "theme.blog.post.readingTime.plurals",
          description:
            'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: "One min read|{readingTime} min read",
        },
        { readingTime }
      )
    );
  };
}
function ReadingTime({ readingTime }) {
  const readingTimePlural = useReadingTimePlural();
  return <>{readingTimePlural(readingTime)}</>;
}
function Date({ date, formattedDate }) {
  return (
    <time dateTime={date} itemProp="datePublished">
      {formattedDate}
    </time>
  );
}
function ViewCount() {
  const [viewCount, setViewCount] = useState(0);

  const { metadata } = useBlogPost()
  const { frontMatter, slug, title } = metadata
  const { countApiKey } = frontMatter

  useEffect(() => {
    if (countApiKey !== undefined && countApiKey !== null) {
      countapi.hit(countApiKey).then((result) => {
        setViewCount(result.value);
      });
    }
  }, []);
  return <>{viewCount + " views"}</>;
}

function Spacer() {
  return <>{" · "}</>;
}
export default function BlogPostItemHeaderInfo({ className }) {
  const { metadata } = useBlogPost();
  const { date, formattedDate, readingTime } = metadata;

  const isBrowser = useIsBrowser();
  // Workaround from https://docusaurus.io/docs/advanced/ssg for the Error 'ReferenceError: window is not defined' during the build
  var currentUriIsNotBlog = false;
  if (isBrowser) {
    currentUriIsNotBlog = window.location.pathname != "/blog";
  }

  return (
    <div className={clsx(styles.container, "margin-vert--md", className)}>
      <Date date={date} formattedDate={formattedDate} />
      {typeof readingTime !== "undefined" && (
        <>
          <Spacer />
          <ReadingTime readingTime={readingTime} />
          {currentUriIsNotBlog && (
            <>
              <Spacer />
              <ViewCount />
            </>
          )}
        </>
      )}
    </div>
  );
}
