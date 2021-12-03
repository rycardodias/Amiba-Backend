-- FUNCTION: public.tr_fc_carts_update()

-- DROP FUNCTION public.tr_fc_carts_update();

CREATE FUNCTION public.tr_fc_carts_update()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
	v_newQuantityAvailable integer default 0;
	v_quantity integer default 0;
	v_existing_quantity integer default 0;
BEGIN	
	IF (NEW."quantity" <1) THEN
		RAISE EXCEPTION 'Quantity cannot be lower than 1';
	END IF;
	
	IF(OLD."id"<>NEW."id") THEN
		RAISE EXCEPTION 'Carts.id cannot be changed';
	END IF;
	IF(OLD."createdAt"<>NEW."createdAt") THEN
		RAISE EXCEPTION 'Carts.createdAt cannot be changed';
	END IF;
	IF(OLD."AnimalProductId"<>NEW."AnimalProductId") THEN
		RAISE EXCEPTION 'Carts.AnimalProductId cannot be changed';
	END IF;
	IF(OLD."EggsBatchProductId"<>NEW."EggsBatchProductId") THEN
		RAISE EXCEPTION 'Carts.EggsBatchProductId cannot be changed';
	END IF;
	IF(OLD."UserId"<>NEW."UserId") THEN
		RAISE EXCEPTION 'Carts.UserId cannot be changed';
	END IF;
	
	RETURN NEW;
END;
$BODY$;

ALTER FUNCTION public.tr_fc_carts_update()
    OWNER TO postgres;