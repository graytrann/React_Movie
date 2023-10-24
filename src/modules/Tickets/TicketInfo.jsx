import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import tickInfoStyle from "./ticketInfo.module.scss";
import { bookingTickets } from "../../apis/cinemaAPI";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function TicketInfo({ showtimeId }) {
  const MySwal = withReactContent(Swal);

  const { selectedSeats } = useSelector((state) => {
    return state.movie;
  });

  const maGheArray = selectedSeats.map((seat) => seat.tenGhe);
  console.log("Danh Sách Ghế Đang Được Chọn :", maGheArray);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (seatName) => {
    dispatch({ type: "removeSeat", payload: seatName });
  };
  const { totalPrice } = useSelector((state) => {
    return state.movie;
  });

  const handleBooking = () => {
    bookingTickets(showtimeId, selectedSeats);
    MySwal.fire({
      position: "center",
      icon: "success",
      title: "ĐẶT VÉ THÀNH CÔNG",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");
  };
  return (
    <div className={`${tickInfoStyle.container}`}>
      <h1>THÔNG TIN VÉ</h1>

      <hr />
      <div className={`${tickInfoStyle.ticket}`}>
        <div>
          <div className="text-center ">
            {selectedSeats.map((ghe) => {
              return (
                <div
                  key={ghe.tenGhe}
                  className="d-flex justify-content-center align-items-center mb-2"
                >
                  <div>
                    GHẾ <span className="text-white">{ghe.tenGhe} </span>-{" "}
                    {ghe.giaVe.toLocaleString()}${" "}
                  </div>
                  <div>
                    <button
                      className="btn btn-warning text-white ms-3"
                      onClick={() => {
                        handleRemove(ghe.tenGhe);
                      }}
                    >
                      XÓA
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={`${tickInfoStyle.price}`}>
        <hr />
        <div>TỔNG TIỀN : {totalPrice}</div>
        <button onClick={handleBooking} className="btn btn-success mt-1">
          ĐẶT VÉ
        </button>
      </div>
    </div>
  );
}
