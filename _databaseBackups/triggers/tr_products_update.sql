-- Trigger: tr_products_update

-- DROP TRIGGER tr_products_update ON public."Products";

CREATE TRIGGER tr_products_update
    BEFORE  UPDATE 
    ON public."Products"
    FOR EACH ROW
    EXECUTE FUNCTION public.tr_fc_products_update();