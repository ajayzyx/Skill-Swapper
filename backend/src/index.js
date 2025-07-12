const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes")
const swapRoutes = require('./routes/swap.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors())
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/swaps', swapRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Skill Swap Backend Running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});