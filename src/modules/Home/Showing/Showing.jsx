import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../../../apis/movieAPI";
import ShowingList from "./ShowingList/ShowingList";
import { Box, Container } from "@mui/material";
import ShowingSelect from "./ShowingSelect/ShowingSelect";

export default function Showing() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });

  return (
    <Box id="showing">
      <Container maxWidth="md" style={{ position: "relative", padding: "0" }}>
        <ShowingSelect movies={data}></ShowingSelect>
        <ShowingList />
      </Container>
    </Box>
  );
}
