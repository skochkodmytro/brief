import express from 'express';
import cors from 'cors';
import db from './models';
import router from "./router";
const { User } = db;

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync().then(async () => {
    const user = await User.findOne({ where: { login: 'skochkovd' } });
    if (!user) {
        await User.create({ login: 'skochkovd', password: '192837465vd' });
    }

    app.listen(8080, () => {
        console.log('The application is listening on port 8080!');
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
