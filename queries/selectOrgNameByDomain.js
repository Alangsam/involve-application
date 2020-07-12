const selectOrgNameByDomain = `
        SELECT 
           name
        FROM
        involve_app.organizations
        WHERE
            domain = ?
        LIMIT 1;
    `;
module.exports = selectOrgNameByDomain;
