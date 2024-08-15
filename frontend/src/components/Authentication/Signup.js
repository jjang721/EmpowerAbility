import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, {useState} from 'react'
import { useToast } from '@chakra-ui/react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const Signup = () => {

  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast()
  const history = useNavigate();

  const handleClick = () => setShow(!show);

  const submitHandler = async() => {
    setLoading(true)
    if (!name || !email || !password || !confirmPassword) {
       toast({
          title: 'Please fill out all fields',
          status: 'warning',
          duration: 9000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false)
        return;
    }
    if (password !== confirmPassword){
      toast({
          title: 'Passwords do not match',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
    }
    try{

      const config = {
        headers: {
          "Content-type": "application/json",

        },
      };
      const { data } = await axios.post("/api/user", {name,email,password,pic},config);
       toast({
          title: 'Register Success',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        history.push('/chats')
    }catch (error){
      toast({
          title: 'Error',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false)
    }
  };


  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "special-education-app");
      data.append("cloud_name", "duhtncfqo");
      fetch("https://api.cloudinary.com/v1_1/duhtncfqo/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  
  return (
  <VStack spacing ='5px' >
      <FormControl id ='first-name' isRequired>
        <FormLabel color = 'black'>Name</FormLabel>
        <Input 
        placeholder = 'Enter your name'
        onChange = {(e) =>setName(e.target.value)}
         />
      </FormControl>
      <FormControl id ='email'isRequired>
        <FormLabel color = 'black'>Email</FormLabel>
        <Input 
        placeholder = 'Enter your email'
        onChange = {(e) =>setEmail(e.target.value)}
         />
      </FormControl>
      <FormControl id ="password" isRequired>
        <FormLabel color = 'black'>Password</FormLabel>
        <InputGroup>
        <Input 
        type={show ? "text": 'password'}
        placeholder = 'Enter your password'
        onChange = {(e) =>setPassword(e.target.value)}
         />
         <InputRightElement width = '4.5rem'>
         <Button h='1.75rem' size='sm' onClick={handleClick}>
           {show ? "Hide" : "Show"}
         </Button>
         </InputRightElement>
        </InputGroup>
      </FormControl>
       <FormControl id ="confirm_password" isRequired>
        <FormLabel color = 'black'>Confirm Password</FormLabel>
        <InputGroup>
        <Input 
        type={show ? "text": "password"}
        placeholder = 'Confirm your password'
        onChange = {(e) =>setConfirmPassword(e.target.value)}
         />
         <InputRightElement width = '4.5rem'>
         <Button h='1.75rem' size='sm' onClick={handleClick}>
           {show ? "Hide" : "Show"}
         </Button>
         </InputRightElement>
        </InputGroup>
      </FormControl>

        <FormControl id ="pic" isRequired>
        <FormLabel color = "black">Update Your Picture</FormLabel>
        <Input 
        type = 'file'
        padding={1.5}
        accept='image/*'
        onChange = {(e) =>postDetails(e.target.files[0])}
         />
      </FormControl>

      <Button colorScheme='blue' width ='100%' style = {{marginTop: 15}} onClick = {submitHandler} 
      isLoading={loading}>
        Sign Up!
      </Button>
    </VStack>
  );
};

export default Signup
