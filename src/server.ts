import config from './config';
import app from './app';
import { db } from './database/db';

db.authenticate().then(async () => {
    console.log('Connection to database has been established successfully.');
    // await db.sync({ alter: true });
    app.listen(config.PORT, () => console.log(`App is running on http://localhost:${config.PORT}`));
});
