import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var allowedOrigins = ["http://localhost:5173", "http://yourapp.com"];

const user = {
  name: "UserName-XXX",
  phone: "phone",
  address: "adress",
};

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/user/:userId", (req, res) => {
  console.log("Get request from client", req.params.userId);

  // DB request with user id

  res.json(user);
});

app.post("/users", (req, res) => {
  let data = req.body;
  console.log("Data Received: " + JSON.stringify(data));

  if (data.name) user.name = data.name;
  if (data.address) user.address = data.address;
  if (data.phone) user.phone = data.phone;

  // DB request for creating user

  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
