import app from './src/app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(` Logicwind Backend Server Running!`);
  console.log(` Listening on: http://localhost:${PORT}`);
  console.log(` Health check: http://localhost:${PORT}/api/health`);
  console.log(` Environment:  ${process.env.NODE_ENV || 'development'}`);
  console.log(`=========================================`);
});
