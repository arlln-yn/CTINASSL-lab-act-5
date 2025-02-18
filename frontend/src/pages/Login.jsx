import React, { useState } from 'react';
import {
    Box,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Text,
    VStack,
    Input,
    Button,
    InputGroup,
    InputRightElement,
    Flex,
    Container,
    Image,
    useToast,
    // getToken
} from '@chakra-ui/react';

import { Link, useNavigate } from 'react-router-dom';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import smiski_logo from '../components/smiski_logo.png';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const toast = useToast(); 
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => setShowPassword(!showPassword);

    // Handle login
    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = data;
    
        if (!email || !password) {
            toast({
                title: 'Error',
                description: 'Please enter both email and password.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            return;
        }
    
        try {
            const response = await axios.post(
                "http://localhost:5000/login",
                { email, password },
                { withCredentials: true } // allow cookies to be sent with the request
            );
                
            if (response.data.error) {
                toast({
                    title: 'Error',
                    description: response.data.error,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                });
            } else {
                // store token in lOCAAL STORAGE ===============
                localStorage.setItem('token', response.data.token);
    
                setData({ email: '', password: '' });
                toast({
                    title: 'Success',
                    description: 'Login successful!',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
                navigate('/products');
            }
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'An error occurred. Please try again.',
                status: 'error',
                duration: 4000,
                isClosable: true,   
            });
        }
    };    

    //logout
    const logoutUser = () => {
        localStorage.removeItem('token'); // Remove token
        window.location.href = "/";
    };
    


    return (
        <Flex
            direction="column"
            justify="center"
            align="center"
            minHeight="100vh"
            bg="#71CB2E"
        >
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

            <Box
                w={['full', 'md']}
                p={[8, 10]}
                mt={[20, '15vh']}
                mx="auto"
                borderRadius={12}
                boxShadow="lg"
                bg="white"
            >
                <VStack spacing={6} align="flex-start" w="full">
                    <VStack spacing={2} align={['flex-start', 'center']} w="full">
                        <Heading fontSize="3xl" color="#3E9121">Login</Heading>
                        <Text color="gray.500">Welcome back! Please login to your account.</Text>
                    </VStack>
                </VStack>

                <Box mt={6}>
                    <form onSubmit={loginUser}>
                        <FormControl mb={4}>
                            <FormLabel htmlFor="email" fontWeight="bold" color="gray.700">Email Address</FormLabel>
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

                        <FormControl mb={2}>
                            <FormLabel htmlFor="password" fontWeight="bold" color="gray.700">Password</FormLabel>
                            <InputGroup>
                                <Input
                                    id="password"
                                    rounded="full"
                                    type={showPassword ? "text" : "password"} // Toggle input type
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
                                <InputRightElement width="4rem" justifyContent="center">
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

                        <HStack w="full" justify="center" align="center" mb={6}>
                            <Text color="gray.500">
                                Don't have an account?{' '}
                                <Button
                                    as={Link}
                                    to="/register"
                                    variant="link"
                                    color="#3E9121"
                                    fontWeight="bold"
                                    p={0}
                                >
                                    Click here to Register.
                                </Button>
                            </Text>
                        </HStack>

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
                            Login
                        </Button>
                    </form>
                </Box>
            </Box>
        </Flex>
    );
};

export default Login;