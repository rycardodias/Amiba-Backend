-- FUNCTION: public.tr_fc_animalproducts_insert()

-- DROP FUNCTION public.tr_fc_animalproducts_insert();

CREATE FUNCTION public.tr_fc_animalproducts_insert()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
	v_unit varchar(50);
BEGIN
	IF (NEW."quantity" <1) THEN
		RAISE EXCEPTION 'Quantity cannot be lower than 1';
	END IF;
	IF (NEW."quantityAvailable" <0) THEN
		RAISE EXCEPTION 'QuantityAvailable cannot be lower than 0';
	END IF;
	
	SELECT "unit"
	  INTO v_unit
	  FROM public."Products"
	 WHERE "Products"."id" = NEW."ProductId";
	 
	IF((v_unit = 'KG') AND (NEW."weight"<1 OR NEW."weight" IS NULL)) THEN
		RAISE EXCEPTION 'Products in KG must have weight';
	END IF;
	
	IF((v_unit = 'UNID') AND (NEW."weight" IS NOT NULL)) THEN
		RAISE EXCEPTION 'Products in UNID dont have weight';
	END IF;
	 
	NEW."quantityAvailable" = NEW."quantity";
	RETURN NEW;
END;
$BODY$;

ALTER FUNCTION public.tr_fc_animalproducts_insert()
    OWNER TO postgres;
