type SslOptions = boolean | { rejectUnauthorized: boolean };

export const getSsl = (): SslOptions => {
    // DYNO es una variable de entorno única de Heroku
    return process.env.DYNO ? { rejectUnauthorized: false } : false;
};