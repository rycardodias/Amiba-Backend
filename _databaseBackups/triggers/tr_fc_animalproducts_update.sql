-- Trigger: tr_animalProducts_update

DROP TRIGGER IF EXISTS "tr_animalProducts_update" ON public."AnimalProducts";

CREATE TRIGGER "tr_animalProducts_update"
    BEFORE UPDATE
    ON public."AnimalProducts"
    FOR EACH ROW
    EXECUTE FUNCTION public.tr_fc_animalproducts_update();