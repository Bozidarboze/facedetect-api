const handleRegister = (db, bcrypt) => (req, res) => {
  const { email, password, name } = req.body;

  if (name && email && password) {
    const hash = bcrypt.hashSync(password, 1);

    db.transaction((trx) => {
      trx
        .insert({ email: email, hash: hash })
        .into("login")
        .returning("email")
        .then((loginEmail) => {
          trx("users")
            .returning("*")
            .insert({
              email: loginEmail[0],
              name: name,
              joined: new Date(),
            })
            .then((user) => {
              res.json(user[0]);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    }).catch((err) => {
      res.status(400).json("Unable to register");
    });
  } else {
    res.status(400).json("All forms are required");
  }
};

export default { handleRegister };
