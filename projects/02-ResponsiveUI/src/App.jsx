import React, { useState } from "react";
import "./App.css";
import { Container } from "./components/Container.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";

export default function App() {
  return (
    <div className="layout">
      <Container>
        <Navbar />
        <Hero />
      </Container>
    </div>
  );
}
