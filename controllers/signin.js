const handleSignin = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;

  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        db.select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => {
            res.status(400).json("unable to get user");
          });
      } else {
        res.json("Wrong email or password");
      }
    })
    .catch((err) => {
      res.status(400).json("Wrong email or password");
    });
};

export default { handleSignin };
