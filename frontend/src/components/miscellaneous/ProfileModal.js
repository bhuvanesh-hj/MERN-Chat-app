import {
  Avatar,
  Button,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          background={"transparent"}
          icon={
            <Avatar size={"md"} src={user.pic}>
            </Avatar>
          }
          onClick={onOpen}
        />
      )}

      <Modal size={"lg"} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent height={"410px"} bg={"#E2E8F0"}>
          <ModalHeader
            fontSize={"40px"}
            display={"flex"}
            justifyContent={"center"}
            fontFamily={"cursive"}
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={6}
          >
            <Image
              src={user.pic}
              borderRadius={"full"}
              boxSize={"175px"}
              //   rounded={"25px"}
              alt={user.name}
            />
            <Text display={{ base: "28px", md: "30px" }} fontFamily={"cursive"}>
              Email: {user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProfileModal;
