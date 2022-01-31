-- FUNCTION: public.tr_fc_orderlines_insert()

-- DROP FUNCTION public.tr_fc_orderlines_insert();

CREATE OR REPLACE FUNCTION  public.tr_fc_orderlines_insert()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
	v_quantityAvailable_animalProducts integer;
	v_quantityAvailable_EggsBatchProducts integer;
	v_unit varchar(30);
BEGIN
	IF (NEW."AnimalProductId" IS NOT NULL AND NEW."EggsBatchProductId" IS NOT NULL) THEN
		RAISE EXCEPTION 'Record cannot have AnimalProductId and EggsBatchProductId fields';
	END IF;
	
	IF(NEW."AnimalProductId" IS NOT NULL) THEN
		SELECT "quantityAvailable"
		  INTO v_quantityAvailable_animalProducts
		  FROM "AnimalProducts"
		 WHERE "id" = NEW."AnimalProductId";

		IF(v_quantityAvailable_animalProducts<NEW."quantity") THEN
			RAISE EXCEPTION 'quantityAvailable cannot be less than AnimalProducts.quantity';
		END IF;
		
		UPDATE "AnimalProducts" SET "quantityAvailable" = "quantityAvailable" - NEW."quantity"
		 WHERE "id" = NEW."AnimalProductId";
	END IF;
	
	IF(NEW."EggsBatchProductId" IS NOT NULL) THEN
		SELECT "quantityAvailable"
		  INTO v_quantityAvailable_EggsBatchProducts
		  FROM "EggsBatchProducts"
		 WHERE "id" = NEW."EggsBatchProductId";
		 
		IF(v_quantityAvailable_EggsBatchProducts<NEW."quantity") THEN
			RAISE EXCEPTION 'quantityAvailable cannot be less than EggsBatchProducts.quantity';
		END IF;
		
		-- SELECT "unit"
	  	--   INTO v_unit
	  	--   FROM "Products"
	 	--  WHERE "id" = (SELECT "ProductId" 
		-- 			     FROM "EggsBatchProducts"
		-- 			    WHERE "id" = NEW."EggsBatchProductId");
	 
		-- IF(v_unit = 'DOZEN' AND (NEW."quantity"%12)<>0) THEN
		-- 	RAISE EXCEPTION 'Quantity must be divided by 12';
		-- END IF;
		-- IF(v_unit = 'HALFDOZEN' AND (NEW."quantity"%6)<>0) THEN
		-- 	RAISE EXCEPTION 'Quantity must be divided by 6';
		-- END IF;
		
		UPDATE "EggsBatchProducts" SET "quantityAvailable" = "quantityAvailable" - NEW."quantity" * 12
		 WHERE "id" = NEW."EggsBatchProductId";
	END IF;
	
	-- UPDATE "Orders" SET "total" = "total" + NEW."total",
	--    	   "totalVAT" =  "totalVAT" + NEW."totalVAT"
	--  WHERE "Orders"."id" = NEW."OrderId";
	

	RETURN NEW;
END;
$BODY$;

ALTER FUNCTION public.tr_fc_orderlines_insert()
    OWNER TO postgres;