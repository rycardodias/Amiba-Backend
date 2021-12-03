-- Trigger: tr_animals_insert

-- DROP TRIGGER tr_animals_insert ON public."Animals";

CREATE TRIGGER tr_animals_insert
    BEFORE INSERT 
    ON public."Animals"
    FOR EACH ROW
    EXECUTE FUNCTION public.tr_fc_animals_insert();