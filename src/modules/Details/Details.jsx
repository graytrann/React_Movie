import React from "react";
import MovieProfile from "./MovieProfile";
import Showtime from "./Showtime";
import { useParams } from "react-router-dom";

export default function Details() {
  const { movieId } = useParams();
  console.log("Mã phim đang chọn :", movieId);
  return (
    <div>
      <MovieProfile movieId={movieId} />
      <Showtime movieId={movieId} />
    </div>
  );
}
