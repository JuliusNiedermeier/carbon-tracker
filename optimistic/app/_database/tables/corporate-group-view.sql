CREATE VIEW corporate_group_view AS
WITH RECURSIVE corporate_group AS (
    SELECT company.slug AS root_company_slug, company.id, company.parent_company_id, company.slug, company.name, ARRAY[id] AS members
    FROM company
    WHERE company.parent_company_id IS NULL
    
    UNION ALL
    
    SELECT corporate_group.root_company_slug, company.id, company.parent_company_id, company.slug, company.name, corporate_group.members || company.id
    FROM company
    JOIN corporate_group ON company.parent_company_id = corporate_group.id
)

SELECT corporate_group.root_company_slug, json_agg(json_build_object('id', id, 'parentCompanyId', parent_company_id, 'slug', slug, 'name', name)) AS members
FROM corporate_group
GROUP BY corporate_group.root_company_slug
ORDER BY corporate_group.root_company_slug;