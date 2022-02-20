SELECT
    "Order"."id",
    "Order"."total",
    "Order"."totalVAT",
    "Order"."address",
    "Order"."locale",
    "Order"."zipcode",
    "Order"."observation",
    "Order"."fiscalNumber",
    "Order"."createdAt",
    "Order"."updatedAt",
    "Order"."UserId",
    "User"."id" AS "User.id",
    "User"."name" AS "User.name",
    "OrderLines"."id" AS "OrderLines.id",
    "OrderLines"."quantity" AS "OrderLines.quantity",
    "OrderLines"."total" AS "OrderLines.total",
    "OrderLines"."totalVAT" AS "OrderLines.totalVAT",
    "OrderLines"."createdAt" AS "OrderLines.createdAt",
    "OrderLines"."updatedAt" AS "OrderLines.updatedAt",
    "OrderLines"."OrderId" AS "OrderLines.OrderId",
    "OrderLines"."AnimalProductId" AS "OrderLines.AnimalProductId",
    "OrderLines"."EggsBatchProductId" AS "OrderLines.EggsBatchProductId",
    "OrderLines->EggsBatchProduct"."id" AS "OrderLines.EggsBatchProduct.id",
    "OrderLines->EggsBatchProduct"."ProductId" AS "OrderLines.EggsBatchProduct.ProductId",
    "OrderLines->EggsBatchProduct->Product"."id" AS "OrderLines.EggsBatchProduct.Product.id",
    "OrderLines->EggsBatchProduct->Product"."name" AS "OrderLines.EggsBatchProduct.Product.name",
    "OrderLines->EggsBatchProduct->Product"."OrganizationId" AS "OrderLines.EggsBatchProduct.Product.OrganizationId",
    "OrderLines->EggsBatchProduct->Product->Organization"."id" AS "OrderLines.EggsBatchProduct.Product.Organization.id",
    "OrderLines->EggsBatchProduct->Product->Organization"."name" AS "OrderLines.EggsBatchProduct.Product.Organization.name",
    "OrderLines->EggsBatchProduct->Product->Organization"."UserId" AS "OrderLines.EggsBatchProduct.Product.Organization.UserId",
    "OrderLines->AnimalProduct"."id" AS "OrderLines.AnimalProduct.id",
    "OrderLines->AnimalProduct"."ProductId" AS "OrderLines.AnimalProduct.ProductId",
    "OrderLines->AnimalProduct->Product"."id" AS "OrderLines.AnimalProduct.Product.id",
    "OrderLines->AnimalProduct->Product"."name" AS "OrderLines.AnimalProduct.Product.name",
    "OrderLines->AnimalProduct->Product"."OrganizationId" AS "OrderLines.AnimalProduct.Product.OrganizationId",
    "OrderLines->AnimalProduct->Product->Organization"."id" AS "OrderLines.AnimalProduct.Product.Organization.id",
    "OrderLines->AnimalProduct->Product->Organization"."name" AS "OrderLines.AnimalProduct.Product.Organization.name",
    "OrderLines->AnimalProduct->Product->Organization"."UserId" AS "OrderLines.AnimalProduct.Product.Organization.UserId"
FROM
    "Orders" AS "Order"
    LEFT OUTER JOIN "Users" AS "User" ON "Order"."UserId" = "User"."id"
    INNER JOIN "OrderLines" AS "OrderLines" ON "Order"."id" = "OrderLines"."OrderId"
    AND (
        (
            "OrderLine"."EggsBatchProductId" IS NOT NULL
            AND "EggsBatchProduct"."id" IS NOT NULL
        )
        OR (
            "OrderLine"."AnimalProductId" IS NOT NULL
            AND "AnimalProduct"."id" IS NOT NULL
        )
    )
    LEFT OUTER JOIN (
        "EggsBatchProducts" AS "OrderLines->EggsBatchProduct"
        INNER JOIN "Products" AS "OrderLines->EggsBatchProduct->Product" ON "OrderLines->EggsBatchProduct"."ProductId" = "OrderLines->EggsBatchProduct->Product"."id"
        INNER JOIN "Organizations" AS "OrderLines->EggsBatchProduct->Product->Organization" ON "OrderLines->EggsBatchProduct->Product"."OrganizationId" = "OrderLines->EggsBatchProduct->Product->Organization"."id"
        AND "OrderLines->EggsBatchProduct->Product->Organization"."UserId" = '8afab94f-fa16-4837-9807-d9359f81bfe2'
    ) ON "OrderLines"."EggsBatchProductId" = "OrderLines->EggsBatchProduct"."id"
    LEFT OUTER JOIN (
        "AnimalProducts" AS "OrderLines->AnimalProduct"
        INNER JOIN "Products" AS "OrderLines->AnimalProduct->Product" ON "OrderLines->AnimalProduct"."ProductId" = "OrderLines->AnimalProduct->Product"."id"
        INNER JOIN "Organizations" AS "OrderLines->AnimalProduct->Product->Organization" ON "OrderLines->AnimalProduct->Product"."OrganizationId" = "OrderLines->AnimalProduct->Product->Organization"."id"
        AND "OrderLines->AnimalProduct->Product->Organization"."UserId" = '8afab94f-fa16-4837-9807-d9359f81bfe2'
    ) ON "OrderLines"."AnimalProductId" = "OrderLines->AnimalProduct"."id";