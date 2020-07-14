const findNameById = `
        SELECT 
           \`name\`
        FROM
            involve_app.users
        WHERE
            id = ?
        LIMIT 1;
    `;

module.exports = findNameById;
