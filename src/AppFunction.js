import React, { useState, useEffect } from "react";

const initialLocationState = {
  latitute: null,
  longitude: null,
  speed: null
};

const App = props => {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [status, setStatus] = useState(navigator.onLine);

  const [{ latitute, longitude, speed }, setLocation] = useState(
    initialLocationState
  );

  // variable that can be reassigned
  let mounted = true;

  // executed after every render
  // it is like side effect
  useEffect(() => {
    document.title = `You have clicked ${count} times`;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    navigator.geolocation.getCurrentPosition(handleGeolocation);
    const watchId = navigator.geolocation.watchPosition(handleGeolocation);

    // performs clean up function when component unmounts
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      navigator.geolocation.clearWatch(watchId);
      mounted = false;
    };

    // prevent useEffect to run on every render. Provide [values]
    // only if count changes the side effect will run
  }, [count]);

  const handleGeolocation = event => {
    if (mounted) {
      setLocation({
        latitute: event.coords.latitute,
        longitude: event.coords.longitude,
        speed: event.coords.speed
      });
    }
  };

  const handleOnline = () => {
    setStatus(true);
  };

  const handleOffline = () => {
    setStatus(false);
  };

  const handleMouseMove = event => {
    setMousePosition({
      x: event.pageX,
      y: event.pageY
    });
  };

  // need to reference method with variable in function component
  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  const toggleLight = () => {
    setIsOn(prevIsOn => !prevIsOn);
  };

  return (
    <>
      <button onClick={incrementCount}> I was clicked {count} times</button>
      <title></title>
      <div
        style={{
          width: "50px",
          height: "50px",
          background: isOn ? "yellow" : "grey"
        }}
        onClick={toggleLight}
      ></div>
      <h2>Mouse position</h2>
      {JSON.stringify(mousePosition, null, 2)}
      <br />

      <h3>Network status</h3>
      <p> You are {status ? "online" : "offline"}</p>

      <h2>Geolocation</h2>
      <p>Latitude {latitute}</p>
      <p>Longitude {longitude}</p>
      <p>Your speed is {speed ? speed : "0"}</p>
    </>
  );
};

export default App;
