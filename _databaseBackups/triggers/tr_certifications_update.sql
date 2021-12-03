-- Trigger: tr_certifications_update

-- DROP TRIGGER tr_certifications_update ON public."Certifications";

CREATE TRIGGER tr_certifications_update
    BEFORE UPDATE 
    ON public."Certifications"
    FOR EACH ROW
    EXECUTE FUNCTION public.tr_fc_certifications_update();