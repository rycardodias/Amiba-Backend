-- FUNCTION: public.tr_fc_eggsbatchproducts_insert()

-- DROP FUNCTION public.tr_fc_eggsbatchproducts_insert();

CREATE FUNCTION public.tr_fc_eggsbatchproducts_insert()
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
	
	SELECT COALESCE(SUM("quantity"),0)
	  INTO v_quantity_EggsBatchExplorations
	  FROM public."EggsBatchExplorations"
	 WHERE "EggsBatchId" = NEW."EggsBatchId";
	 
	SELECT COALESCE(SUM("quantity"),0)
	  INTO v_quantity_EggsBatchProducts
	  FROM public."EggsBatchProducts"
	 WHERE "EggsBatchId" = NEW."EggsBatchId";
	 
	 v_new_quantity_EggsBatchProducts = v_quantity_EggsBatchProducts + NEW."quantity";
	 
	IF(v_new_quantity_EggsBatchProducts>v_quantity_EggsBatchExplorations) THEN
		RAISE EXCEPTION 'quantity cannot be greater than EggsBatchExplorations.quantity available';
	END IF;
	
	NEW."quantityAvailable" = NEW."quantity";
	
	RETURN NEW;

END;
$BODY$;

ALTER FUNCTION public.tr_fc_eggsbatchproducts_insert()
    OWNER TO postgres;
