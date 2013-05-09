# Postmessage AngularJS Example

Example demonstrating communication between a wrapper and an Angular application within an IFrame using [postMessage](https://developer.mozilla.org/en/docs/DOM/window.postMessage).

![image](https://f.cloud.github.com/assets/31971/479416/91c9780a-b812-11e2-971c-d3cbf9b4a98e.png)

## Run

Navigate to [wrapper.html](http://localhost:9000/wrapper.html)

## Support

Currently postMessage is supported in all major browsers. Specific versions supported can be viewed [here](http://caniuse.com/#search=postmessage).

> Partial support in IE refers to only working in frames/iframes (not other tabs/windows). Also in IE an object cannot be sent using postMessage.

## Security

Cross domain messaging is enabled by defining an [origin](http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#dom-messageevent-origin) attribute. This application opens up support for multiple domains by using `'*'` as the defined origin.

## Post message initialisation

In the *wrapper* get a reference to the IFrame content window:
    
    var win = document.getElementById("iframe").contentWindow;

Run the *postMessage* connect method:

    win.postMessage('connect', '*');

In the *IFrame* get a reference to the *postMessage* sender and add to the *scope*:
    
    scope.sender = event.source;

## Message

Internet Explorer 8 and 9, and Firefox versions 6.0 and below only support strings as postMessage's message. To send objects use a JSON string e.g. `JSON.stringify`. To parse the JSON string to a JSON object either use JQuery `$.parseJSON(string);` or in AngularJS use `angular.fromJson(string);`.

### Posting a message

To send a message from the *wrapper* stringify the JSON:

    var message = JSON.stringify({message: document.getElementById("message").value});

And post the message:

    win.postMessage(message, '*');

To send a message from the *IFrame* stringify the JSON:

    var m = JSON.stringify({status: 200, message: message});

Post the message:

    $scope.sender.postMessage(m, '*');

### Receiving a message

To receive a message from the *wrapper* add an event listener to the *window* `message` event:

    addEvent(window, 'message', function (e) {});

Parse the JSON string:

    var response = $.parseJSON(e.data);

To receive a message from the *IFrame* add an event listener to the *window* `message` event:

    $window.addEventListener('message', function(e) {});

Parse the JSON string:

    var response = angular.fromJson(e.data);

## Angular specifics

### Directive

Post message communication is via an *attribute* [directive](http://docs.angularjs.org/guide/directive). 

The directive *controller* handles posting a message from the IFrame to the wrapper. This is via an event listener assigned to a *broadcasted event* from the service class (see below).

The directive *postLink()* function assigns an event listener to the *message* event on the *$window*. 

### Service

Messages are stored in a *service*. When stored the *$apply()* method is called on the *$rootScope* which ensures bindings are updated e.g. in the controller (see below). 

The service *outgoing* attribute is called when sending a message to the directive to post to the wrapper. The service then broadcasts an *outgoingMessage* on the *$rootScope* which the directive handler will receive.

### Controller

The messages array in the service class are bound to the scope within the controller using the service *messages* attribute. This is updated when the service calls `$rootScope.$apply()`.

On send message the controller calls the *outgoing* attribute on the service passing a message value.

### Tests

**TODO**


