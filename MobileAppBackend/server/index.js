import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './config/db.config.js';

import postsRoutes from './routes/posts.route.js';
import authRoutes from './routes/auth.route.js';
import biomassRecordsRoutes from './routes/biomassRecords.route.js';
import imageProcessRoutes from './routes/imageProcess.route.js';
import { getLatestBiomassRecord } from './controllers/biomassRecord.controller.js';


const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(bodyParser.json({ limit: "30mb", extended:true}) );
app.use(bodyParser.urlencoded({ limit: "30mb", extended:true}) );
app.use('/api/posts', postsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/biomass-records', biomassRecordsRoutes);
app.use('/api/uploadimage', imageProcessRoutes);

// Expose latest result at /api/results for quick frontend fetch
app.get('/api/results', getLatestBiomassRecord);

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  connectDB();
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

export default app;
