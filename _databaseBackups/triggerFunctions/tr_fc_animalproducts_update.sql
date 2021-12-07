-- FUNCTION: public.tr_fc_animalproducts_update()

-- DROP FUNCTION public.tr_fc_animalproducts_update();

CREATE FUNCTION public.tr_fc_animalproducts_update()
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
	 
	IF(OLD."quantity"<>NEW."quantity") THEN
		NEW."quantityAvailable" = OLD."quantityAvailable" + (NEW."quantity" - OLD."quantity");
	END IF;

	IF(NEW."quantityAvailable" >NEW."quantity") THEN
		RAISE EXCEPTION 'AnimalProducts.quantityAvailable cannot be greater then AnimalProducts.quantity';
	END IF;
	
	RETURN NEW;
END;
$BODY$;

ALTER FUNCTION public.tr_fc_animalproducts_update()
    OWNER TO postgres;
