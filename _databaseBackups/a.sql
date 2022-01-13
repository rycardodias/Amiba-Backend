SELECT
    "Product"."id",
    "Product"."type",
    "Product"."name",
    "Product"."description",
    "Product"."price",
    "Product"."unit",
    "Product"."tax",
    "Product"."image",
    "Product"."createdAt",
    "Product"."updatedAt",
    "Product"."OrganizationId",
    (
        SELECT
            CAST(sum AS INTEGER)
        FROM
            (
                SELECT
                    SUM("quantityAvailable")
                FROM
                    "AnimalProducts"
                WHERE
                    "AnimalProducts"."ProductId" = "Product"."id"
                UNION
                ALL
                SELECT
                    SUM("quantityAvailable")
                FROM
                    "EggsBatchProducts"
                WHERE
                    "EggsBatchProducts"."ProductId" = "Product"."id"
            ) v
        WHERE
            sum IS NOT NULL
    ) AS "quantityAvailable",
    "AnimalProducts"."id" AS "AnimalProducts.id",
    "AnimalProducts"."quantity" AS "AnimalProducts.quantity",
    "AnimalProducts"."quantityAvailable" AS "AnimalProducts.quantityAvailable",
    "AnimalProducts"."weight" AS "AnimalProducts.weight",
    "AnimalProducts"."createdAt" AS "AnimalProducts.createdAt",
    "AnimalProducts"."updatedAt" AS "AnimalProducts.updatedAt",
    "AnimalProducts"."ProductId" AS "AnimalProducts.ProductId",
    "AnimalProducts"."AnimalId" AS "AnimalProducts.AnimalId",
    "EggsBatchProducts"."id" AS "EggsBatchProducts.id",
    "EggsBatchProducts"."quantity" AS "EggsBatchProducts.quantity",
    "EggsBatchProducts"."quantityAvailable" AS "EggsBatchProducts.quantityAvailable",
    "EggsBatchProducts"."createdAt" AS "EggsBatchProducts.createdAt",
    "EggsBatchProducts"."updatedAt" AS "EggsBatchProducts.updatedAt",
    "EggsBatchProducts"."ProductId" AS "EggsBatchProducts.ProductId",
    "EggsBatchProducts"."EggsBatchId" AS "EggsBatchProducts.EggsBatchId",
    "Organization"."id" AS "Organization.id",
    "Organization"."name" AS "Organization.name",
    "Organization"."address" AS "Organization.address",
    "Organization"."locale" AS "Organization.locale",
    "Organization"."zipcode" AS "Organization.zipcode",
    "Organization"."telephone" AS "Organization.telephone",
    "Organization"."mobilePhone" AS "Organization.mobilePhone",
    "Organization"."fiscalNumber" AS "Organization.fiscalNumber",
    "Organization"."createdAt" AS "Organization.createdAt",
    "Organization"."updatedAt" AS "Organization.updatedAt",
    "Organization"."UserId" AS "Organization.UserId"
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
    3;