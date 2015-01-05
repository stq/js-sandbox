window.Hypervisor = window.Hypervisor || new (function() {

    if( !window.Worker ) {
        console.error("Worker API is not supported in this web client");
        return;
    }

    function Sandbox(opts, onReady) {
        var self = this;
        var worker = new Worker("hypervisor/sandbox.js");
        var callstack = {};
        var callId = 0;
        var promise = new Promise();
        var initTimeout = null;

        worker.onmessage = function(event) {
            if( event.data.init) {

                if( initTimeout != null ) {
                    clearTimeout(initTimeout);
                    initTimeout = null;
                }

                if( event.data.init.methods ) {

                    _.each(event.data.init.methods, function(method) {
                        self[method] = function() {
                            var promise = new Promise();
                            var request = {
                                call: {
                                    method: method,
                                    id: callId++,
                                    args: arguments
                                }
                            };
                            callstack[request.call.id] = {promise: promise};
                            if( opts.timeout ) {
                                callstack[request.call.id].timeout = setTimeout(function() {
                                    delete callstack[request.call.id];
                                    promise.reject("timeout");
                                    worker.terminate();
                                }, opts.timeout);
                            }
                            worker.postMessage(request);
                            return promise;
                        }
                    });
                    promise.resolve(self);
                } else if( event.data.init.error ) {
                    console.log("Unable to load sandbox scripts", e);
                    promise.reject(e);
                }

            } else if( event.data.call ) {
                if( callstack[event.data.call.id] ) {

                    if( callstack[event.data.call.id].timeout ) {
                        clearTimeout(callstack[event.data.call.id].timeout);
                    }

                    if( event.data.call.error ) {
                        callstack[event.data.call.id].promise.reject(event.data.call.error);
                    } else {
                        callstack[event.data.call.id].promise.resolve(event.data.call.result);
                    }
                }
            }
        };

        if( opts.timeout ) {
            initTimeout = setTimeout(function() {
                promise.reject('timeout');
                worker.terminate();
            }, opts.timeout);
        }

        worker.postMessage({
            init: {
                src: opts.src
            }
        });
        return promise;
    }


    this.createSandbox = function(opts, onReady) {
        return new Sandbox(opts, onReady);
    }

});