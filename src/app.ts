import express from 'express';
import bodyParser from 'body-parser';
import fileRoutes from './web/routes/index';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('src/web/public'));

// Routes
app.use('/api/files', fileRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});