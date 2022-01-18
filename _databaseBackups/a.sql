SELECT
    "Product"."id",
    "Product"."OrganizationId",
    "AnimalProducts"."id" AS "AnimalProducts.id",
    "AnimalProducts"."quantityAvailable" AS "AnimalProducts.quantityAvailable",
    "EggsBatchProducts"."id" AS "EggsBatchProducts.id",
    "EggsBatchProducts"."quantityAvailable" AS "EggsBatchProducts.quantityAvailable",
    "EggsBatchProducts"."EggsBatchId" AS "EggsBatchProducts.EggsBatchId",
    "Organization"."id" AS "Organization.id"
FROM
    "Products" AS "Product"
    LEFT OUTER JOIN "AnimalProducts" AS "AnimalProducts" ON "Product"."id" = "AnimalProducts"."ProductId"
    LEFT OUTER JOIN "EggsBatchProducts" AS "EggsBatchProducts" ON "Product"."id" = "EggsBatchProducts"."ProductId"
    LEFT OUTER JOIN "Organizations" AS "Organization" ON "Product"."OrganizationId" = "Organization"."id";
WHERE
    (
        "AnimalProducts"."quantityAvailable" > 0
        OR "EggsBatchProducts"."quantityAvailable" > 0
    );