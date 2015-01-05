Js sandbox
==========

About
-----

This js sandboxing framework is targeting 2 goals:

* Goal 1 : Execute unsafe js code without access to window, document(and its cookies), local storage of the container page.
* Goal 2 : Extendable API

Demo
----

Check demo [here](http://stq.github.io/js-sandbox)

Solution
--------

The first goal is achieved by use of Dedicated [Web Workers](http://www.w3.org/TR/workers/).

Talking on the second goal, an extendability will be provided by module pattern at Hypervisor object and by prototypical approach at Sandbox (a Worker wrapper),
thus allowing to override/augument/wrap default functionality without modification of the original code.

Possible improvements
-------------------

1) While hiding out network access at same origin is out of scope, it still may be possible to implement it by hiding
network access resources like `XMLHttpRequest`, `WebSocket`, `indexedDB` and using sandboxed iframe to contain sandbox worker.

2) By current design, all global objects in sandboxed code are exposed in the sandbox interface.

A certain modularization or filtration API could be useful to hide away certain libs and private global methods. This could be
done either by providing certain filter to Hypervisor.createSanbox method, or by supporting certain export mechanism in sandboxed code.

3) *Secure DOM access*: a protected code may want to access DOM to do it's presentation logic so hypervisor don't have to worry about rendering.

Proposed API: protected code is provided with a set of DOM nodes with specified read/write rights for each node.

A technical solution to achieve that could use:
* Controlling DOM access with DOM modification events
* Virtualizing DOM access with DOM observers and virtual DOM (see [https://github.com/stq/jsdom-sync](https://github.com/stq/jsdom-sync))
* A custom async API to access DOM elements from the worker

4) *Cookie/storage virtualization*: a web worker could provide a sandbox to work with cookies/storage and use certain API to access
persistence layer of the main page in protected manner.

5) *True infinite loop protection*: while current version implements option to terminate worker in case of too long calls,
still due to [halting problem](http://en.wikipedia.org/wiki/Halting_problem) it could be troublesome to
detect infinite loops, but there is a cheap solution to achieve that, originally implemented at jsbin service. It simply does
detects and overwrite loops in the code injecting loop prevention control points. This solution is not the best, because it actually
modifies code (what if the protected code would try to do the same thing?), but it would work in 99.9~% cases.

Usage
-----

1. Include `promise.js` (hypervisor uses simple promise implementation to avoid callback mess)
2. Include `hypervisor.js` script
3. Make sure `sandbox.js` script available at `<site>/sandbox.js` url (or use `wrapperPath` option)
4. Create a sandbox instance by calling

    Hypervisor.createSandbox(options).then(function(sandbox) {});

Options object:

    {
        src: [ ], //an array of string references to javascript files to execute in sandbox on create (required option)
        timeout: 1000, //timeout causes sandbox termination if init or method take more then `timeout` ms (default: infinite)
        wrapperPath: '/somewhere/sandbox.js' //custom path to sandbox.js (default: 'sandbox.js')
    }

Global methods in scripts provided in `src` option will be exposed on the `sandbox` object with only one difference from
original implementation - sandboxed methods are asynchronous, i.e. each method returns promise object.

So, to call a method named `myMethod`:

    sandbox.myMethod(args)
        .then(
            function(result){}, //success handler
            function(error){} //optional error handler
        );


Sources
-------

A list of links to information sources used in this project:

SO:

* [sandboxing js](http://stackoverflow.com/questions/195149/is-it-possible-to-sandbox-javascript-running-in-the-browser)
* [worker dom access](http://stackoverflow.com/questions/18056922/is-there-a-way-to-create-out-of-dom-elements-in-web-worker)

Specs:

* [loop detection](http://en.wikipedia.org/wiki/Halting_problem)
* [worker dom access](http://w3-org.9356.n7.nabble.com/Limited-DOM-in-Web-Workers-td44284.html)
* [workers spec](http://www.w3.org/TR/workers/)

Browsers info:

* [dedicated workers](http://caniuse.com/#feat=webworkers)
* [shared workers](http://caniuse.com/#feat=sharedworkers)

Similar projects:

* [very similar project, got some insights from it](https://github.com/eligrey/jsandbox)
* [a js sandbox with working inf loop detection](http://jsbin.com/)

Snippets:
* [julia set](http://stackoverflow.com/questions/19671543/js-canvas-implementation-of-julia-set)