-- FUNCTION: public.tr_fc_certifications_update()

-- DROP FUNCTION public.tr_fc_certifications_update();

CREATE FUNCTION public.tr_fc_certifications_update()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
	
BEGIN
	IF(OLD."id"<>NEW."id") THEN
		RAISE EXCEPTION 'Certifications.id cannot be changed';
	END IF;
	IF(OLD."createdAt"<>NEW."createdAt") THEN
		RAISE EXCEPTION 'Certifications.createdAt cannot be changed';
	END IF;
	IF(OLD."certificationCode"<>NEW."certificationCode") THEN
		RAISE EXCEPTION 'Certifications.certificationCode cannot be changed';
	END IF;
	IF(OLD."initialDate"<>NEW."initialDate") THEN
		RAISE EXCEPTION 'Certifications.initialDate cannot be changed';
	END IF;
	IF(OLD."finalDate"<>NEW."finalDate") THEN
		RAISE EXCEPTION 'Certifications.finalDate cannot be changed';
	END IF;
	IF(OLD."ExplorationId"<>NEW."ExplorationId") THEN
		RAISE EXCEPTION 'Certifications.ExplorationId cannot be changed';
	END IF;

	RETURN NEW;
END;
$BODY$;

ALTER FUNCTION public.tr_fc_certifications_update()
    OWNER TO postgres;