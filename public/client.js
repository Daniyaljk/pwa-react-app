const publicVapidKey = "BMCcpVv5xbiC2E99FYT6HNfFTFWA2KeJIiNtlp1ha3h3p1cqoFuVzQr3Waaq4UjesIJH52Woef528cKz_lSRMxo";

// Check for service worker
if ("serviceWorker" in navigator) {
    send().catch(err => console.error(err));
}

// Register SW, Register Push, Send Push
async function send() {
    // Register Service Worker
    console.log("Registering service worker...");
    const register = await navigator.serviceWorker.register("/sw.js");
    console.log("Service Worker Registered...");

    if (register.installing === null){
        // Register Push
        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });


        // Send Push Notification
        console.log("Sending Push...");
        const liara_push = "https://push-noti-back.liara.run/subscribe"
        // await fetch("http://localhost:5000/subscribe", {
        await fetch(liara_push, {
            method: "POST",
            body: JSON.stringify(subscription),
            headers: {
                "content-type": "application/json"
            }
        });
        console.log("Push Sent...");
    }

}

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
