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

app.use(cors());
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
  app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
}

export default app;
