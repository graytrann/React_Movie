import React, { useState } from "react";
import ticketStyles from "./ticketStyles.module.scss";
import { useDispatch } from "react-redux";

export default function TicketSeat({ ghe, isSelected }) {
  // gửi hành động
  const dispatch = useDispatch();

  //state quản lý ghế ngồi có được chọn hay không
  //   const [isSelected, setIsSelected] = useState(false);

  let classes = "btn";
  if (ghe.daDat) {
    classes += " btn-danger";
  } else if (isSelected) {
    classes += " btn-success";
  } else {
    classes += " btn-secondary";
  }

  const handleSelect = () => {
    // setIsSelected(!isSelected);
    dispatch({
      type: "selectSeat",
      payload: { ...ghe, isSelected: !isSelected },
    });
  };
  return (
    <div className={`${ticketStyles.tickets_container}`}>
      <button
        className={`${ticketStyles.tickets_seat} ${classes} m-2`}
        disabled={ghe.daDat}
        key={ghe.maGhe}
        onClick={handleSelect}
      >
        {ghe.tenGhe}
      </button>
    </div>
  );
}
