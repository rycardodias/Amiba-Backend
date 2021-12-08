-- Trigger: tr_animalProducts_insert

DROP TRIGGER IF EXISTS "tr_animalProducts_insert" ON public."AnimalProducts";

CREATE TRIGGER "tr_animalProducts_insert"
    BEFORE INSERT
    ON public."AnimalProducts"
    FOR EACH ROW
    EXECUTE FUNCTION public.tr_fc_animalproducts_insert();