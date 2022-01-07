SELECT
    "Organization"."id",
    "Organization"."name",
    "Products"."id" AS "Products.id",
    "Products->AnimalProducts"."id" AS "Products.AnimalProducts.id",
    "Products->AnimalProducts"."quantityAvailable" AS "Products.AnimalProducts.quantityAvailable",
    "Products->EggsBatchProducts"."id" AS "Products.EggsBatchProducts.id",
    "Products->EggsBatchProducts"."quantityAvailable" AS "Products.EggsBatchProducts.quantityAvailable"
FROM
    "Organizations" AS "Organization"
    LEFT OUTER JOIN "Products" AS "Products" ON "Organization"."id" = "Products"."OrganizationId"
    LEFT OUTER JOIN "AnimalProducts" AS "Products->AnimalProducts" ON "Products"."id" = "Products->AnimalProducts"."ProductId"
    LEFT OUTER JOIN "EggsBatchProducts" AS "Products->EggsBatchProducts" ON "Products"."id" = "Products->EggsBatchProducts"."ProductId"
WHERE
    (
        "Products->AnimalProducts"."quantityAvailable" > 0
        OR "Products->EggsBatchProducts"."quantityAvailable" > 0
    );