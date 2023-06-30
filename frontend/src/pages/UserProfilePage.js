import React from "react";
import UserOrders from "../features/user/components/UserOrders";
import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/user/components/UserProfile";

export default function UsersProfilePage() {
  return (
    <div>
      <Navbar>
        <h1 className="mx-auto text-2xl">My Profile</h1>
        <UserProfile></UserProfile>
      </Navbar>
    </div>
  );
}
