import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { CaptainContext } from "../context/CaptainContext";

export const CaptainLogout = () => {
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainContext);
const token = localStorage.getItem("token");
  useEffect(() => {
    const logout = async () => {
      try {
        await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/captains/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );
        setCaptain(null);
        localStorage.removeItem("token");
        navigate("/captain/login");
      } catch (error) {
        console.error("Logout error:", error.response?.data || error.message);
        navigate("/captain/login");
      }
    };

    logout();
  }, [navigate, setCaptain, token]);

  return <div>CaptainLogout</div>;
};
