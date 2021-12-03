-- Trigger: tr_animals_update

-- DROP TRIGGER tr_animals_update ON public."Animals";

CREATE TRIGGER tr_animals_update
    BEFORE UPDATE 
    ON public."Animals"
    FOR EACH ROW
    EXECUTE FUNCTION public.tr_fc_animals_update();