import './App.css';
import {useEffect, useState} from "react";

function App() {
    const [statusNoti, setStatusNoti] = useState("")

    useEffect(() => {
        if (!("Notification" in window)) {
            alert("مرورگر شما نوتیفیکیشن رو پشتیبانی نمیکند.");
            setStatusNoti("مرورگر شما نوتیفیکیشن رو پشتیبانی نمیکند.")
        } else if (Notification.permission === "granted") {
              // new Notification("Hi there!");
            setStatusNoti("نوتیفیکیشن فعال است.")
        } else if (Notification.permission !== "denied") {
            setStatusNoti("نوتیفیکیشن غیر فعال است.")
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    setStatusNoti("نوتیفیکیشن فعال است.")
                }
            });
        }
    }, []);




    return (
    <div className={"test-color"}>
     <p>{statusNoti}</p>
    </div>
  );
}

export default App;
