import React, { FC, useState } from "react";
import { useInterval } from "@chakra-ui/react";
import { generateJSON } from "@tiptap/react";
import { WatchProps, Content, LookupProps } from "@retap/types";

export const Watch: FC<WatchProps> = ({ delay = 0, children, extensions }) => {
  const [content, setContent] = useState<Content>();

  useInterval(() => {
    const localContent = localStorage.getItem("content");
    localContent && setContent(generateJSON(localContent, extensions));
  }, delay);

  return (
    <>
      {content?.content?.map((con, key) => (
        <Lookup children={children} content={con} key={key} />
      ))}
    </>
  );
};

export const Lookup: (props: LookupProps) => any = ({ content, children }) => {
  const type = content.type;
  const attrs = content.attrs;

  switch (type) {
    case "horizontalRule":
      return children({ type, attrs, content: content });
    case "bulletList":
      return children({ type, attrs, content: content });

    case "orderedList":
      return children({ type, attrs, content: content });
    case "table":
      return children({ type, attrs, content: content });
    case "image":
      return children({ type, attrs, content: content });
    case "video":
      return children({ type, attrs, content: content });
    case "codeBlock":
      return children({ type, attrs, content: content });
    case "heading":
      return children({ type, attrs, content: content });
    case "youtube":
      return children({ type, attrs, content: content });
    default:
      return children({ type, attrs, content: content });
  }
};
