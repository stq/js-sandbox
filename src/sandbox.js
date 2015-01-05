(function( self, globalEval ) {

    var postMessage = self.postMessage,
        importScripts = self.importScripts;


    self.addEventListener( 'message', function( event ) {

        if( self.onmessage ) {
            delete self.onmessage;
        }

        if( event.data.init ) {
            try {
                for( var scriptIndex in event.data.init.src ) {
                    importScripts(event.data.init.src[scriptIndex]);
                }

                var workerMethods = [];
                for( key in self ) {
                    if( typeof self[key] == 'function' ) {
                        var i = initialWorkerMethods.length;
                        while( i-- ) {
                            if( initialWorkerMethods[i] === key ) break;
                            if( !i ) {
                                workerMethods.push(key);
                            }
                        }

                    }
                }

                postMessage({
                    init: {
                        methods: workerMethods
                    }
                });
            } catch ( e ){
                postMessage({
                    init: {
                        error: e.toString()
                    }
                });
            }
        } else if ( event.data.call ){
            var args = [], result;
            for( var argKey in event.data.call.args ) { args[argKey] = event.data.call.args[argKey]; }
            self.postMessage = undefined;
            try {
                result = self[event.data.call.method].apply(self, args);
            } catch(e){
                postMessage( {
                    call: {
                        id: event.data.call.id,
                        error: e.toString()
                    }
                } );
            }
            postMessage( {
                call: {
                    id: event.data.call.id,
                    result: result
                }
            } );
        }

    }, false );


    var blacklist = [ 'Worker', 'addEventListener','removeEventListener', 'importScripts', 'postMessage', 'attachEvent', 'detachEvent',
        'ActiveXObject', 'navigator', 'location', 'WebSocket' ];
    
    for( var blockId in blacklist ){
        this[blacklist[blockId]] = undefined;
    }

    var initialWorkerMethods = [];
    for( key in self ) {
        if( typeof self[key] == 'function' ) {
            initialWorkerMethods.push( key );
        }
    }

}( self, eval ));