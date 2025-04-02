import { useEffect, useState } from "react";
import Navigation from "./components/Default/Navigation";
import RouteManager from "./RouteManager";
import ChatbotWidget from "./components/Default/ChatbotWidget";
import { setRole, setToken } from "./store/AuthSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if(token!=null){
      dispatch(setToken(token));
      dispatch(setRole(role));
    }
  }, [])
  
  
  return (
    <>
      <Navigation/>
      <RouteManager/>
      <ChatbotWidget />
    </>
  );
}

export default App;
