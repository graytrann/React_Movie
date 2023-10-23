import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ButtonCinema, Item } from "../../Details/Showtime/styledShowItem";

import {
  getCinemaInfo,
  getCinemaTheater,
  getCinemaShowTimes,
} from "../../../apis/cinemaAPI";

import { Box, Container, Grid, Typography } from "@mui/material";

import dayjs from "dayjs";

export default function Cinema({ cinemaId }) {
  const [infoCinema, setInfoCinema] = useState([]);

  const [listMovie, setListMovie] = useState([]);

  const [selectedTenCumRap, setSelectedTenCumRap] = useState(0);

  const [selectedTab, setSelectedTab] = useState(0);

  const navigate = useNavigate();

  const { data: cinemaSystem = [], isLoading } = useQuery({
    queryKey: ["logo", cinemaId],
    queryFn: () => getCinemaInfo(cinemaId),
  });

  const handleChangeTab = async (cinemaSystemsId) => {
    try {
      const infoCinema = await getCinemaTheater(cinemaSystemsId);
      setInfoCinema(infoCinema);
      setSelectedTab(cinemaSystemsId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetListMovie = async (infoCinemaId, tenCumRap) => {
    try {
      const movies = await getCinemaShowTimes(infoCinemaId);
      // console.log(movies);
      setListMovie(movies);
      // console.log(listMovie);
      setSelectedTenCumRap(tenCumRap);
      // console.log(selectedTenCumRap);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (cinemaSystem.length > 0) {
      handleChangeTab(cinemaSystem[0].maHeThongRap);
    }
  }, [cinemaSystem]);

  useEffect(() => {
    if (infoCinema.length > 0) {
      handleGetListMovie(infoCinema[0].maHeThongRap, infoCinema[0].tenCumRap);
    }
  }, [infoCinema]);

  if (isLoading) {
    <div>Loading....</div>;
  }

  return (
    <Container
      sx={{
        margin: "100px auto",
        marginBottom: "0",
        borderRadius: "5px",
        height: "80vh",
        overflow: "hidden",
        boxShadow: " rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
        backgroundColor: "#ffffffef",
      }}
      id="cinema"
    >
      <Grid container>
        <Grid item xs={1}>
          <Box sx={{ marginTop: "10px" }}>
            <Grid spacing={1} container>
              {cinemaSystem.map((item) => (
                <Grid item key={item.maHeThongRap} xs={12}>
                  <Item
                    backgroundColor={
                      selectedTab === item.maHeThongRap
                        ? "#e829005e"
                        : "transparent"
                    }
                    onClick={() => handleChangeTab(item.maHeThongRap)}
                  >
                    <img src={item.logo} alt="logo" width={50} height={50} />
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={4} sx={{ height: "80vh", overflowY: "scroll" }}>
          <Box sx={{ padding: "0 10px", marginTop: "10px" }}>
            <Grid spacing={1} container>
              {infoCinema.map((item) => (
                <Grid item key={item.maCumRap} xs={12}>
                  <Item
                    p="10px"
                    onClick={() =>
                      handleGetListMovie(item.maHeThongRap, item.tenCumRap)
                    }
                  >
                    <Typography sx={{ color: "#3ae374", fontWeight: "bold" }}>
                      {item.tenCumRap}
                    </Typography>
                    <Typography variant="body2">{item.diaChi}</Typography>
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={7} sx={{ height: "80vh", overflowY: "scroll" }}>
          <Box>
            {listMovie.map((rap) =>
              rap.lstCumRap.map((cumRap) =>
                cumRap.danhSachPhim.map(
                  (phim) =>
                    // Normalize strings before comparing
                    selectedTenCumRap &&
                    selectedTenCumRap.toLowerCase() ===
                      cumRap.tenCumRap.toLowerCase() && (
                      <Grid
                        container
                        sx={{
                          borderBottom: "1px dashed #cd84f1",
                        }}
                        key={phim.maPhim}
                      >
                        <Grid item xs={4} sx={{ padding: "15px" }}>
                          <img src={phim.hinhAnh} alt="hinhAnh" width="100%" />
                        </Grid>
                        <Grid item xs={8}>
                          <Box sx={{ marginLeft: "10px" }}>
                            <Typography
                              sx={{
                                color: "#3ae374",
                                fontSize: "25px",
                                fontWeight: "bold",
                              }}
                            >
                              {phim.tenPhim}
                            </Typography>

                            {phim.lstLichChieuTheoPhim.map((lichChieu) => {
                              return (
                                <ButtonCinema
                                  onClick={() =>
                                    navigate(
                                      `/tickets/${lichChieu.maLichChieu}`
                                    )
                                  }
                                  key={lichChieu.maLichChieu}
                                  variant="body2"
                                >
                                  {dayjs(lichChieu.ngayChieuGioChieu).format(
                                    "DD-MM-YYYY ~ HH:mm"
                                  )}
                                </ButtonCinema>
                              );
                            })}
                          </Box>
                        </Grid>
                      </Grid>
                    )
                )
              )
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
