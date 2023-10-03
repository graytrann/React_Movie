import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import tickInfoStyle from "./ticketInfo.module.scss";

export default function TicketInfo() {
  const { selectedSeats } = useSelector((state) => {
    return state.movie;
  });

  const dispatch = useDispatch();

  const handleRemove = (seatName) => {
    dispatch({ type: "removeSeat", payload: seatName });
  };
  const { totalPrice } = useSelector((state) => {
    return state.movie;
  });
  return (
    <div className={`${tickInfoStyle.container}`}>
      <h1>THÔNG TIN VÉ</h1>

      <hr />
      <div className={`${tickInfoStyle.ticket}`}>
        <div>
          <div className="text-center ">
            {selectedSeats.map((ghe) => {
              return (
                <div className="d-flex justify-content-center align-items-center mb-2">
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
        <button className="btn btn-success mt-1">ĐẶT VÉ</button>
      </div>
    </div>
  );
}
