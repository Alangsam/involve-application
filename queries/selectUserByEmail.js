const selectUserByEmail = `
        SELECT 
           id
        FROM
        involve_app.users
        WHERE
            email = ?
        LIMIT 1;
    `;
module.exports = selectUserByEmail;
