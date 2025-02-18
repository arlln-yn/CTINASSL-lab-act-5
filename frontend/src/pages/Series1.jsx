import {
  Container,
  VStack,
  Text,
  SimpleGrid,
  HStack,
  Button,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Select,
  useDisclosure,
  useToast,
  Spacer,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, PlusSquareIcon, DragHandleIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from '../store/product'
import ProductCard from "../components/ProductCard";

const Series1 = () => {
  const { fetchSeries1, products, deleteProduct, updateProduct } = useProductStore();
  const [isTableView, setIsTableView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({}); // Empty state for modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetchSeries1();
  }, [fetchSeries1]);

  const toggleView = () => {
    setIsTableView((prev) => !prev);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setUpdatedProduct(product); // Set the product details to the modal state
    onOpen();
  };

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Product deleted successfully.",
        status: "success",
        isClosable: true,
      });
    }
  }


  const handleUpdateProduct = async () => {
    const { success, message } = await updateProduct(selectedProduct._id, updatedProduct);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Product updated successfully.",
        status: "success",
        isClosable: true,
      });
      onClose();
    }
  };

  return (
    <Container maxW="container.xl" py={0}>
      <VStack spacing={6} py={24}>
        
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
            Series 1
          </Text>
        </Container>

        <Spacer />
        <HStack spacing={4} justify={"flex-ends"} w="full">
          <Spacer />

          <IconButton
            onClick={toggleView}
            bg="#71CB2E" 
            color="#527E2E" 
            _hover={{ bg: "#5FAF29", color: "#3E6622" }} 
            _active={{ bg: "#4E9E1E", color: "#3A5C1A" }} 
            aria-label={isTableView ? "Switch to Grid View" : "Switch to Table View"}
            icon={<DragHandleIcon fontSize="24px" />}
            size="lg"
          />
        </HStack>

        {isTableView ? (
          <TableContainer w="full">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Product Name</Th>
                  <Th>Series</Th>
                  <Th>Price</Th>
                  <Th>Description</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map((product) => (
                  <Tr key={product._id}>
                    <Td>{product._id}</Td>
                    <Td>{product.name}</Td>
                    <Td>{product.series || "N/A"}</Td>
                    <Td>{product.price}</Td>
                    <Td>{product.description}</Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          icon={<EditIcon />}
                          colorScheme="blue"
                          size="sm"
                          onClick={() => handleEdit(product)}
                          aria-label="Edit Product"
                        />
                        <IconButton
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          size="sm"
                          onClick={() => handleDeleteProduct(product._id)}
                          aria-label="Delete Product"
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w={"full"}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        )}

        {products.length === 0 && (
          <Text fontSize="xl" textAlign={"center"} fontWeight="bold" color="gray.500">
            No products found.{" "}
            <Link to={"/create"}>
              <Text as="span" color="blue.500" _hover={{ textDecoration: "underline" }}>
                Create a new product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Product Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                value={updatedProduct.name || ""}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
              />
              <Input
                placeholder="Price"
                type="number"
                value={updatedProduct.price || ""}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
              />
              <Input
                placeholder="Image URL"
                value={updatedProduct.image || ""}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
              />
              <Textarea
                placeholder="Description"
                value={updatedProduct.description || ""}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, description: e.target.value })
                }
              />
              <Select
                placeholder="Select Series"
                value={updatedProduct.series || ""}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, series: e.target.value })}
              >
                <option value="Series 1">Series 1</option>
                <option value="Series 2">Series 2</option>
                <option value="Series 3">Series 3</option>
              </Select>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUpdateProduct}>
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <HStack
        spacing={2}
        justify="flex-end"
        w="full"
        position="fixed"
        bottom="20px"
        right="20px"
      >
        <Link to="/create">
          <Button
            size="lg"
            w="60px" // Width
            h="60px" // Height
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="#71CB2E" 
            color="#527E2E" 
            _hover={{ bg: "#5FAF29", color: "#3E6622" }} 
            _active={{ bg: "#4E9E1E", color: "#3A5C1A" }} 
            borderRadius="full" // To make the button round
          >
            <PlusSquareIcon fontSize={35} />
          </Button>
        </Link>
      </HStack>
    </Container>
  )
}

export default Series1