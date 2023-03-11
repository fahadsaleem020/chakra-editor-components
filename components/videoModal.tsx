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
import { VideoModalInputs } from "@chakra-editor/types";
import { useForm } from "@chakra-editor/hooks";
import { useEditor } from "@chakra-editor/provider";
import { insertVideo } from "@chakra-editor/functions";

export const VideoModal: FC<{
  editor: Editor;
}> = ({ editor }) => {
  const { video } = useEditor();
  const { handler } = useForm<VideoModalInputs>();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    const data = handler(e);
    insertVideo({ editor, ...data });
    video.modalProps.onClose!();
  };

  const handleClose = () => {
    video.modalProps.onClose!();
  };

  return (
    <Modal
      isOpen={video?.modalProps?.isOpen!}
      onClose={handleClose}
      motionPreset="none"
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={submitHandler}>
          <ModalHeader>Video Settings</ModalHeader>
          <ModalCloseButton as={"div"}>
            <IconButton
              aria-label="close-video-editor"
              size={"sm"}
              variant={"ghost"}
              onClick={video?.modalProps?.onClose}
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
                  placeholder="example.com/video.mp4"
                  defaultValue={editor.getAttributes("video").src}
                />
              </InputGroup>
              <FormLabel>Title</FormLabel>
              <InputGroup>
                <Input
                  name="title"
                  placeholder="Donal trump, Adolf hitler, banana"
                  defaultValue={editor.getAttributes("video").title}
                />
              </InputGroup>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" type="submit" mr={2}>
              Set Video
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
