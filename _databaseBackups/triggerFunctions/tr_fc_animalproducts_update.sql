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
	IF(OLD."createdAt"<>NEW."createdAt") THEN
		RAISE EXCEPTION 'AnimalProducts.createdAt cannot be changed';
	END IF;
	IF(OLD."ProductId"<>NEW."ProductId") THEN
		RAISE EXCEPTION 'AnimalProducts.ProductId cannot be changed';
	END IF;
	IF(OLD."AnimalId"<>NEW."AnimalId") THEN
		RAISE EXCEPTION 'AnimalProducts.AnimalId cannot be changed';
	END IF;
	
	SELECT "unit"
	  INTO v_unit
	  FROM public."Products"
	 WHERE "Products"."id" = NEW."ProductId";
	 
	IF(v_unit = 'KG' AND NEW."weight"<1) THEN
			RAISE EXCEPTION 'Products in KG must have weight';
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