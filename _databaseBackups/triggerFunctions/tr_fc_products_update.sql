-- FUNCTION: public.tr_fc_products_update()

-- DROP FUNCTION public.tr_fc_products_update();

CREATE FUNCTION public.tr_fc_products_update()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
	
BEGIN
	IF(OLD."id"<>NEW."id") THEN
		RAISE EXCEPTION 'Products.id cannot be changed';
	END IF;
	IF(OLD."createdAt"<>NEW."createdAt") THEN
		RAISE EXCEPTION 'Products.createdAt cannot be changed';
	END IF;
	IF(OLD."OrganizationId"<>NEW."OrganizationId") THEN
		RAISE EXCEPTION 'Products.OrganizationId cannot be changed';
	END IF;
	IF(OLD."unit"<>NEW."unit") THEN
		RAISE EXCEPTION 'Products.unit cannot be changed';
	END IF;
	RETURN NEW;
END;
$BODY$;

ALTER FUNCTION public.tr_fc_products_update()
    OWNER TO postgres;