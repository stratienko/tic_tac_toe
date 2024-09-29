import dotenv from 'dotenv';
import { createServer } from 'express-zod-api';
import { routing } from '@/routing';
import { config } from '@/config/v1';

dotenv.config();

createServer(config, routing);
