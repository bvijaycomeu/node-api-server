const express = require("express");
const app = express();

let instanceEc2 = require('./routes/ec2Route');
let Headers = require('./Middleware/Header')
let Logs = require('./Middleware/Logs')
let notFound = require('./Middleware/404')


app.get("/", (req, res) => {
  res.send("Hello World!");
});

/*
Middleware Function
 */

app.use(Logs)
app.use('/*', Headers)

/*
Routes
 */

app.use('/api/v1', instanceEc2)

/*
Disable Headers
 */

app.disable('x-powered-by');
app.disable('etag');






/*
404 Error Page Redirect
 */
app.use(notFound)

const port = 8080;
app.listen(port, () => {
  console.log(`App listening on port port! ${port}`);
});


