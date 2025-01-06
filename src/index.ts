import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import { router } from './router';

mongoose.connect('mongodb://localhost:27017')
    .then(() => {
        console.log('Connected to MongoDB');

        const app = express();
        const port = 3001;

        app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
        app.use(express.json())
        app.use(router);
        app.listen(port, '0.0.0.0', () => {
            console.log(`${Date.now()}: Server is running on port http://localhost:${port}`);
        });


    })
    .catch((error) => {
        console.log('Error connecting to MongoDB', error);
    });

