import app from "./app.js";
import "dotenv/config"

const PORT = process.env.PORT || 7777

app.listen(PORT, () => {
    console.log(`Servidor on http://localhost:${PORT} 🚀`)
})