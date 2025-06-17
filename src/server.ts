import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';
import seedSuperAdmin from './app/DB';

let server: Server;

async function main() {
  try {
    await mongoose.connect(
      config.database_url as string,
      // {dbName: 'PH-University'}
    );

    await seedSuperAdmin();

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on('unhandledRejection', (err) => {
  console.log(`detected unhandledRejection, shuttting down...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});

process.on('uncaughtException', (err) => {
  console.log(`detected uncaughtException, shuttting down...`, err);
  process.exit(1);
});
