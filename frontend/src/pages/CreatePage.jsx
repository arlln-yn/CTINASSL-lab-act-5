import { Box, Text, Spacer, Container, Heading, useColorModeValue, VStack, Button, Input, useToast, Select, Textarea  } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    series: ''
  });

  const toast = useToast();
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    // Validation to ensure all required fields are filled
    if (!newProduct.name || !newProduct.price || !newProduct.image || !newProduct.series || !newProduct.description) {
      toast({
        title: "Error",
        description: "All fields must be filled.",
        status: "error",
        isClosable: true,
      });
      return;
    }

    // Attempt to create the product
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: "Error",
        description: message || "Failed to create the product.",
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Product successfully created.",
        status: "success",
        isClosable: true,
      });
      // Resetting the form after successful submission
      setNewProduct({ name: '', price: '', image: '', description: '', series: '' });
    }
  };

  return (
    <Container maxW="container.xl" py={0}>
      <VStack spacing={8} >

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
            fontSize={{ base: "40", sm: "48" }}
            fontWeight="bold"
            textTransform="uppercase"
            textAlign="center"
            color="#527E2E"
            fontFamily="'Comic Sans MS', cursive"
            p={2}
          >
            Create New Smiski
          </Text>
        </Container>

        <Box h="17vh" />

        <Box
          w="100vh"
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />

            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
              }
            />

            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <Textarea 
              placeholder="Description"
              name="description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />

            <Select
              placeholder="Select Series"
              value={newProduct.series}
              onChange={(e) =>
                setNewProduct({ ...newProduct, series: e.target.value })
              }
            >
              <option value="Series 1">Series 1</option>
              <option value="Series 2">Series 2</option>
              <option value="Series 3">Series 3</option>
            </Select>

            <Button color = '#527E2E' onClick={handleAddProduct} w="full">
              Add Product
            </Button>
            
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;