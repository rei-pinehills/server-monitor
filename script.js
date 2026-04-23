const servers = [
    { id: "google", url: "https://www.google.com" },
    { id: "github", url: "https://www.github.com" },
    { id: "cloudflare", url: "https://www.cloudflare.com" },
    { id: "fake", url: "https://www.fake-server-xyz.com" },
];

async function checkServer(server) {
    const card = document.getElementById("card-" + server.id);
    const statusEl = card.querySelector(".server-status");

    statusEl.textContent = "Checking...";
    statusEl.className = "server-status pending";

    try {
        await fetch(server.url, { mode: "no-cors" });
        statusEl.textContent = "🟢 UP";
        statusEl.className = "server-status up";
    } catch (error) {
        statusEl.textContent = "🔴 DOWN";
        statusEl.className = "server-status down";
    }
}

async function checkAll () {
    const lastChecked = document.getElementById("last-checked");
    lastChecked.textContent = "Checking...";

    await Promise.all(servers.map(server => checkServer(server)));

    const now = new Date();
    lastChecked.textContent = "Last checked: " + now.toLocaleTimeString();
}
window.onload = function() {
    checkAll();
};
