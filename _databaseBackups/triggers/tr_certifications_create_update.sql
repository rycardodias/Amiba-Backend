-- Trigger: tr_certifications_create_update

-- DROP TRIGGER tr_certifications_create_update ON public."Certifications";

CREATE TRIGGER tr_certifications_create_update
    BEFORE INSERT OR UPDATE 
    ON public."Certifications"
    FOR EACH ROW
    EXECUTE FUNCTION public.tr_fc_certifications_create_update();