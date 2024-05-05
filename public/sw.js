const self = this;

const urlsToCache = ["/", "app.js", "styles.css", "logo.svg"];



self.addEventListener('install',(e)=>{
    console.log("install sw")

    let cacheUrls = async () => {
        const cache = await caches.open("pwa-assets");
        // cache.add("styles.css"); // it stores only one resource

        return cache.addAll(urlsToCache);
    };

    e.waitUntil(cacheUrls());

})


self.addEventListener("activate", event => {
    console.log("Service worker activated");
});

self.addEventListener("push", async (e) => {

    const data = e.data.json();

    console.log("Push Recieved...");
    self.registration.showNotification(data.title, {
        body: "نوتیفیکیشن مرکز میوه",
        icon: "/logo192.png"
    }).then(()=> console.log("hh"))

});

// self.addEventListener("fetch", event => {
//     console.log(`URL requested: ${event.request.url}`);
// });

self.addEventListener('notificationclick', function(event) {


    event.waitUntil(
        self.clients.openWindow('https://markazmive.ir/')
    );
    event.notification.close();
});
