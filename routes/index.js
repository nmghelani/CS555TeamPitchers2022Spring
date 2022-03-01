module.exports = async (app) => {
  app.get("/", async (req, res) => {
    return res.render("homepage");
  });
  app.get("/smashit", async (req, res) => {
    return res.render("smashit");
  });
  app.get("/waterit", async (req, res) => {
    return res.render("waterit");
  });
  app.get("/aimit", async (req, res) => {
    return res.render("aimit");
  });
  app.use("/*", (req, res) => {
    res.status(404).json({
      status: "Error",
      message: "Not found",
    });
  });
};
