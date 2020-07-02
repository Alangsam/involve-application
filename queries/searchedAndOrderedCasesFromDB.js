const searchedAndOrderedCasesFromDB = `
    SELECT 
        *
    FROM
        involve_app.cases
    WHERE
        cases.updated_by_user_id = ?
            AND (cases.title LIKE ?
            OR cases.description LIKE ?)
    ORDER BY
        ?;
    `;
module.exports = searchedAndOrderedCasesFromDB;
