const selectOrgByName = `
        SELECT 
           \`name\`
        FROM
        involve_app.organizations
        WHERE
            \`name\` = ?
        LIMIT 1;
    `;
module.exports = selectOrgByName;
