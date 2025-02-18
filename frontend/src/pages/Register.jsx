import React, { useState } from 'react';
import {
    Box, FormControl, FormLabel, Heading, Text, Input, Button, VStack, Flex, InputGroup, InputRightElement, Container, Image, useToast
} from '@chakra-ui/react';
//import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import axios from 'axios';
import smiski_logo from '../components/smiski_logo.png';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const toast = useToast(); // Use Chakra's toast hook

    // State for form data
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
    const handleClick = () => setShowPassword(!showPassword);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle password visibility
    const handleClickConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    // Register User Function
    const registerUser = async (e) => {
        e.preventDefault();

        const { name, email, password, confirmPassword } = data;

        // Validate inputs before making the API call
        if (!name || !email || !password  || !confirmPassword ) {
            toast({
                title: 'Error',
                description: 'Please fill in all fields.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            return; // Stop execution
        }

        if (password !== confirmPassword) {
            toast({
                title: 'Error',
                description: 'Passwords do not match.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/register', { name, email, password });
        
            if (response.data.error) {
                toast({
                    title: 'Error',
                    description: response.data.error,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                });
            } else {
                setData({ name: '', email: '', password: '', confirmPassword: '' }); 
                toast({
                    title: 'Success',
                    description: 'Register Successful. Welcome!',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
                navigate('/');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
            toast({
                title: 'Error',
                description: errorMessage,
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }        
    };

    return (
        <Flex
            direction="column"
            justify="center"
            align="center"
            minHeight="100vh"
            bg="#71CB2E"
        >
            {/* Top Logo Container */}
            <Container
                maxW="100%"
                bg="#FFEB2F"
                p={6}
                h="15vh"
                position="absolute"
                top={0}
                left={0}
                zIndex={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Image src={smiski_logo} alt="Smiski Logo" h="100%" w="auto" />
            </Container>

            {/* Form Box */}
            <Box
                w={['full', 'md']}
                p={[8, 10]}
                mx="auto"
                mt={['20', '15vh']}
                borderRadius={12}
                boxShadow="lg"
                bg="white"
            >
                <VStack spacing={6} align="flex-start" w="full">
                    <VStack spacing={2} align={['flex-start', 'center']} w="full">
                        <Heading fontSize="3xl" color="#3E9121">Register</Heading>
                        <Text color="gray.500">Welcome! Register Here.</Text>
                    </VStack>
                </VStack>

                <Box mt={6}>
                    <form onSubmit={registerUser}>
                        {/* Name Input */}
                        <FormControl mb={4}>
                            <FormLabel fontWeight="bold" color="gray.700">Name</FormLabel>
                            <Input
                                id="name"
                                rounded="full"
                                type="text"
                                placeholder="Enter your Name"
                                variant="filled"
                                bg="gray.50"
                                color="gray.800"
                                _hover={{ bg: 'gray.100' }}
                                _focus={{ bg: 'gray.100', borderColor: '#3E9121' }}
                                focusBorderColor="#3E9121"
                                value={data.name} // Controlled input
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                            />
                        </FormControl>

                        {/* Email Input */}
                        <FormControl mb={4}>
                            <FormLabel fontWeight="bold" color="gray.700">Email Address</FormLabel>
                            <Input
                                id="email"
                                rounded="full"
                                type="email"
                                placeholder="Enter your Email Address"
                                variant="filled"
                                bg="gray.50"
                                color="gray.800"
                                _hover={{ bg: 'gray.100' }}
                                _focus={{ bg: 'gray.100', borderColor: '#3E9121' }}
                                focusBorderColor="#3E9121"
                                value={data.email} // Controlled input
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                            />
                        </FormControl>

                        {/* Password Input */}
                        <FormControl mb={4}>
                            <FormLabel fontWeight="bold" color="gray.700">Password</FormLabel>
                            <InputGroup>
                                <Input
                                    id="password"
                                    rounded="full"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your Password"
                                    variant="filled"
                                    bg="gray.50"
                                    color="gray.800"
                                    _hover={{ bg: 'gray.100' }}
                                    _focus={{ bg: 'gray.100', borderColor: '#3E9121' }}
                                    focusBorderColor="#3E9121"
                                    value={data.password} // Controlled input
                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                />
                                <InputRightElement width="4rem">
                                    <Button
                                        h="1.75rem"
                                        size="sm"
                                        onClick={handleClick}
                                        bg="transparent"
                                        color="gray.700"
                                        _hover={{ bg: 'transparent' }}
                                        _active={{ bg: 'gray.400' }}
                                    >
                                        {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>

                        {/* Retype Password Input */}
                        <FormControl mb={8}>
                            <FormLabel fontWeight="bold" color="gray.700">Retype Password</FormLabel>
                            <InputGroup>
                                <Input
                                    id="confirm-password"
                                    rounded="full"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Retype your Password"
                                    variant="filled"
                                    bg="gray.50"
                                    color="gray.800"
                                    _hover={{ bg: 'gray.100' }}
                                    _focus={{ bg: 'gray.100', borderColor: '#3E9121' }}
                                    focusBorderColor="#3E9121"
                                    value={data.confirmPassword}
                                    onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                                />
                                <InputRightElement width="4rem">
                                    <Button
                                        h="1.75rem"
                                        size="sm"
                                        onClick={handleClickConfirmPassword}
                                        bg="transparent"
                                        color="gray.700"
                                        _hover={{ bg: 'transparent' }}
                                        _active={{ bg: 'gray.400' }}
                                    >
                                        {showConfirmPassword ? <IoMdEyeOff /> : <IoMdEye />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>

                        {/* Submit Button */}
                        <Button
                            w="full"
                            rounded="full"
                            colorScheme="green"
                            size="lg"
                            bg="#3E9121"
                            _hover={{ bg: 'green.600' }}
                            _active={{ bg: 'green.700' }}
                            type="submit"
                        >
                            Register
                        </Button>
                    </form>
                </Box>
            </Box>
        </Flex>
    );
};

export default Register;
