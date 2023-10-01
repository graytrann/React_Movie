import React from "react";
import { useUserContext } from "../../contexts/UserContext/UserContext";

export default function Header() {
  const { currentUser, handleSignout } = useUserContext();
  return (
    <div>
      <h1>Đây là HEADER</h1>
      {currentUser && (
        <div>
          <h1>{currentUser.hoTen}</h1>
          <button onClick={handleSignout}>ĐĂNG XUẤT</button>
        </div>
      )}
    </div>
  );
}
