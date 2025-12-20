import express from 'express';
import dotenv from 'dotenv';
import funcionarioRoutes from './routes/funcionarioRoutes.js';
import cors from 'cors';

dotenv.config();

// const express = require('express');
// const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json());
app.use('/funcionarios', funcionarioRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});




