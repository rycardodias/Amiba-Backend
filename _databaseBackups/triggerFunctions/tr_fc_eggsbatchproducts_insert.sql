-- FUNCTION: public.tr_fc_eggsbatchproducts_insert()

-- DROP FUNCTION public.tr_fc_eggsbatchproducts_insert();

CREATE OR REPLACE FUNCTION  public.tr_fc_eggsbatchproducts_insert()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
	v_quantity_EggsBatch integer default 0;
	v_quantity_EggsBatchProducts integer default 0;
	v_type varchar(100);
	v_unit varchar(100);
BEGIN
	IF (NEW."quantity" <1) THEN
		RAISE EXCEPTION 'quantity must be greater than 0';
	END IF;
	IF (NEW."quantityAvailable" <0) THEN
		RAISE EXCEPTION 'quantity must be greater than 0';
	END IF;
	
	SELECT "type", "unit"
	  INTO v_type, v_unit
	  FROM "Products"
	 WHERE "id" = NEW."ProductId";
	 
	IF(v_type <> 'LOTE') THEN
		RAISE EXCEPTION 'Invalid type %', v_type;
	END IF;
	
	IF(v_unit != 'DOZEN' AND v_unit != 'HALFDOZEN') THEN
		RAISE EXCEPTION 'Invalid unit %', v_unit;
	END IF;
	
	IF(v_unit = 'DOZEN' AND (NEW."quantity"%12)<>0) THEN
		RAISE EXCEPTION 'Quantity must be divided by 12';
	END IF;
	
	IF(v_unit = 'HALFDOZEN' AND (NEW."quantity"%6)<>0) THEN
		RAISE EXCEPTION 'Quantity must be divided by 6';
	END IF;
	
	NEW."quantityAvailable" = NEW."quantity";
	
	SELECT COALESCE(SUM("quantity"),0)
	  INTO v_quantity_EggsBatch
	  FROM public."EggsBatches"
	 WHERE "id" = NEW."EggsBatchId";
	 
	SELECT COALESCE(SUM("quantity"),0)
	  INTO v_quantity_EggsBatchProducts
	  FROM public."EggsBatchProducts"
	 WHERE "EggsBatchId" = NEW."EggsBatchId";
	 
	IF((v_quantity_EggsBatch - v_quantity_EggsBatchProducts)< NEW."quantity") THEN
		RAISE EXCEPTION 'Invalid quantity available for use';
	END IF;
	
	RETURN NEW;

END;
$BODY$;

ALTER FUNCTION public.tr_fc_eggsbatchproducts_insert()
    OWNER TO postgres;
