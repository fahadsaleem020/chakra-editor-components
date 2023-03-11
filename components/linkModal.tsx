import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  IconButton,
  ModalBody,
  VStack,
  InputGroup,
  Input,
  ModalFooter,
  Button,
  FormLabel,
} from "@chakra-ui/react";
import { Editor } from "@tiptap/react";
import React, { FC } from "react";
import { MdClose } from "react-icons/md";
import { LinkInputs } from "@chakra-editor/types";
import { insertUrl } from "@chakra-editor/functions";
import { useForm } from "@chakra-editor/hooks";

export const LinkModal: FC<{
  isOpen: boolean;
  onClose(): void;
  editor: Editor;
}> = ({ isOpen, onClose, editor }) => {
  const { handler } = useForm<LinkInputs>();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    const data = handler(e);
    insertUrl({ editor, ...data });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="none">
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={submitHandler}>
          <ModalHeader>Link Settings</ModalHeader>
          <ModalCloseButton as={"div"}>
            <IconButton
              aria-label="close-image-editor"
              size={"sm"}
              variant={"ghost"}
              onClick={onClose}
              icon={<MdClose size={22} />}
            />
          </ModalCloseButton>
          <ModalBody>
            <VStack gap={1} alignItems="start">
              <FormLabel>Past or Add url</FormLabel>
              <InputGroup>
                <Input
                  name="url"
                  autoFocus
                  placeholder="www.touchme.com"
                  defaultValue={editor.getAttributes("link").href}
                />
              </InputGroup>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" type="submit" mr={2}>
              Set Url
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
