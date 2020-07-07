const selectUserById = `
        SELECT 
           id, email, created_date
        FROM
        involve_app.users
        WHERE
            id = ?
        LIMIT 1;
    `;
module.exports = selectUserById;
