const express = require("express");
const connectDB = require("./config/db");
const userRouter = require("./routers/user");
const memeRouter = require("./routers/meme");
const cors = require("cors");
const axios = require("axios"); // Install axios: npm install axios
const port = 5000;

const app = express();
app.use(
  cors({
    origin: [
      "https://memebet.luvnft.com",
      "http://localhost:5173",
      "http://localhost:5000",
    ],
    credentials: true,
  })
);
connectDB();
app.use(express.json());

app.use("/api/memes", memeRouter);
app.use("/api/users", userRouter);

app.get("/api/proxy-image", async (req, res) => {
  const imageUrl =
    "https://cdn.dorahacks.io/static/files/194a1cc81977f3c2a920ad645e3bc8c7.png@128h.webp"; // The image URL
  try {
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer", // Important for images
    });
    res.set("Content-Type", "image/webp"); // Set the correct content type
    res.send(Buffer.from(response.data, "binary"));
  } catch (error) {
    console.error("Proxy image error:", error);
    res.status(500).send("Error proxying image");
  }
});

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on https://memebet.luvnft.com`);
});