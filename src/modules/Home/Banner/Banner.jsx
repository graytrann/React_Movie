import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getBanners } from "../../../apis/movieAPI";
import Loading from "../../../components/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Navigation, Autoplay } from "swiper/modules";
import { Box } from "@mui/material";

export default function Banner() {
  const { data: banners = [], isLoading } = useQuery({
    queryKey: ["banner"],
    queryFn: getBanners,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Swiper
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      centeredSlides={true}
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Navigation, Autoplay]}
      className="mySwiper"
    >
      {banners.map((banner) => {
        return (
          <SwiperSlide key={banner.maBanner}>
            <img width="100%" height="600px" src={banner.hinhAnh} alt="" />
            <Box
              sx={{
                backgroundColor: "#000000a7",
                color: "#fff",
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                zIndex: "1201",
                opacity: "0",
                borderRadius: "10px",
                cursor: "pointer",

                transition: "all 0.5s",

                "&:hover": {
                  opacity: 1,
                },
              }}
            >
              <PlayCircleOutlineIcon
                fontSize="large"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "100px",
                  height: "100px",
                  transform: "translate(-50%, -50%)",
                  transition: "all 0.5s",
                  "&:hover": {
                    color: "#ffffff81",
                  },
                }}
              />
            </Box>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
