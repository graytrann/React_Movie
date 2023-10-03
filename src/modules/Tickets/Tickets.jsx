import React from "react";
import { getTickets } from "../../apis/cinemaAPI";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ticketStyles from "./ticketStyles.module.scss";
import TicketSeat from "./TicketSeat";
import TicketInfo from "./TicketInfo";
import { useSelector } from "react-redux";
import { MapInteractionCSS } from "react-map-interaction";
import Loading from "../../components/Loading";

export default function Tickets() {
  const { showtimeId } = useParams();

  const { selectedSeats } = useSelector((state) => {
    return state.movie;
  });

  console.log("Mã lịch chiếu :", showtimeId);
  const {
    data = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movieTickets", showtimeId],
    queryFn: () => getTickets(showtimeId),
    // nếu giá trị movieId là null hay undefined thì không gọi
    enabled: !!showtimeId,
  });
  console.log("data:", data);
  const danhSachGhe = data.danhSachGhe;
  console.log("Danh Sách Ghế:", danhSachGhe);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={`${ticketStyles.container}`}>
      <div className="row">
        <div className={`${ticketStyles.tickets} col-md-8 col-xs-12`}>
          <MapInteractionCSS>
            <div className="text-center">
              <div className={`${ticketStyles.tickets_screen}`}>MÀN HÌNH</div>
            </div>

            {danhSachGhe && (
              <div className="d-flex flex-wrap justify-content-around">
                {/* {data.danhSachGhe.map((ghe) => (
                const isSelected = selectedSeats.find((item)=>item.id === ghe.tenGhe);
                
                <TicketSeat ghe={ghe} isSelected={isSelected}/>
              ))} */}
                {data.danhSachGhe.map((ghe) => {
                  const isSelected = selectedSeats.find(
                    (item) => item.tenGhe === ghe.tenGhe
                  );
                  return <TicketSeat ghe={ghe} isSelected={!!isSelected} />;
                })}
              </div>
            )}
          </MapInteractionCSS>
        </div>
        <div className="col-md-4 col-xs-12">
          <TicketInfo />
        </div>
      </div>
    </div>
  );
}
