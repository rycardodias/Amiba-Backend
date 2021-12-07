-- Trigger: tr_animalproducts_delete

-- DROP TRIGGER tr_animalproducts_delete ON public."AnimalProducts";

CREATE TRIGGER tr_animalproducts_delete
    BEFORE DELETE
    ON public."AnimalProducts"
    FOR EACH ROW
    EXECUTE FUNCTION public.tr_fc_animalproducts_delete();