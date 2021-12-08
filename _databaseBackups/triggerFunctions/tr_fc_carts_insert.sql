-- FUNCTION: public.tr_fc_carts_insert()

-- DROP FUNCTION public.tr_fc_carts_insert();

CREATE OR REPLACE FUNCTION  public.tr_fc_carts_insert()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
	v_quantityAvailable_AnimalProducts integer;
	v_quantityAvailable_EggsBatchProducts integer;
	v_quantity_cart integer;
	v_unit varchar(50);
BEGIN
	IF (NEW."AnimalProductId" IS NOT NULL AND NEW."EggsBatchProductId" IS NOT NULL) THEN
		RAISE EXCEPTION 'Record cannot have AnimalProductId and EggsBatchProductId fields';
	END IF;
	
	IF (NEW."quantity" <1) THEN
		RAISE EXCEPTION 'Quantity cannot be lower than 1';
	END IF;
	
	IF (NEW."AnimalProductId" IS NOT NULL) THEN
		SELECT "quantityAvailable"
		  INTO v_quantityAvailable_AnimalProducts
	 	  FROM "AnimalProducts"
		 WHERE "id" = NEW."AnimalProductId";
		 
		 SELECT "quantity"
		  INTO v_quantity_cart
		  FROM "Carts"
		 WHERE "Carts"."UserId" = NEW."UserId"
	  	   AND "AnimalProductId" = NEW."AnimalProductId";
		 
		 IF (NEW."quantity" > (v_quantityAvailable_EggsBatchProducts - v_quantity_cart)) THEN
			RAISE EXCEPTION 'Quantity cannot be greater than available quantity';
		 END IF;
	END IF;
	
	IF (NEW."EggsBatchProductId" IS NOT NULL) THEN
		SELECT "unit"
		  INTO v_unit
		  FROM "Products"
		 WHERE "id" = (SELECT "ProductId" 
					     FROM "EggsBatchProducts"
					    WHERE "id" = NEW."EggsBatchProductId");

		IF(v_unit = 'DOZEN' AND (NEW."quantity"%12)<>0) THEN
			RAISE EXCEPTION 'Quantity must be divided by 12';
		END IF;

		IF(v_unit = 'HALFDOZEN' AND (NEW."quantity"%6)<>0) THEN
			RAISE EXCEPTION 'Quantity must be divided by 6';
		END IF;
		
		SELECT "quantityAvailable"
		  INTO v_quantityAvailable_EggsBatchProducts
	 	  FROM "EggsBatchProducts"
		 WHERE "id" = NEW."EggsBatchProductId";
		
		SELECT "quantity"
		  INTO v_quantity_cart
		  FROM "Carts"
		 WHERE "Carts"."UserId" = NEW."UserId"
	  	   AND "EggsBatchProductId" = NEW."EggsBatchProductId";
		  
		 IF (NEW."quantity" > (v_quantityAvailable_EggsBatchProducts - v_quantity_cart)) THEN
			RAISE EXCEPTION 'Quantity cannot be greater than available quantity';
		 END IF;
	END IF;
	
	-- ver se já existe outra linha com o mesmo artigo
	SELECT quantity
	  INTO v_quantity_cart
	  FROM public."Carts"
	 WHERE "Carts"."UserId" = NEW."UserId"
	   AND ("Carts"."AnimalProductId" = NEW."AnimalProductId"
		 	OR "Carts"."EggsBatchProductId" = NEW."EggsBatchProductId");
	
	IF(v_quantity_cart > 0) THEN	
		UPDATE public."Carts" SET "quantity" = "quantity" + NEW."quantity" 
		 WHERE "Carts"."UserId" = NEW."UserId"
		   AND ("Carts"."AnimalProductId" = NEW."AnimalProductId"
			   OR "Carts"."EggsBatchProductId" = NEW."EggsBatchProductId");
			   
		RETURN OLD;
	END IF;
	
	RETURN NEW;
END;
$BODY$;

ALTER FUNCTION public.tr_fc_carts_insert()
    OWNER TO postgres;
