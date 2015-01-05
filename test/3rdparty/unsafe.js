function access() {
    return {
        document: typeof document === "undefined",
        window: typeof window === "undefined",
        localStorage: typeof localStorage === "undefined",
        sessionStorage: typeof sessionStorage === "undefined",
        ActiveXObject: typeof ActiveXObject === "undefined"
    };
}

function loop() {
    while( true ) {}
}

function xhrget(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if( xmlhttp.readyState == 4 && xmlhttp.status != 200 && xmlhttp.status != 0 ) {
            console.log('Call failed', xmlhttp);
        }
    };
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
    return xmlhttp.responseText;
}