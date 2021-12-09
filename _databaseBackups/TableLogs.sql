-- Table: public.Logs

-- DROP TABLE public."Logs";

CREATE TABLE IF NOT EXISTS public."Logs"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "table" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    operation character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "values" text COLLATE pg_catalog."default",
    date timestamp with time zone NOT NULL DEFAULT now(),
    "user" character varying(50) COLLATE pg_catalog."default" NOT NULL DEFAULT "current_user"(),
    CONSTRAINT "Logs_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public."Logs"
    OWNER to postgres;