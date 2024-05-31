import React from 'react'
import Appbar from '../Components/Appbar'
import AccountProvider from "../context/AccountProvider";
import { Container,Typography, Divider } from '@mui/material';


function Services() {
  return (
    <>
        <AccountProvider>
         <Appbar />
        </AccountProvider>

        <Container sx={{ width: "100%", position:"relative", top: "9rem", left: "0.4rem"}}>
            <Typography variant="header1" fontWeight="bold">
                Welcome to CollabNSpeak! 
            </Typography>

            <Typography variant="body1" sx={{ marginTop: "1rem", width: "90%", marginLeft: "1rem", textAlign: "justify",fontFamily: "Montserrat"}} >
            At CollabNSpeak, we provide a comprehensive platform for language practice and skill development through 
            engaging activities and interactive features. Explore our diverse range of services designed to enhance your 
            language learning experience:
            </Typography>
            <Divider sx={{ marginTop: "1rem", width: "90%", marginLeft: "1rem"}}></Divider>
        </Container>

        <Container sx={{ width: "100%", position:"relative", top: "10.5rem", left: "0.4rem"}}>
            <Typography variant="header2" fontWeight="bold" sx={{ marginTop: "1rem", width: "90%", marginLeft: "1rem"}}>
                Ice-Breaking Sessions
            </Typography>

            <Typography variant="body1" sx={{ marginTop: "1rem", width: "90%", marginLeft: "1rem", textAlign: "justify",fontFamily: "Montserrat"}} >
            Start your language journey by breaking the ice in a relaxed and supportive environment. Our structured ice-breaking 
            sessions help you overcome language barriers and build confidence in speaking your target language.
            </Typography>
        </Container>

        <Container sx={{ width: "100%", position:"relative", top: "12.5rem", left: "0.4rem"}}>
            <Typography variant="header2" fontWeight="bold" sx={{ marginTop: "1rem", width: "90%", marginLeft: "1rem"}}>
            Debate Clubs
            </Typography>

            <Typography variant="body1" sx={{ marginTop: "1rem", width: "90%", marginLeft: "1rem", textAlign: "justify",fontFamily: "Montserrat"}} >
            Join lively debate clubs to hone your language skills while exploring 
            diverse topics and viewpoints. Engage in stimulating discussions and learn
            to articulate your thoughts effectively in your chosen language.
            </Typography>
        </Container>

        <Container sx={{ width: "100%", position:"relative", top: "14.5rem", left: "0.4rem"}}>
            <Typography variant="header2" fontWeight="bold" sx={{ marginTop: "1rem", width: "90%", marginLeft: "1rem"}}>
            Group Discussions
            </Typography>

            <Typography variant="body1" sx={{ marginTop: "1rem", width: "90%", marginLeft: "1rem", textAlign: "justify",fontFamily: "Montserrat"}} >
            Participate in dynamic group discussions facilitated by
            experienced moderators. Collaborate with fellow learners to exchange ideas, 
            share experiences, and improve your language fluency through interactive conversations.
            </Typography>
        </Container>

        <Container sx={{ width: "100%", position:"relative", top: "16.5rem", left: "0.4rem"}}>
            <Typography variant="header2" fontWeight="bold" sx={{ marginTop: "1rem", width: "90%", marginLeft: "1rem"}}>
            Video Call Feature
            </Typography>

            <Typography variant="body1" sx={{ marginTop: "1rem", width: "90%", marginLeft: "1rem", textAlign: "justify",fontFamily: "Montserrat"}} >
            Experience real-time communication with our integrated video call feature. 
            Connect with other users worldwide and engage in immersive language practice sessions without leaving the comfort of your home. Practice speaking skills,
            receive instant feedback, and build meaningful connections with language enthusiasts around the globe.
            </Typography>
        </Container>

        <Container sx={{ width: "100%", position:"relative", top: "18.5rem", left: "0.4rem"}}>
            <Typography variant="header2" fontWeight="bold" sx={{ marginTop: "1rem", width: "90%", marginLeft: "1rem"}}>
            Community Support
            </Typography>

            <Typography variant="body1" sx={{ marginTop: "1rem", width: "90%", marginLeft: "1rem", textAlign: "justify",fontFamily: "Montserrat"}} >
            Join our vibrant community of language 
            learners and educators committed to supporting each other's 
            language goals. Share resources, exchange tips, and celebrate
            milestones together on our collaborative platform. Connect with like-minded 
            individuals and embark on a rewarding language learning journey together.


            </Typography>
            <Divider sx={{ marginTop: "1rem", width: "90%", marginLeft: "1rem"}}></Divider>

            <Typography variant="body1" fontWeight="bold" sx={{ marginTop: "1rem", width: "90%", marginLeft: "1rem", textAlign: "justify",fontFamily: "Montserrat"}} >
            Start your language learning adventure with CollabNSpeak today and discover a whole new world of opportunities to improve your language skills and connect with others!


            </Typography>
        </Container>
    </>
        
    
  )
}

export default Services
