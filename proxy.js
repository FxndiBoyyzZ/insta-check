const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/api/proxy", async (req, res) => {
  const username = req.query.username;
  const url = `https://www.checkprofile.online/api/redis?key=profile-${username}`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115 Safari/537.36",
        "Accept": "*/*",
        "Referer": "https://www.checkprofile.online/",
        "Origin": "https://www.checkprofile.online",
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor proxy rodando na porta ${PORT}`);
});
