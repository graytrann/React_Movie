import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../../../apis/movieAPI";
import { useNavigate } from "react-router-dom";

export default function Showing() {
  const navigate = useNavigate();
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });
  return (
    <div>
      <ul>
        {data.map((movie) => {
          return (
            <li key={movie.maPhim}>
              <span>{movie.tenPhim}</span>
              <button onClick={() => navigate(`/movies/${movie.maPhim}`)}>
                Chi Tiết Phim
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
