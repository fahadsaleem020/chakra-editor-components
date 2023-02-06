import { insertUrl, removeUrl } from "@retap/functions";
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { MdCheck, MdLinkOff } from "react-icons/md";
import React, { FC } from "react";
import type { Editor } from "@tiptap/react";
import { LinkInputs } from "@retap/types";
import { useForm } from "@retap/hooks";

export const LinkEditor: FC<{
  editor: Editor;
  isVisible: boolean;
  SetIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ editor, isVisible, SetIsVisible }) => {
  const { handler } = useForm<LinkInputs>();
  if (!isVisible) return null;

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    const data = handler(e);
    insertUrl({ editor, ...data });
    SetIsVisible(false);
  };

  return (
    <form onSubmit={submitHandler}>
      <InputGroup w="xs">
        <Input
          name="url"
          autoFocus={true}
          pr="4.5rem"
          placeholder="www.example.com"
          defaultValue={editor.getAttributes("link").href}
        />
        <InputRightElement width="5rem">
          <IconButton
            aria-label="link-done"
            icon={<MdCheck size={17} />}
            size="sm"
            mr="1"
            type="submit"
          />
          <IconButton
            icon={<MdLinkOff size={17} />}
            aria-label="remove-link"
            size="sm"
            onClick={() => {
              SetIsVisible(false);
              removeUrl({ editor });
            }}
            type="button"
          />
        </InputRightElement>
      </InputGroup>
    </form>
  );
};
