module.exports = async (app) => {
  app.get("/", async (req, res) => {
    return res.render("homepage");
  });
  app.use("/*", (req, res) => {
    res.status(404).json({
      status: "Error",
      message: "Not found",
    });
  });
};
