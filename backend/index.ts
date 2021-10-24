import express from 'express';
import db from './models';
import router from "./router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync().then(() => {
    app.listen(8080, () => {
        console.log('The application is listening on port 3000!');
    })
});

app.use(router);

/// catch 404 and forward to error handler
// app.use((req, res, next) => {
//     const err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

export { db };
