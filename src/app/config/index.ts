import dotenv from 'dotenv';
import path from 'path';

// Correct path to the .env file
dotenv.config({ path: path.join(process.cwd(), '.env') });

// Print all environment variables to debug
// console.log(process.env);

// Log the specific environment variable to check if it's defined
console.log('DATABASE_URL:', process.env.DATABASE_URL);

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};
