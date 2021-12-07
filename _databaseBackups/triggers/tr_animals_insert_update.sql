-- Trigger: tr_animals_insert_update

-- DROP TRIGGER tr_animals_insert_update ON public."Animals";

CREATE TRIGGER tr_animals_insert_update
    BEFORE INSERT OR UPDATE
    ON public."Animals"
    FOR EACH ROW
    EXECUTE FUNCTION public.tr_fc_animals_insert_update();