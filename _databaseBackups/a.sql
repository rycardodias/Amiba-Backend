SELECT
    "OrderLine"."id",
    "OrderLine"."quantity",
    "OrderLine"."total",
    "OrderLine"."totalVAT",
    "OrderLine"."createdAt",
    "OrderLine"."updatedAt",
    "OrderLine"."OrderId",
    "OrderLine"."AnimalProductId",
    "OrderLine"."EggsBatchProductId",
    "EggsBatchProduct"."id" AS "EggsBatchProduct.id",
    "EggsBatchProduct"."ProductId" AS "EggsBatchProduct.ProductId",
    "EggsBatchProduct->Product"."id" AS "EggsBatchProduct.Product.id",
    "EggsBatchProduct->Product"."name" AS "EggsBatchProduct.Product.name",
    "EggsBatchProduct->Product"."OrganizationId" AS "EggsBatchProduct.Product.OrganizationId",
    "EggsBatchProduct->Product->Organization"."id" AS "EggsBatchProduct.Product.Organization.id",
    "EggsBatchProduct->Product->Organization"."name" AS "EggsBatchProduct.Product.Organization.name",
    "EggsBatchProduct->Product->Organization"."UserId" AS "EggsBatchProduct.Product.Organization.UserId",
    "AnimalProduct"."id" AS "AnimalProduct.id",
    "AnimalProduct"."ProductId" AS "AnimalProduct.ProductId",
    "AnimalProduct->Product"."id" AS "AnimalProduct.Product.id",
    "AnimalProduct->Product"."name" AS "AnimalProduct.Product.name",
    "AnimalProduct->Product"."OrganizationId" AS "AnimalProduct.Product.OrganizationId",
    "AnimalProduct->Product->Organization"."id" AS "AnimalProduct.Product.Organization.id",
    "AnimalProduct->Product->Organization"."name" AS "AnimalProduct.Product.Organization.name",
    "AnimalProduct->Product->Organization"."UserId" AS "AnimalProduct.Product.Organization.UserId"
FROM
    "OrderLines" AS "OrderLine"
    LEFT OUTER JOIN (
        "EggsBatchProducts" AS "EggsBatchProduct"
        INNER JOIN "Products" AS "EggsBatchProduct->Product" ON "EggsBatchProduct"."ProductId" = "EggsBatchProduct->Product"."id"
        INNER JOIN "Organizations" AS "EggsBatchProduct->Product->Organization" ON "EggsBatchProduct->Product"."OrganizationId" = "EggsBatchProduct->Product->Organization"."id"
        AND "EggsBatchProduct->Product->Organization"."UserId" = '8afab94f-fa16-4837-9807-d9359f81bfe2'
    ) ON "OrderLine"."EggsBatchProductId" = "EggsBatchProduct"."id"
    LEFT OUTER JOIN (
        "AnimalProducts" AS "AnimalProduct"
        INNER JOIN "Products" AS "AnimalProduct->Product" ON "AnimalProduct"."ProductId" = "AnimalProduct->Product"."id"
        INNER JOIN "Organizations" AS "AnimalProduct->Product->Organization" ON "AnimalProduct->Product"."OrganizationId" = "AnimalProduct->Product->Organization"."id"
        AND "AnimalProduct->Product->Organization"."UserId" = '8afab94f-fa16-4837-9807-d9359f81bfe2'
    ) ON "OrderLine"."AnimalProductId" = "AnimalProduct"."id"
WHERE
    (
        "OrderLine"."AnimalProductId" = '1a64b213-d21c-4616-b534-bc3370b86897'
        OR "OrderLine"."EggsBatchProductId" = '1a64b213-d21c-4616-b534-bc3370b86897'
    );