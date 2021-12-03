-- FUNCTION: public.tr_fc_orderlines_insert()

-- DROP FUNCTION public.tr_fc_orderlines_insert();

CREATE OR REPLACE FUNCTION public.tr_fc_orderlines_insert()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
	v_UserId uuid;
	v_quantity_carts integer default 0;
	v_quantity_products integer default 0;
	v_ProductId uuid;
	v_animalProduct_weight integer default 0;
	v_product_unit varchar(255);
	v_product_price float;
	v_product_tax integer default 0;
	v_total integer default 0;
	v_totalVAT integer default 0;
BEGIN
	IF (NEW."AnimalProductId" IS NOT NULL AND NEW."EggsBatchProductId" IS NOT NULL) THEN
		RAISE EXCEPTION 'Record cannot have AnimalProductId and EggsBatchProductId fields';
	END IF;
	IF (NEW."quantity" <1) THEN
		RAISE EXCEPTION 'Quantity cannot be lower than 1';
	END IF;
	
	SELECT "UserId", "total", "totalVAT"
	  INTO v_UserId, v_total, v_totalVAT
	  FROM public."Orders"
	 WHERE "Orders"."id" = NEW."OrderId";
	 
	 SELECT quantity
	   INTO v_quantity_carts
	   FROM public."Carts"
	  WHERE "Carts"."UserId" = v_UserId
		AND ("Carts"."AnimalProductId" = NEW."AnimalProductId"
			 OR "Carts"."EggsBatchProductId" = NEW."EggsBatchProductId");
			 
	IF(v_quantity_carts > 0) THEN
		IF(v_quantity_carts = NEW."quantity") THEN
			DELETE FROM public."Carts"
			 WHERE "Carts"."UserId" = v_UserId
			   AND ("Carts"."AnimalProductId" = NEW."AnimalProductId"
			 		OR "Carts"."EggsBatchProductId" = NEW."EggsBatchProductId");
		ELSE
			UPDATE public."Carts"
			   SET "quantity" = (v_quantity_carts - NEW."quantity")
			 WHERE "Carts"."UserId" = v_UserId
			   AND ("Carts"."AnimalProductId" = NEW."AnimalProductId"
			 		OR "Carts"."EggsBatchProductId" = NEW."EggsBatchProductId");
		END IF;
	END IF;
	
	IF(NEW."AnimalProductId" IS NOT NULL) THEN
		SELECT quantity, "ProductId", "weight"
		  INTO v_quantity_products, v_ProductId, v_animalProduct_weight
		  FROM public."AnimalProducts"
		 WHERE "AnimalProducts"."id" = NEW."AnimalProductId";
	ELSIF(NEW."EggsBatchProductId" IS NOT NULL) THEN
		SELECT quantity, "ProductId"
		  INTO v_quantity_products, v_ProductId
		  FROM public."EggsBatchProducts"
		 WHERE "EggsBatchProducts"."id" = NEW."EggsBatchProductId";
	END IF;
	
	IF((v_quantity_products - NEW."quantity")<0) THEN
		RAISE EXCEPTION 'quantityAvailable cannot be less than AnimalProducts.quantity';
	END IF;
	
	IF(NEW."AnimalProductId" IS NOT NULL) THEN
		UPDATE public."AnimalProducts"
		   SET "quantityAvailable" = (v_quantity_products - NEW."quantity")
		 WHERE "AnimalProducts"."id" = NEW."AnimalProductId";
	ELSIF(NEW."EggsBatchProductId" IS NOT NULL) THEN
		UPDATE public."EggsBatchProducts"
		   SET "quantityAvailable" = (v_quantity_products - NEW."quantity")
		 WHERE "EggsBatchProducts"."id" = NEW."EggsBatchProductId";
	END IF;
				
	/* CALCULAR O PREÇO APARTIR DAS UNIDADES DOS PRODUTOS*/
	SELECT "unit", "tax", "price"
	  INTO v_product_unit, v_product_tax, v_product_price
	  FROM public."Products"
	 WHERE "id" = v_ProductId;
		   
	IF(v_product_unit = 'UNID') THEN
		NEW."total"= NEW."quantity" * v_product_price::float;
	ELSIF (v_product_unit = 'KG') THEN
		NEW."total"=  NEW."quantity" * (v_animalProduct_weight::float(2)/1000) * v_product_price::float;
	ELSIF(v_product_unit = 'DOZEN') THEN
		NEW."total"= (NEW."quantity" * v_product_price::float) / 12;
	END IF;

	NEW."totalVAT"= NEW."total" * (v_product_tax::float/100);
	
	UPDATE public."Orders"
	   SET "total" = v_total + NEW."total",
	       "totalVAT" = v_totalVAT + NEW."totalVAT"
	 WHERE "id" = NEW."OrderId";
	
	RETURN NEW;
END;
$BODY$;

ALTER FUNCTION public.tr_fc_orderlines_insert()
    OWNER TO postgres;