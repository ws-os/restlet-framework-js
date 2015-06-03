# Server side support - API documentation

__Restlet JS for Node__

__Version 0.4.0__

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Core elements](#core-elements)
  - [Component](#component)
    - [Method addServer(protocol, port|configuration)](#method-addserverprotocol-port%7Cconfiguration)
    - [Method getDefaultHost()](#method-getdefaulthost)
    - [Method start()](#method-start)
    - [Method stop()](#method-stop)
  - [Virtual host](#virtual-host)
    - [Method attach(path, handler)](#method-attachpath-handler)
    - [Method attachDefault(handler)](#method-attachdefaulthandler)
    - [Method handle(request, response)](#method-handlerequest-response)
  - [Application](#application)
    - [Method handle(request, response)](#method-handlerequest-response-1)
  - [Router](#router)
    - [Method attach(path, [configuration], handler)](#method-attachpath-configuration-handler)
  - [Restlet](#restlet)
    - [Method handle(request, response)](#method-handlerequest-response-2)
    - [Method next(handler)](#method-nexthandler)
  - [Filter](#filter)
    - [Method handle(request, response)](#method-handlerequest-response-3)
    - [Method next(handler)](#method-nexthandler-1)
  - [Server resource](#server-resource)
    - [Method handler(handler)](#method-handlerhandler)
    - [Method get(handler)](#method-gethandler)
    - [Method getJson(handler)](#method-getjsonhandler)
    - [Method getXml(handler)](#method-getxmlhandler)
    - [Method getYaml(handler)](#method-getyamlhandler)
    - [Method post(handler)](#method-posthandler)
    - [Method put(handler)](#method-puthandler)
    - [Method patch(handler)](#method-patchhandler)
    - [Method delete(handler)](#method-deletehandler)
    - [Method head(handler)](#method-headhandler)
    - [Method options(handler)](#method-optionshandler)
    - [Method handle(request, response)](#method-handlerequest-response-4)
  - [Directory](#directory)
    - [Method handle(request, response)](#method-handlerequest-response-5)
- [Data objects](#data-objects)
  - [Request](#request)
  - [Reference](#reference)
  - [Response](#response)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Core elements


### Component

__`restlet.createComponent`__

Create a new Restlet component.

This is typically what you do first to initialize your Restlet
application. The following code describes how to use this method:

    var component = restlet.createComponent();

A component allows then to add one or several servers, configure
virtual hosts and attach elements on them. Notice that a default
virtual host (reachable using the method `getDefaultHost`) is automatically
created and is used when any other virtual hosts match for the
request.

The following code describes a typical way to create and configure
a Restlet component:

    var restlet = require(restlet);

    var component = restlet.createComponent();

    // Add a new HTTP server listening on port 3000.
    component.addServer('http', 3000);

    // Create an application.
    var application = (...)

    // Attach the sample application.
    component.getDefaultHost().attachDefault(application);

    // Start the component.
    component.start();

__Methods__

| Method | Description |
| ------ | ----------- |
| addServer | Configure a server for the component to serve requests for a particular protocol. |
| getDefaultHost | Get the default host associated with the component. For each component, a default host is implicitely created. It's called if any other virtual hosts match for the request. |
| start | Start the component and all the configured servers. |
| stop | Stop the component and all the configured servers. |

#### Method addServer(protocol, port|configuration)

Configure a server for the component to serve requests
for a particular protocol.

| Argument | Type | Description |
| -------- | ---- | ----------- |
| protocol | String | the protocol of the server to add |
| port or configuration | Number or Object | the port or the configuration object of the server to add |

This allows to internally attach a server to the component
and link it to its lifecycle. When the component is started,
all registered servers are also started and the same for stopping.

The simplest way to add a server is to provided a protocol
and the associated port, as described below:

    component.addServer('http', 3000);

If you need to provide additional parameters to the server,
you can use a configuration object as second parameter:

    component.addServer('https', {
        port: 3000,
        keyFile: '/path/to/agent2-key.pem',
        certFile: '/path/to/agent2-cert.pem'
    });

#### Method getDefaultHost()

Get the default host associated with the component. For
each component, a default host is implicitely created. It's
called if any other virtual hosts match for the request.

#### Method start()

Start the component and all the configured servers.

Following snippet provides a sample of use of this method:

    var component = restlet.createComponent();
    (...)

    // Start the component.
    component.start();

#### Method stop()

Stop the component and all the configured servers.

Following snippet provides a sample of use of this method:

    var component = restlet.createComponent();
    (...)

    // Stop the component.
    component.stop();

### Virtual host

__`restlet.createVirtualHost`__

Create a virtual host.

__Methods__

| Method | Description |
| ------ | ----------- |
| attach | Attach a route on a virtual host. |
| attachDefault | Attach a default route on a virtual host. |
| handle | The entry point for virtual host. |

#### Method attach(path, handler)

Attach a route on a virtual host.

| Argument | Type | Description |
| -------- | ---- | ----------- |
| path | String | the path of the route |
| handler | Function or Object | the processing element when the router matches |

This function accepts several parameters. The concise use
allows to specify two parameters: the path and the handler
that can either a function or a Restlet object (Restlet,
server resource, ...). Following snippet provides a sample
of use:

    virtualHost.attach('/path', function(request, response) {
        (...)
    });

    var application = (...)
    router.attach('/path', application);

#### Method attachDefault(handler)

Attach a default route on a virtual host.

| Argument | Type | Description |
| -------- | ---- | ----------- |
| handler | Function or Object | the processing element when the router matches |

The attached handler will be called only if no route matches for
the request.

#### Method handle(request, response)

The entry point for virtual host.

| Argument | Type | Description |
| -------- | ---- | ----------- |
| request | Request | the request |
| response | Response | the response |

Notice that this method shouldn't be called explicitly since it
involves within the request processing chain.

### Application

__`restlet.createApplication`__

Create a new application.

__Properties__

| Property | Description |
| -------- | ----------- |
| converters|   | The list of converters associated with the application. |

__Methods__

| Method | Description |
| ------ | ----------- |
| handle | The entry point for router. |

#### Method handle(request, response)

The entry point for router.

| Argument | Type | Description |
| -------- | ---- | ----------- |
| request | Request | the request |
| response | Response | the response |

Notice that this method shouldnt be called explicitly since it
involves within the request processing chain.

### Router

__`restlet.createRouter`__

Create a new router.

This is typically what you do within an application to
attach all the routes you want it serves.

    var application = restlet.createApplication(function() {
        // Create the application router
        var router = restlet.createRouter();
        (...)
        return router;
    });

You can notice that router allows to define complex routing
and can be eventually chained if necessary.

__Methods__

| Method | Description |
| ------ | ----------- |
| attach | Attach a route on a router. |

#### Method attach(path, [configuration], handler)

Attach a route on a router.

| Argument | Type | Description |
| -------- | ---- | ----------- |
| path | String | the path of the route |
| [configuration] | Object | the configuration of the attachment |
| handler | Function or Object | the processing element when the router matches |

This function accepts several parameters. The concise use
allows to specify two parameters: the path and the handler
that can either a function or a Restlet object (Restlet,
server resource, ...). Following snippet provides a sample
of use:

    router.attach('/path', function(request, response) {
        (...)
    });

    var serverResource = (...)
    router.attach('/path', serverResource);

You can also provide a object as second parameter
to configure the attachment. In this case, the function
accepts three parameters, as described below:

    var configuration = (...)
    router.attach('/path', configuration, serverResource);

    var serverResource = (...)
    router.attach('/path', configuration, serverResource);

Providing a configuration object allows to specify a matching
mode and if the query string must be taken into account to
match the router and path. Following is a sample configuration
object:

    {
        matchingMode: 'equals' | 'startsWith',
        query: true
    }

The method `attach` supports path variables within the path
string. For example: `/path/{param1}/{param2}`. Restlet will
automatically make them available within the request through
its property `pathVariables`, as describes below:

    var param1Value = request.pathVariables.param1;

Notice that path variables are evaluated by the router itself.
For this reason, they are available in the request processing
chain after the router.

### Restlet

__`restlet.createRestlet`__

Create a new restlet.

This allows to directly handle Restlet request and response
and eventually call the next restlet in the chain, as described
in the following snippet:

    var virtualHost = restlet.createVirtualHost();

    var myRestlet1 = restlet.createRestlet(function(request, response, next) {
        (...)
    });

    var myRestlet2 = restlet.createRestlet(function(request, response, next) {
        (...)
        // Call the next restlet in the chain
        next();
    }).next(restlet1);

    virtualHost.attachDefault(restlet2);

Whereas it's possible to create a raw restlet, you should use an
more high-level element within Restlet such as application, router,
filter and server resource.

__Methods__

| Method | Description |
| ------ | ----------- |
| handle | The entry point for router. |
| next | Define the next element of the current restlet. |

#### Method handle(request, response)

The entry point for router.

| Argument | Type | Description |
| -------- | ---- | ----------- |
| request | Request | the request |
| response | Response | the response |

Notice that this method shouldn't be called explicitly since it
involves within the request processing chain.

#### Method next(handler)

Define the next element of the current restlet.

| Argument | Type | Description |
| -------- | ---- | ----------- |
| handler | Function or Object | the next handler |

When the current restlet is called, a parameter is provided to
continue to execute the processing chain. If a next element is
set, it's implicitely called.

The following snippet describes this mechanism:

    var myRestlet2 = restlet.createRestlet(function(request, response, next) {
        (...)
        // Call the next restlet in the chain
        next();
    }).next(restlet1);

Notice that this method shouldn't be called explicitly since it
involves within the request processing chain.

### Filter

__`restlet.createFilter`__

Create a new server filter.

__Methods__

| Method | Description |
| ------ | ----------- |
| handle | The entry point for router. |
| next | Define the next element of the current restlet. |

#### Method handle(request, response)

The entry point for router.

| Argument | Type | Description |
| -------- | ---- | ----------- |
| request | Request | the request |
| response | Response | the response |

Notice that this method shouldn't be called explicitly since it
involves within the request processing chain.

#### Method next(handler)

Define the next element of the current restlet.

| Argument | Type | Description |
| -------- | ---- | ----------- |
| handler | Function or Object | the next handler |

Notice that this method shouldn't be called explicitly since it
involves within the request processing chain.

### Server resource

__`restlet.createServerResource`__

Create a server resource.

| Argument | Type | Description |
| -------- | ---- | ----------- |
| [configuration] | String | a configuration for the defined default handler |
| [handler] | Function | a default handler for the server resource |

Restlet provides two ways to create and configure processing of
server resources:

* At the server resource creation. In this case, you must provide
  the handler and eventually a configuration object.
* After having created the server resource. In this case, you must
  use the constructor with arguments and use then shortcut methods
  to specify processing.

Let's deal with the first approach with the following snippet:

    var serverResource = restlet.createServerResource(
                                    function(request, response) {
    });

It's also possible to provide a configuration object to parameterize
the way to the specified handler and when it applies. Following snippet
specifies that the handler will be called only for GET methods. Requests
with other methods will be rejected with HTTP status code `405`:

    var serverResource = restlet.createServerResource(
                                   { method: 'GET' },
                                   function(request, response) {
        (...)
    });

Server resources provides shortcut methods to configure there processing
after having created them. Following snippet describes how to specifying
a function that will handle all requests with `GET` method within the
server resource:

    var serverResource = restlet.createServerResource()
                             .get(function(request, response) {
        (...)
    });

Notice that configuration chaining is supported at this level.

TODO: parameters
TODO: content conversion

Following snippet summarizes all available configuration parameters:

    {
        method: 'GET', // HTTP method
        accept: 'json', // extension
        convertInputEntity: true | false, // convert to object input data
        parameters: ['request','response','entity','clientInfo',
                        'pathVariables["varName"]',
                        'queryParameters["paramName"]', 'reference'],
        match: function(req, res) {
            // Check if the handler matches within server resource
        }
    }

__Methods__

| Method | Description |
| ------ | ----------- |
| handler | TODO |
| get | TODO |
| getJson | TODO |
| getXml | TODO |
| getYaml | TODO |
| post | TODO |
| put | TODO |
| patch | TODO |
| delete | TODO |
| head | TODO |
| options | TODO |
| handle | The entry point for server resource. |

#### Method handler(handler)

TODO

| Argument | Type | Description |
| -------- | ---- | ----------- |
| handler | Function or Object | the processing element when the router matches |

#### Method get(handler)

TODO

| Argument | Type | Description |
| -------- | ---- | ----------- |
| handler | Function or Object | the processing element when the router matches |

#### Method getJson(handler)

TODO

| Argument | Type | Description |
| -------- | ---- | ----------- |
| handler | Function or Object | the processing element when the router matches |

#### Method getXml(handler)

TODO

| Argument | Type | Description |
| -------- | ---- | ----------- |
| handler | Function or Object | the processing element when the router matches |

#### Method getYaml(handler)

TODO

| Argument | Type | Description |
| -------- | ---- | ----------- |
| handler | Function or Object | the processing element when the router matches |

#### Method post(handler)

TODO

| Argument | Type | Description |
| -------- | ---- | ----------- |
| handler | Function or Object | the processing element when the router matches |

#### Method put(handler)

TODO

| Argument | Type | Description |
| -------- | ---- | ----------- |
| handler | Function or Object | the processing element when the router matches |

#### Method patch(handler)

TODO

| Argument | Type | Description |
| -------- | ---- | ----------- |
| handler | Function or Object | the processing element when the router matches |

#### Method delete(handler)

TODO

| Argument | Type | Description |
| -------- | ---- | ----------- |
| handler | Function or Object | the processing element when the router matches |

#### Method head(handler)

TODO

| Argument | Type | Description |
| -------- | ---- | ----------- |
| handler | Function or Object | the processing element when the router matches |

#### Method options(handler)

TODO

| Argument | Type | Description |
| -------- | ---- | ----------- |
| handler | Function or Object | the processing element when the router matches |

#### Method handle(request, response)

The entry point for server resource.

| Argument | Type | Description |
| -------- | ---- | ----------- |
| request | Request | the request |
| response | Response | the response |

Notice that this method shouldn't be called explicitly since it
involves within the request processing chain.

### Directory

__`restlet.createDirectory`__

Create a directory.

__Methods__

| Method | Description |
| ------ | ----------- |
| handle | The entry point for directory. |

#### Method handle(request, response)

The entry point for directory.

| Argument | Type | Description |
| -------- | ---- | ----------- |
| request | Request | the request |
| response | Response | the response |

Notice that this method shouldn't be called explicitly since it
involves within the request processing chain.

## Data objects


### Request

__Properties__

| Property | Description |
| -------- | ----------- |
| attributes| Object | The attributes associated with the request |
| method| String | The HTTP method |
| entity| Representation | The entity associated with the request |
| reference| Reference | The request reference. |
| queryParameters| Object | The query parameters |

### Reference

__Properties__

| Property | Description |
| -------- | ----------- |
| hostDomain| String | The host domain |
| hostPort| String | The host port |
| path| String | The path |
| query| String | The query string |
| scheme| String | The scheme |

### Response