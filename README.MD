Js sandbox
==========

About
-----

* Goal 1 : Execute unsafe js code without access to window, document(and its cookies), local storage of the container page.
* Goal 2 : Extendable API (sandboxed code modularization, secure DOM access, cookies/storage virtualization, infinite loop protection)

Demo
----

Check demo [here](http://stq.github.io/js-sandbox)

Solution
--------

Dedicated [Web Workers](http://www.w3.org/TR/workers/) are used to achieve Goal 1, because web workers spec perfectly satisfy
Goal 1 requirements without need to additional work.

To achieve Goal 2 extensibility we plan to use a set of js programming patters which shall be described in detail later (after it's done).

At this moment we can review possible extensions which may be potentially useful:

1) By current design, all global objects in sandboxed code are exposed in the sandbox interface.

A certain modularization or filtration API could be useful to hide away certain libs and private global methods. This could be
done either by providing certain filter to Hypervisor.createSanbox method, or by supporting certain export mechanism in sandboxed code.

2) *Secure DOM access*: a protected code may want to access DOM to do it's presentation logic so hypervisor don't have to worry about rendering.

Proposed API: protected code is provided with a set of DOM nodes with specified read/write rights for each node.

A technical solution to achieve that could use:
* Controlling DOM access with DOM modification events
* Virtualizing DOM access with DOM observers and virtual DOM (see [https://github.com/stq/jsdom-sync](https://github.com/stq/jsdom-sync))
* A custom async API to access DOM elements from the worker

3) *Cookie/storage virtualization*: a web worker could provide a sandbox to work with cookies/storage and use certain API to access
persistence layer of the main page in protected manner.

4) *True infinite loop protection*: while current version implements option to terminate worker in case of too long calls,
still due to [halting problem](http://en.wikipedia.org/wiki/Halting_problem) it could be troublesome to
detect infinite loops, but there is a cheap solution to achieve that, originally implemented at jsbin service. It simply does
detects and overwrite loops in the code injecting loop prevention control points. This solution is not the best, because it actually
modifies code (what if the protected code would try to do the same thing?), but it would work in 99.9~% cases.

Usage
-----

1. Include `promise.js` (hypervisor uses simple promise implementation to avoid callback mess)
2. Include `hypervisor.js` script
3. Make sure `sandbox.js` script available on `/hypervisor/` context.
4. Create a sandbox instance by calling

    Hypervisor.createSandbox(options).then(function(sandbox) {});

Options object:

    {
        src: [ ], //an array of string references to javascript files to execute in sandbox on create
        timeout: 1000 //optional timeout in ms: causes sandbox termination if init or method take more then `timeout` time
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