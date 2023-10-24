import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Box, Button, Container, Typography } from "@mui/material";

export default function NotFound() {
  // biến điều hướng
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <Container>
        <Box
          sx={{
            paddingTop: "200px",
            paddingBottom: "100px",
            textAlign: "center",
          }}
        >
          <Typography variant="h1" component="h2">
            NOT FOUND 404
          </Typography>
          <Button
            sx={{
              backgroundColor: "rgb(211, 47, 47)",
              color: "white",
              "&:hover": {
                color: "white",
                backgroundColor: "black",
              },
              fontSize: "large",
              mt: "50px",
            }}
            onClick={() => navigate("/")}
          >
            QUAY VỀ TRANG CHỦ
          </Button>
        </Box>
      </Container>
      <Footer />
    </div>
  );
}
