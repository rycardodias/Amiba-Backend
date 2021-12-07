-- FUNCTION: public.tr_fc_animalproducts_delete()

-- DROP FUNCTION public.tr_fc_animalproducts_delete();

CREATE FUNCTION public.tr_fc_animalproducts_delete()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
	IF(OLD."quantity"<>OLD."quantityAvailable") THEN
		RAISE EXCEPTION 'Cannot remove animalProducts with quantity <> quantityAvailable';
	END IF;

	RETURN OLD;
END
$BODY$;

ALTER FUNCTION public.tr_fc_animalproducts_delete()
    OWNER TO postgres;
