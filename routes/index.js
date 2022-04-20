const leaderBoard = [];

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
  app.get("/scores", async (req, res) => {
    const sortedLeaderboard = leaderBoard.sort((a, b) => {
      return b.scores - a.scores;
    });
    return res.render("scores", { leaderboard: sortedLeaderboard });
  });
  app.post("/scores/add", async (req, res) => {
    const { username, score } = req.body;
    try {
      if (!username) {
        throw "Must pass username";
      }
      if (!score) {
        throw "Must pass score";
      }
      leaderBoard.push({
        username: username,
        score: score,
      });
      return res.json(true);
    } catch (e) {
      return res.status(500).send({ error: e });
    }
  });
  app.use("/*", (req, res) => {
    res.status(404).json({
      status: "Error",
      message: "Not found",
    });
  });
};
