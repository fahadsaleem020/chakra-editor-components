import React, { FC, useState } from "react";
import { useInterval } from "@chakra-ui/react";
import { generateJSON } from "@tiptap/react";
import { WatchProps, Content } from "@chakra-editor/types";

export const Watch: FC<WatchProps> = ({ delay = 0, children, extensions }) => {
  const [content, setContent] = useState<Content>();

  useInterval(() => {
    const localContent = localStorage.getItem("content");
    localContent && setContent(generateJSON(localContent, extensions));
  }, delay);

  return (
    <>
      {content?.content?.map((con, key) => (
        <React.Fragment key={key}>
          {children({ content: con, attrs: con.attrs, type: con.type })}
        </React.Fragment>
      ))}
    </>
  );
};

