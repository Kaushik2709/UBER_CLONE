import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useContext } from "react";
import { CaptainContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignUp = () => {
  const [fistName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("");
  const [numberPlate, setNumberPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("car");
  const { setCaptain } = useContext(CaptainContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const captainData = {
        fullName: {
          firstName: fistName,
          lastName: lastName,
        },
        email: email,
        password: password,
        vehicle: {
          color: color,
          numberPlate: numberPlate,
          capacity: parseInt(capacity),
          vehicleType: vehicleType,
        },
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/captains/register`,
        captainData,
      );
      if (response.status === 201) {
        setCaptain(response.data.captain);
        localStorage.setItem("token", response.data.token);
      }
      navigate("/captain/login");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setColor("");
      setNumberPlate("");
      setCapacity("");
      setVehicleType("car");
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message,
      );
    }
  };

  return (
    <div className="relative bg-[url(https://plus.unsplash.com/premium_photo-1731842686156-74895c29a87b?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center flex flex-col items-center justify-center h-dvh">
      {/* Top Left Logo */}
      <img
        className="absolute top-5 left-8 w-20"
        src="https://imgs.search.brave.com/Aacap5hKxsM0_o4jP2kD_Jpg10Fk6-ZAkDzcVzJN6NQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTIwMTEtMjAxNi03/MDB4Mzk0LnBuZw"
        alt="Logo"
      />

      <form
        onSubmit={(e) => submitHandler(e)}
        className="flex flex-col gap-2 w-80"
      >
        <h3 className="text-2xl font-bold">Create Captain account</h3>
        <div className="flex gap-2">
          <input
            required
            type="text"
            value={fistName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border border-gray-300 rounded-full px-4 py-2 w-full bg-white/80"
            placeholder="First name"
          />
          <input
            required
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border border-gray-300 rounded-full px-4 py-2 w-full bg-white/80"
            placeholder="Last name"
          />
        </div>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-full px-4 py-2 w-full bg-white/80"
          placeholder="Enter your email"
        />

        {/* Password Field */}
        <div className="relative w-full">
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            className="border border-gray-300 rounded-full px-4 py-2 w-full pr-12 bg-white/80"
            placeholder="Enter your password"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>

        {/* Vehicle Information Section */}
        <h3 className="text-lg font-bold ">Vehicle Information</h3>

        <input
          required
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="border border-gray-300 rounded-full px-4 py-2 w-full bg-white/80"
          placeholder="Vehicle Color (e.g., Red)"
        />

        <input
          required
          type="text"
          value={numberPlate}
          onChange={(e) => setNumberPlate(e.target.value)}
          className="border border-gray-300 rounded-full px-4 py-2 w-full bg-white/80"
          placeholder="Number Plate (e.g., MP 04 XY 6204)"
        />

        <input
          required
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          className="border border-gray-300 rounded-full px-4 py-2 w-full bg-white/80"
          placeholder="Capacity (e.g., 5)"
        />

        <select
          required
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          className="border border-gray-300 rounded-full px-4 py-2 w-full bg-white/80"
        >
          <option value="car">Car</option>
          <option value="auto">Auto</option>
          <option value="bike">Bike</option>
        </select>

        <button
          type="submit"
          className="bg-black text-white w-full py-2 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 cursor-pointer"
        >
          Signup
        </button>

        <p className="text-sm font-bold text-center">
          Already have an Captain account?{" "}
          <Link to="/captain/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
      <Link
        to="/user/signup"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 px-4 py-2 rounded-full hover:bg-white transition-colors"
      >
        <p className="text-sm font-bold text-center text-black/55">
          Sign up as User
        </p>
      </Link>
    </div>
  );
};

export default CaptainSignUp;
