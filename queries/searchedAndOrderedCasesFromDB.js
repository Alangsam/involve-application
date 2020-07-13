const searchedAndOrderedCasesFromDB = `
    SELECT 
        *
    FROM
        involve_app.cases
    WHERE
        (cases.title LIKE ?
        OR cases.description LIKE ?)
    ORDER BY
        ?;
    `;
module.exports = searchedAndOrderedCasesFromDB;
