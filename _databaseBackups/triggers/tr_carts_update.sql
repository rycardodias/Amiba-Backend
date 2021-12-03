-- Trigger: tr_carts_update

-- DROP TRIGGER tr_carts_update ON public."Carts";

CREATE TRIGGER tr_carts_update
    BEFORE UPDATE
    ON public."Carts"
    FOR EACH ROW
    EXECUTE FUNCTION public.tr_fc_carts_update();
