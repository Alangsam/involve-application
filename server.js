const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());

app.use("/api/v1/cases", require("./api/v1/searchedOrderedCases"));
app.use("/api/v1/allCases", require("./api/v1/allCases"));
app.use("/api/v1/users", require("./api/v1/users"));
app.use("/api/v1/caseImage", require("./api/v1/caseImage"));

app.use(express.static("client/build"));
app.get("*", (req, res) => {
   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 3013;
app.listen(port, () =>
   console.log(`Server running at http://localhost:${port}`)
);
