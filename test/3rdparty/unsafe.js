var global = this;

function availabilityCheck() {
    return true;
}

function destroy() {
    //for( prop in global ) {
    //    console.log('deleted ' + prop);
    //    delete global[prop];
    //}
}

function access() {
    return {
        document: typeof document === "undefined",
        window: typeof window === "undefined",
        localStorage: typeof localStorage === "undefined",
        sessionStorage: typeof sessionStorage === "undefined",
        XMLHttpRequest: typeof XMLHttpRequest === "undefined",
        ActiveXObject: typeof ActiveXObject === "undefined"
    };
}

function loop() {
    while( true ) {}
}

function xhrget(url) {
    var xmlhttp = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function() {
        if( xmlhttp.readyState == 4 && xmlhttp.status != 200 && xmlhttp.status != 0 ) {
            console.log('Call failed', xmlhttp);
        }
    };
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
    return xmlhttp.responseText;
}