var Hypervisor = (function(Hypervisor) {

    if( !window.Worker ) {
        console.error("Worker API is not supported in this web client");
        return;
    }

    Hypervisor.createSandbox = function(options) {
        return new Sandbox(options);
    };

    return Hypervisor;
}(Hypervisor || {}));

function Sandbox(options) {
    this.options = options;
    this.worker = new Worker(options.wrapperPath || "sandbox.js");
    this.callstack = {};

    this.worker.onmessage = function(event) {
        if( event.data.init ) {
            this.processInitResponse(event.data.init);
        } else if( event.data.call ) {
            this.processCallResponse(event.data.call);
        }
    }.bind(this);

    return this.init();
}

Sandbox.prototype.init = function(){
    this.initPromise = new Promise();
    this.initTimeout = null;
    if( this.options.timeout ) {
        this.initTimeout = setTimeout(function() {
            this.initPromise.reject('timeout');
            this.worker.terminate();
        }.bind(this), this.options.timeout);
    }
    this.worker.postMessage({init: {src: this.options.src}});
    return this.initPromise;
};

Sandbox.prototype.processInitResponse = function(response) {
    if( response.methods ) {
        _.each(response.methods, function(methodName) {
            this[methodName] = this.createCallWrapper(methodName);
        }.bind(this));
        clearTimeout(this.initTimeout);
        this.initPromise.resolve(this);
    } else if( response.error ) {
        console.log("Unable to load scripts into the sandbox", response.error);
        this.initPromise.reject(response.error);
    } else {
        console.log("Unknown sandbox init error");
    }
};
Sandbox.prototype.processCallResponse = function(response) {
    var call = this.callstack[response.id];
    if( call ) {
        delete this.callstack[call.id];
        call.timeout && clearTimeout(call.timeout);
        response.error ? call.promise.reject(response.error) : call.promise.resolve(response.result);
    } else {
        console.log("Unknown call response");
    }
};
Sandbox.prototype.createCallWrapper = function(methodName) {
    var callId = 0;
    return function() {
        var callPromise = new Promise(),
            id = callId++,
            request = {
                call: {
                    method: methodName,
                    id: id,
                    args: arguments
                }
            };
        this.callstack[id] = {promise: callPromise};
        if( this.options.timeout ) {
            this.callstack[id].timeout = setTimeout(function() {
                delete this.callstack[id];
                callPromise.reject("timeout");
                this.worker.terminate();
            }.bind(this), this.options.timeout);
        }
        this.worker.postMessage(request);
        return callPromise;
    }.bind(this);
};