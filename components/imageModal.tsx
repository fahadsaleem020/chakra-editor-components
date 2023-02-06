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
import { ImageModalInputs } from "@retap/types";
import { useRetap } from "@retap/provider";
import { useForm } from "@retap/hooks";
import { insertImage } from "@retap/functions";

export const ImageModal: FC<{
  editor: Editor;
}> = ({ editor }) => {
  const { image } = useRetap();
  const { handler } = useForm<ImageModalInputs>();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    const data = handler(e);
    insertImage({ editor, ...data });
    image.modalProps.onClose!();
  };

  const handleClose = () => {
    image.modalProps.onClose!();
  };

  return (
    <Modal
      isOpen={image?.modalProps?.isOpen!}
      onClose={handleClose}
      motionPreset="none"
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={submitHandler}>
          <ModalHeader>Image Settings</ModalHeader>
          <ModalCloseButton as={"div"}>
            <IconButton
              aria-label="close-image-editor"
              size={"sm"}
              variant={"ghost"}
              onClick={image?.modalProps?.onClose!}
              icon={<MdClose size={22} />}
            />
          </ModalCloseButton>
          <ModalBody>
            <VStack gap={1} alignItems="start">
              <FormLabel>Source</FormLabel>
              <InputGroup>
                <Input
                  name="src"
                  autoFocus
                  placeholder="example.com/image.png"
                  defaultValue={editor.getAttributes("image").src}
                />
              </InputGroup>
              <FormLabel>Title</FormLabel>
              <InputGroup>
                <Input
                  name="title"
                  placeholder="Donal trump, Adolf hitler, banana"
                  defaultValue={editor.getAttributes("image").title}
                />
              </InputGroup>
              <FormLabel>Alternative Text</FormLabel>
              <InputGroup>
                <Input
                  name="alt"
                  placeholder="disregard, peaceful, contentful"
                  defaultValue={editor.getAttributes("image").alt}
                />
              </InputGroup>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" type="submit" mr={2}>
              Set Image
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
