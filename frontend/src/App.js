import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Container } from "@material-ui/core";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <GoogleOAuthProvider clientId="9687424156-kijjn32sjjop2ga6n6oe0pm4f12c5h9t.apps.googleusercontent.com">
      <Router>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Navigate to="/posts" />}/>
          <Route path="/posts" exact element={<Home/>} />
          <Route path="/posts/search" exact element={<Home/>} />
          {/* <Route exact path="/" element={<Home />} /> */}
          <Route exact path="/posts/:id" element={<PostDetails/>}/>
          <Route path="/auth" exact element={(!user ? <Auth /> : <Navigate to="/posts" />)} />
          {/* <Route exact path="/auth" element={<Auth />} /> */}
        </Routes>
      </Container>
      </Router>
    </GoogleOAuthProvider>
    
  );
};
export default App;
// lg = large #FF6D63
