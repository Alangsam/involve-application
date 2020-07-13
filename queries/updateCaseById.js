const updateCaseById = `
UPDATE involve_app.cases 
SET 
    title = ?,
    image_url = ?,
    sub_title = ?,
    description = ?,
    created_at = ?,
    last_updated_at = ?,
    updated_by_user_id = ?,
    created_by_user_id = ?,
    contact_name = ?,
    contact_phone = ?,
    contact_email = ?
WHERE
    id = ?;
`;

module.exports = updateCaseById;
