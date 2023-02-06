import { SpinnerProps, CenterProps, Center, Spinner } from "@chakra-ui/react";
import React, { FC } from "react";

export const Loader: FC<{ spinnerStyles?: SpinnerProps } & CenterProps> = ({
  spinnerStyles,
  ...styles
}) => {
  return (
    <Center h="full" {...styles}>
      <Spinner speed="600ms" {...spinnerStyles} />
    </Center>
  );
};
