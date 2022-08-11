import React from 'react';
import { useBlogPost } from '@docusaurus/theme-common/internal'
import BlogPostItem from '@theme-original/BlogPostItem';
import GiscusComponent from '@site/src/components/GiscusComponent';
import useIsBrowser from '@docusaurus/useIsBrowser';

export default function BlogPostItemWrapper(props) {
  const { metadata } = useBlogPost()
  const isBrowser = useIsBrowser();

  const { frontMatter, slug, title } = metadata
  const { comments } = frontMatter
  
  // Workaround from https://docusaurus.io/docs/advanced/ssg for the Error 'ReferenceError: window is not defined' during the build
  var currentUriIsNotBlog = false
  if(isBrowser){
    currentUriIsNotBlog = window.location.pathname != '/blog'
  }

  return (
    <>
      <BlogPostItem {...props} />
      {(comments && currentUriIsNotBlog) && (
        <GiscusComponent/>
      )}
    </>
  );
}
