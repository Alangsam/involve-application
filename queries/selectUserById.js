const selectUserById = `
        SELECT 
           id, name, organization, email, created_date
        FROM
            involve_app.users
        WHERE
            id = ?
        LIMIT 1;
    `;
module.exports = selectUserById;
