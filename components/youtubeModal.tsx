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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  HStack,
  Text,
} from "@chakra-ui/react";
import { insertYoutubeVideo } from "@chakra-editor/functions";
import { YoutubeInputs } from "@chakra-editor/types";
import { useRetap } from "@chakra-editor/provider";
import { MdClose } from "react-icons/md";
import { Editor } from "@tiptap/react";
import { useForm } from "@chakra-editor/hooks";
import React, { FC } from "react";

export const YoutubeModal: FC<{
  editor: Editor;
}> = ({ editor }) => {
  const { youtube } = useRetap();
  const { handler } = useForm<YoutubeInputs>();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    const data = handler(e);

    let { mins, secs, src } = data;

    secs = secs > 60 ? 60 : secs;
    let start = mins * 60 + parseInt(secs as any);
    insertYoutubeVideo({ editor, src, start });
    youtube.modalProps.onClose!();
  };

  const handleClose = () => {
    youtube.modalProps.onClose!();
  };

  const attr = editor.getAttributes("youtube").start || 0;
  const previousMins = Math.floor((attr % 3600) / 60)
    .toString()
    .padStart(2, "0");

  const previousSecs = Math.floor(attr % 60)
    .toString()
    .padStart(2, "0");

  return (
    <Modal
      isOpen={youtube?.modalProps?.isOpen!}
      onClose={handleClose}
      motionPreset="none"
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={submitHandler}>
          <ModalHeader>Youtube Settings</ModalHeader>
          <ModalCloseButton as={"div"}>
            <IconButton
              aria-label="close-youtube-editor"
              size={"sm"}
              variant={"ghost"}
              onClick={youtube?.modalProps?.onClose!}
              icon={<MdClose size={22} />}
            />
          </ModalCloseButton>
          <ModalBody>
            <VStack alignItems="start" gap={1}>
              <FormLabel>Source</FormLabel>
              <InputGroup>
                <Input
                  name="src"
                  autoFocus={true}
                  placeholder="https://www.youtube.com/watch?v=vskj23kkb"
                  defaultValue={editor.getAttributes("youtube").src}
                />
              </InputGroup>
              <HStack>
                <InputGroup>
                  <VStack alignItems={"start"}>
                    <FormLabel>Minutes</FormLabel>
                    <NumberInput
                      defaultValue={previousMins}
                      min={0}
                      name="mins"
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </VStack>
                </InputGroup>
                <VStack alignItems="start" gap={1}>
                  <FormLabel>Seconds</FormLabel>
                  <InputGroup>
                    <NumberInput
                      defaultValue={previousSecs}
                      min={0}
                      max={60}
                      name="secs"
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </InputGroup>
                </VStack>
              </HStack>
              <Text textAlign="left" fontSize="sm" color="gray.600">
                Video start timing.
              </Text>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" type="submit">
              Embed Video
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
