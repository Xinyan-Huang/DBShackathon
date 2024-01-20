router.post("/", (req, res) => {
  console.log("POST Route");
  const user = req.body;
  console.log(user);

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "techtrek24",
  });
});
