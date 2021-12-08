-- FUNCTION: public.tr_fc_eggsbatchproducts_update()

-- DROP FUNCTION public.tr_fc_eggsbatchproducts_update();

CREATE OR REPLACE FUNCTION  public.tr_fc_eggsbatchproducts_update()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
	v_quantity_EggsBatchExplorations integer default 0;
	v_quantity_EggsBatchProducts integer default 0;
	v_new_quantity_EggsBatchProducts integer default 0;
BEGIN
	IF (NEW."quantity" <1) THEN
		RAISE EXCEPTION 'quantity must be greater than 0';
	END IF;
	IF (NEW."quantityAvailable" <0) THEN
		RAISE EXCEPTION 'quantityAvailable must be greater than 0';
	END IF;
	IF (NEW."quantityAvailable" > NEW."quantity") THEN
		RAISE EXCEPTION 'quantityAvailable cannot be greater than quantity';
	END IF;
	IF((NEW."quantityAvailable"%NEW."divider")<>0) THEN
		RAISE EXCEPTION 'quantityAvailable must have 0 remaining from division';
	END IF;
	IF (NEW."ProductId"<>OLD."ProductId") THEN
		RAISE EXCEPTION 'ProductId cannot be changed';
	END IF;
	IF (NEW."EggsBatchId"<>OLD."EggsBatchId") THEN
		RAISE EXCEPTION 'EggsBatchId cannot be changed';
	END IF;
	
	SELECT COALESCE(SUM("quantity"),0)
	  INTO v_quantity_EggsBatchExplorations
	  FROM public."EggsBatchExplorations"
	 WHERE "EggsBatchId" = NEW."EggsBatchId";
	 
	SELECT COALESCE(SUM("quantity"),0)
	  INTO v_quantity_EggsBatchProducts
	  FROM public."EggsBatchProducts"
	 WHERE "EggsBatchId" = NEW."EggsBatchId";
	 
	 v_new_quantity_EggsBatchProducts = v_quantity_EggsBatchProducts + (NEW."quantity" - OLD."quantity");
	 	 
	IF(v_new_quantity_EggsBatchProducts>v_quantity_EggsBatchExplorations) THEN
		RAISE EXCEPTION 'quantity cannot be greater than EggsBatchExplorations.quantity available';
	END IF;
	
	IF(NEW."quantityAvailable"=OLD."quantityAvailable") THEN
		IF ((OLD."quantityAvailable" + (NEW."quantity" - OLD."quantity"))<0) THEN
			RAISE EXCEPTION 'quantityAvailable must be greater or equal than 0';
		END IF;
		NEW."quantityAvailable" = OLD."quantityAvailable" + (NEW."quantity" - OLD."quantity");
	END IF;
	RETURN NEW;

END;
$BODY$;

ALTER FUNCTION public.tr_fc_eggsbatchproducts_update()
    OWNER TO postgres;
