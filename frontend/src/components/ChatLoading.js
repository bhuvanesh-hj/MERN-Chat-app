import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

const ChatLoading = () => {
  return (
    <Stack>
      <Skeleton height={"65px"} rounded={"xl"} />
      <Skeleton height={"65px"} rounded={"xl"} />
      <Skeleton height={"65px"} rounded={"xl"} />
      <Skeleton height={"65px"} rounded={"xl"} />
      <Skeleton height={"65px"} rounded={"xl"} />
      <Skeleton height={"65px"} rounded={"xl"} />
      <Skeleton height={"65px"} rounded={"xl"} />
      <Skeleton height={"65px"} rounded={"xl"} />
    </Stack>
  );
};

export default ChatLoading;
