SELECT
    COUNT(*)
FROM
    "Products" AS "Product"
    LEFT OUTER JOIN "AnimalProducts" AS "AnimalProducts" ON "Product"."id" = "AnimalProducts"."ProductId"
    LEFT OUTER JOIN "EggsBatchProducts" AS "EggsBatchProducts" ON "Product"."id" = "EggsBatchProducts"."ProductId"
    LEFT OUTER JOIN "Organizations" AS "Organization" ON "Product"."OrganizationId" = "Organization"."id"
WHERE
    (
        "AnimalProducts"."quantityAvailable" > 0
        OR "EggsBatchProducts"."quantityAvailable" > 0
    )
LIMIT
    1;