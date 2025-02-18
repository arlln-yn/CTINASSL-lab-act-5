import React from 'react'
import {
  Box,
  Image,
  Heading,
  Text,
  VStack,
  IconButton,
  useColorModeValue,
  Button,
  Spacer,
  Container
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import allproductspic from "../components/allproductspic.png";

const SeriesPreviewPage = () => {

  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bg = useColorModeValue('white', '#494848');


  return (

    <Container maxW="container.xl" py={12}>
      <Container
        maxW="100%"
        bg="#71CB2E"
        p={12}
        h="8vh"
        position="absolute"
        top="11vh"
        left={0}
        zIndex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text

          fontSize={{ base: "42", sm: "48" }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          color="#527E2E"
          fontFamily="'Comic Sans MS', cursive"
          p={2}
        >
          Products
        </Text>
      </Container>

      <Box h="11vh" />
      <VStack spacing={8} justify="center">
        <Box
          shadow="lg"
          rounded="lg"
          overflow="hidden"
          transition="all 0.3s"
          _hover={{
            transform: "translateY(-5px)",
            shadow: "xl",
          }}
          bg={bg}
          w={{ base: "80%", sm: "60%", md: "40%" }}
        >
          {/* Series Image */}
          <Image
            //src="https://smiski.com/wp-content/uploads/2022/12/smiski.com_product_icon01_v2.png"
            src={allproductspic}
            h={48}
            w="full"
            objectFit="cover"
          />

          {/* Series Title */}
          <Box p={4} textAlign="center">
            <Button as={Link} to="/products/all-products" colorScheme="green" size="md" variant="link" fontFamily="'Comic Sans MS', cursive">
              All Products
            </Button>
          </Box>
        </Box>

        <Box
          shadow="lg"
          rounded="lg"
          overflow="hidden"
          transition="all 0.3s"
          _hover={{
            transform: "translateY(-5px)",
            shadow: "xl",
          }}
          bg={bg}
          w={{ base: "80%", sm: "60%", md: "40%" }}
        >
          {/* Series Image */}
          <Image
            src="https://smiski.com/wp-content/uploads/2022/12/smiski.com_product_icon01_v2.png"
            h={48}
            w="full"
            objectFit="cover"
          />

          {/* Series Title */}
          <Box p={4} textAlign="center">
            <Button as={Link} to="/products/series1" colorScheme="green" size="md" variant="link" fontFamily="'Comic Sans MS', cursive">
              Series 1
            </Button>
          </Box>
        </Box>

        <Box
          shadow="lg"
          rounded="lg"
          overflow="hidden"
          transition="all 0.3s"
          _hover={{
            transform: "translateY(-5px)",
            shadow: "xl",
          }}
          bg={bg}
          w={{ base: "80%", sm: "60%", md: "40%" }}
        >
          {/* Series Image */}
          <Image
            src="https://smiski.com/wp-content/uploads/2022/11/smiski.com_product_icon02.png"
            h={48}
            w="full"
            objectFit="cover"
          />

          {/* Series Title */}
          <Box p={4} textAlign="center">
            <Button as={Link} to="/products/series2" colorScheme="green" size="md" variant="link" fontFamily="'Comic Sans MS', cursive">
              Series 2
            </Button>
          </Box>
        </Box>


        <Box
          shadow="lg"
          rounded="lg"
          overflow="hidden"
          transition="all 0.3s"
          _hover={{
            transform: "translateY(-5px)",
            shadow: "xl",
          }}
          bg={bg}
          w={{ base: "80%", sm: "60%", md: "40%" }}
        >
          {/* Series Image */}
          <Image
            src="https://smiski.com/wp-content/uploads/2022/11/smiski.com_product_icon03.png"
            h={48}
            w="full"
            objectFit="cover"
          />

          {/* Series Title */}
          <Box p={4} textAlign="center">
            <Button as={Link} to="/products/series3" colorScheme="green" size="md" variant="link" fontFamily="'Comic Sans MS', cursive">
              Series 3
            </Button>
          </Box>
        </Box>
      </VStack>
    </Container>
  );
};

export default SeriesPreviewPage