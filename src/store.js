import { configureStore } from "@reduxjs/toolkit";

const initState = {
  selectedSeats: [],
  totalPrice: 0,
};

const movieTicketsReducer = (state = initState, action) => {
  switch (action.type) {
    case "selectSeat": {
      const { isSelected, ...ghe } = action.payload;

      if (isSelected) {
        const selectedSeats = [...state.selectedSeats, ghe];
        const totalPrice = state.totalPrice + ghe.giaVe;
        return { ...state, selectedSeats, totalPrice };
      }

      const selectedSeats = state.selectedSeats.filter(
        (item) => item.tenGhe !== ghe.tenGhe
      );
      const totalPrice = state.totalPrice - ghe.giaVe;
      return { ...state, selectedSeats, totalPrice };
    }
    case "removeSeat": {
      const seatName = action.payload;
      const selectedSeats = state.selectedSeats.filter(
        (item) => item.tenGhe !== seatName
      );
      const totalPrice = selectedSeats.reduce(
        (result, item) => result + item.giaVe,
        0
      );

      return { ...state, selectedSeats, totalPrice };
    }
    default:
      return state;
  }
};

const store = configureStore({
  reducer: {
    movie: movieTicketsReducer,
  },
});

export default store;
