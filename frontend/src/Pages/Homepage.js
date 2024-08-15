import React, { useEffect } from 'react'
import {Container, Box, Text, Tab, TabList,TabPanel,TabPanels,Tabs} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useNavigate } from 'react-router-dom';

const Homepage = () => {

  const history = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"))

        if (user) history("/chats");
    }, [history]);
    
  return <Container maxW= "xl" centerContent>
    <Box display= "flex" 
    justifyContent="center" 
    padding = {3}
    backgroundColor = "black"
    width = "100%"
    margin = "40px 0 15px 0 "
    borderRadius = "lg"
    borderWidth = "1px"
    >
      <Text fontSize = '4xl' fontFamily="Work sans" color="white">KASEC Messaging System</Text>
    </Box>
    <Box
    bg = "white" 
    width = "100%"
    padding={4}
    color = "black"
    borderRadius = "lg"
    borderWidth = "1px"
    >
      <Tabs variant='soft-rounded'>
  <TabList mb = "1em">
    <Tab width = "50%">Login</Tab>
    <Tab width = "50%">Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login/> 
    </TabPanel>
    <TabPanel>
     <Signup/>
    </TabPanel>
  </TabPanels>
</Tabs>

    </Box>
    </Container>;
  
};

export default Homepage
