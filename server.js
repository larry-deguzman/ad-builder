const express = require("express");
const app = express();
const port = 3000;

// console.log("app", app);

// app.get("./public/index.html", () => {});
/*
path: It is the path for which the middleware function is being called. 
callback: They can be a middleware function or a series/array of middleware functions. 
*/
app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

/*
https://www.geeksforgeeks.org/express-js-app-listen-function/

app.listen([port[, host[, backlog]]][, callback])

Port: It specifies the port on which we want our app to listen.

Host (Optional): It specifies the IP Address of the host on which we want our app 
to listen. You can specify the host if and only if you have already specified the 
port. ( since you have a closing(‘]’) bracket after ([, host[, backlog]]) as you 
can see in the above syntax, so this means the port must be specified before 
specifying host and backlog).

Backlog (Optional): It specifies the max length of the queue of pending connections.
You can specify the backlog if and only if you have already specified the port and 
host. ( since you have a closing bracket after ([, backlog]), so this means you will 
have to specify the host before specifying backlogs)

Callback (Optional):  It specifies a function that will get executed, once your 
app starts listening to the specified port. You can specify callback alone i.e., 
without specifying port, host, and backlogs.( since this is a separate set of 
arguments in opening and closing brackets([, callback]), this means you can 
specify these arguments without specifying the argument of previous opening 
and closing square brackets.


*/
