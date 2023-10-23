import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Container, Grid } from "@mui/material";
import { getCinemaInfo } from "../../apis/cinemaAPI";
import YouTube from "@mui/icons-material/YouTube";
import GitHub from "@mui/icons-material/GitHub";
import Facebook from "@mui/icons-material/Facebook";

export default function Footer() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["footerCinema"],
    queryFn: getCinemaInfo,
  });
  return (
    <Box
      sx={{
        backgroundColor: "#212121",
        color: "#fff",
        padding: "40px",
        marginTop: "50px",
      }}
    >
      <Container>
        <Grid container spacing={{ xs: 5, sm: 2 }}>
          <Grid item xs={4}>
            <div>
              <h6>KHÁNH PHONG MOVIE</h6>
              <div className="d-flex flex-column p-2" style={{ color: "gray" }}>
                <h7>Lịch chiếu phim</h7>
                <h7>Rạp chiếu phim</h7>
                <h7>Review phim</h7>
                <h7>Chi nhánh rạp</h7>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div>
              <h6>HỆ THỐNG RẠP CHIẾU</h6>
              <div className="row">
                {data.map((item) => {
                  return (
                    <div className="col-4 p-2">
                      <img src={item.logo} width="50px" />
                    </div>
                  );
                })}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div>
              <h6>CONTACT KHÁNH PHONG MOVIE</h6>
              <div style={{ color: "gray" }}>
                <div className="d-flex p-2">
                  <Facebook fontSize="large" />
                  <h7 className="m-lg-1">Facebook</h7>
                </div>

                <div className="d-flex p-2">
                  <GitHub fontSize="large" />
                  <h7 className="m-lg-1">Github</h7>
                </div>

                <div className="d-flex p-2">
                  <YouTube fontSize="large" />
                  <h7 className="m-lg-1">Youtbe</h7>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
