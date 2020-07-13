const selectUserNameByName = `
        SELECT 
           name
        FROM
            involve_app.users
        WHERE
            name = ?
        LIMIT 1;
    `;
module.exports = selectUserNameByName;
