import app from './app';
import { load } from "dotenv";

load();

console.log(process.env);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
   console.log(`Server running on http://localhost:${PORT}`)
});
