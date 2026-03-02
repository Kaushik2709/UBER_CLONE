import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panel, setPanel] = useState(false); // "pickup" or "destination"
  const [activeField, setActiveField] = useState("pickup");
  const panelRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panel) {
      gsap.to(panelRef.current, {
        height: "70%",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [panel]);
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Logo */}
      <img
        className="absolute top-5 left-8 w-20 z--990"
        src="https://imgs.search.brave.com/Aacap5hKxsM0_o4jP2kD_Jpg10Fk6-ZAkDzcVzJN6NQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1Mb2dv/LTIwMTEtMjAxNi03/MDB4Mzk0LnBuZw"
        alt="Logo"
      />
      {/* Background Image */}
      <img
        className="h-full w-full object-cover"
        src="https://imgs.search.brave.com/biROPE6MAsc7hn3M4duI41UUPsNvsmTbuOUDRw6Bhyw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE4/ODM5NDAwNi92ZWN0/b3IvcGVyc29uLXVz/aW5nLWEtcmlkZS1z/aGFyaW5nLXRlY2hu/b2xvZ3ktbW9iaWxl/LWFwcGxpY2F0aW9u/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1lbG0wdVZQbHVo/dEZ2QWZEM0E5Z0ds/cmdtV01XTHk3eUJO/WUtHbXNZNGU0PQ"
        alt=""
      />

      {/* Full Overlay Card */}
      <div className=" flex flex-col justify-end h-screen absolute top-0 w-full">
        {/* 30% Section */}
        <div className="h-[30%] p-5 bg-white relative">
          <h5 className="absolute left-85" onClick={() => setPanel(false)}>
            {panel ? <i className="ri-arrow-down-wide-fill"></i> : ""}
          </h5>
          <h4 className="text-2xl font-semibold mb-4">Find Trip</h4>

          <form
            onSubmit={(e) => submitHandler(e)}
            className="flex flex-col gap-3"
          >
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-600 rounded-full"></div>
            <input
              onClick={() => {
                setPanel(true)
                setActiveField("pickup")
              }}
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Enter pickup location"
              className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm font-medium placeholder-gray-500 focus:outline-none focus:bg-gray-200 transition text-center"
            />

            <input
              type="text"
              onClick={() => {
                setPanel(true)
                setActiveField("destination")
              }}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination"
              className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm font-medium placeholder-gray-500 focus:outline-none focus:bg-gray-200 transition text-center"
            />
          </form>
        </div>

        {/* 70% Section */}
        <div ref={panelRef} className="h-[70%] bg-white panel">
          <LocationSearchPanel
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
            pickup={pickup}
            destination={destination}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
