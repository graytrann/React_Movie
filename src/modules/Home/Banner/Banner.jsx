import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getBanners } from "../../../apis/movieAPI";
import Loading from "../../../components/Loading";

export default function Banner() {
  const { data: banners = [], isLoading } = useQuery({
    queryKey: ["banner"],
    queryFn: getBanners,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="text-center">
      {banners.map((banner) => {
        return (
          <img
            key={banner.maBanner}
            src={banner.hinhAnh}
            width={300}
            height={300}
          ></img>
        );
      })}
    </div>
  );
}
