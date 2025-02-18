import { 
    Box, 
    HStack, 
    Text, 
    IconButton, 
    Image, 
    Heading, 
    useColorModeValue, 
    useToast, 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    VStack,
    Input,
    useDisclosure,
    Button,
    ModalFooter,
    Textarea,
    Select,
  } from '@chakra-ui/react';
  import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
  import React, { useState, useEffect } from 'react';
  import { useProductStore } from '../store/product'; 

const ProductCard = ({product}) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const textColor = useColorModeValue('gray.600', 'gray.200');
    const bg = useColorModeValue('white', 'gray.800');

    const { deleteProduct } = useProductStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    const handleDeleteProduct = async (pid) => {
        const {success, message} = await deleteProduct(pid);
        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true,
            });
            } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true,
            });
        }
    };

    const { updateProduct } = useProductStore();
    const handleUpdateProduct = async (pid, updatedProduct) => {
        const {success, message} = await updateProduct(pid, updatedProduct);
        onClose();
        if(!success) {
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
        }
    }


    const getSeriesColor = (series) => {
        if (series === 'Series 1') return '#71CB2E';
        if (series === 'Series 2') return '#C05714'
        if (series === 'Series 3') return '#8586C6';
        return 'gray'; // default color
    };


  return (
    <Box
    h = {550}
    shadow ='lg'
    rounded = 'lg'
    overflow = 'hidden'
    transition = 'all 0.3s'
    _hover = {{
    transform: 'translateY(-5px)',
    shadow: 'xl'
    }}
    bg = "white"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center" 

    >
        <Image src  = {product.image} alt = {product.name} h = "300px" w = "auto" objectFit = 'contain' paddingBottom={3} mt = {4}/>
        
        <Box p={10} bg={getSeriesColor(product.series)}>
            <Heading as = 'h3' 
            size='md' 
            mb = {10}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            _hover={{ transform: "scale(1.05)", transition: "0.3s" }}>
                {product.name}
                </Heading>

                <Text color="white.600" fontSize="sm" mb={2}>
                  {product.series || "No series"}
                </Text>
                <Text fontWeight="bold" fontSize="md" color="teal.800" mb={4}>
                    ₱{product.price}
                </Text>
                <Text fontSize="sm" noOfLines={2} color="gray.700">
                  {product.description || "No description available"}
                </Text>
            
            <HStack spacing = {2} justify= "flex-end" mt = {6}>
                <IconButton icon={<EditIcon />} 
                onClick={onOpen}
                colorScheme ='blue' />
                <IconButton icon={<DeleteIcon />} onClick = {() => handleDeleteProduct(product._id)} 
                colorScheme='red' />
                </HStack>
        </Box>   

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />

            <ModalContent>
                <ModalHeader>Product Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing = {4}>
                        <Input
                        placeholder = 'Product Name'
                        name='name'
                        value = {updatedProduct.name}
                        onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
                        />
                        <Input
                        placeholder = 'Price'
                        name='price'
                        type = 'number'
                        value = {updatedProduct.price}
                        onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
                        />
                        <Input
                        placeholder = 'Image URL'
                        name='image'
                        value = {updatedProduct.image}
                        onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
                        />
                        <Textarea
                        placeholder = 'Description'
                        name='description'
                        value = {updatedProduct.description}
                        onChange={(e) => setUpdatedProduct({...updatedProduct, description: e.target.value})}
                        />
                        <Select
                            placeholder="Select Series"
                            name='series'
                            value={updatedProduct.series}
                            onChange={(e) =>
                                setUpdatedProduct({ ...updatedProduct, series: e.target.value })
                            }
                        >
                            <option value="Series 1">Series 1</option>
                            <option value="Series 2">Series 2</option>
                            <option value="Series 3">Series 3</option>
                        </Select>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}
                        onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                        >
                            Update
                        </Button>
                        <Button variant = 'ghost' onClick={onClose}>
                            Cancel
                        </Button>
                        </ModalFooter>
            </ModalContent>

            
        </Modal>


    </Box>
  )
}

export default ProductCard