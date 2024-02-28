import React, { useState } from "react";
import { Box, Button, Container, VStack, Input, HStack, Text, Divider, useToast, IconButton, Flex, Spacer } from "@chakra-ui/react";
import { FaPaperPlane, FaRobot } from "react-icons/fa";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const sendMessage = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "Empty message",
        description: "You can't send an empty message.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setMessages([...messages, { text: inputValue, sender: "user" }]);
      setInputValue(""); // Clear the input field after sending a message
      // Simulate a response from the bot after a delay
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, { text: "This is a simulated response.", sender: "bot" }]);
      }, 1000);
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={4}>
        <Flex w="100%" p={5} boxShadow="md" borderRadius="md" alignItems="center">
          <Box as={FaRobot} color="blue.500" boxSize={6} />
          <Spacer />
          <Text fontSize="2xl" fontWeight="bold">
            ChatGPT Clone
          </Text>
          <Spacer />
          <Box as={FaRobot} color="blue.500" boxSize={6} transform="scaleX(-1)" />
        </Flex>
        <VStack h="400px" w="100%" p={4} spacing={4} overflowY="auto" boxShadow="md" borderRadius="md" bg="gray.50">
          {messages.map((message, index) => (
            <HStack key={index} alignSelf={message.sender === "user" ? "flex-end" : "flex-start"}>
              <Box p={3} bg={message.sender === "user" ? "blue.500" : "gray.200"} color={message.sender === "user" ? "white" : "black"} borderRadius="md">
                <Text>{message.text}</Text>
              </Box>
            </HStack>
          ))}
        </VStack>
        <Divider />
        <HStack w="100%">
          <Input placeholder="Type a message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === "Enter" && sendMessage()} flexGrow={1} />
          <IconButton icon={<FaPaperPlane />} colorScheme="blue" onClick={sendMessage} aria-label="Send message" />
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;
