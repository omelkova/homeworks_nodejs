#Description

Simple "Hello World" RESTful API .
To start the server execute following command in the console: `node index.js`
To try the Hello API run following command in another console: `curl localhost:3000/hello` 
It is possible to receive personalized greeting by passing parameter `name` in the query string: 
```
curl localhost:3000/hello?name=Bob
{"message":"Welcome, Bob"}
```
