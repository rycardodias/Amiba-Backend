-- FUNCTION: public.tr_fc_carts_update()

-- DROP FUNCTION public.tr_fc_carts_update();

CREATE OR REPLACE FUNCTION  public.tr_fc_carts_update()
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
		   		 
		IF ((v_quantityAvailable_AnimalProducts -v_quantity_cart)< (NEW."quantity" - OLD."quantity")) THEN
			RAISE EXCEPTION 'Quantity cannot be greater than available quantity';
		END IF;
		 
	ELSIF (NEW."EggsBatchProductId" IS NOT NULL) THEN
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
		 
		 IF ((v_quantityAvailable_EggsBatchProducts -v_quantity_cart)< (NEW."quantity" - OLD."quantity")) THEN
			RAISE EXCEPTION 'Quantity cannot be greater than available quantity';
		END IF;
	END IF;
	
	RETURN NEW;
END;
$BODY$;

ALTER FUNCTION public.tr_fc_carts_update()
    OWNER TO postgres;
