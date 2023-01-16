CREATE TABLE IF NOT EXISTS users
(
    id SERIAL NOT NULL PRIMARY KEY,
    email character varying(100) NOT NULL,
    full_name character varying(100),
    date_of_birth date,
    region character varying(100),
    city character varying(100),
    specialization character varying(100),
    password character varying(255),
    created_at character varying(50),
    updated_at character varying(50)
);

CREATE TABLE IF NOT EXISTS public.general
(
    id SERIAL NOT NULL PRIMARY KEY,
    name_eng character varying(255),
    name_kaz character varying(255),
    name_ru character varying(255),
    class_eng character varying(255),
    class_ru character varying(255),
    class_kaz character varying(255),
    "group" character varying(255)
);

CREATE TABLE IF NOT EXISTS public.drug_food_names
(
    id SERIAL NOT NULL PRIMARY KEY,
    drug_eng character varying(255),
    drug_kaz character varying(255),
    drug_ru character varying(255),
    food_eng character varying(255),
    food_kaz character varying(255),
    food_ru character varying(255)
);

CREATE TABLE IF NOT EXISTS public.drug_food_descriptions
(
    id SERIAL NOT NULL PRIMARY KEY,
    med_description_ru_body text,
    med_description_ru_ref text,
    consumer_description_ru text
);

CREATE TABLE IF NOT EXISTS public.drug_drug_names
(
    id SERIAL NOT NULL PRIMARY KEY,
    drug1_eng character varying(255),
    drug1_kaz character varying(255),
    drug1_ru character varying(255),
    drug2_eng character varying(255),
    drug2_kaz character varying(255),
    drug2_ru character varying(255)
);

CREATE TABLE IF NOT EXISTS public.drug_drug_descriptions
(
    id SERIAL NOT NULL PRIMARY KEY,
    description_med_description_ru_body text,
    description_med_description_ru_ref text,
    description_consumer_description_ru text
);

CREATE TABLE IF NOT EXISTS public.drug_drug_interactions
(
    id SERIAL NOT NULL PRIMARY KEY,
    type character varying(255),
    general_value character varying(255),
    general_degree character varying(255),
    drug_drug_descriptions_id integer,
    drug_drug_names_id integer,
    CONSTRAINT fk_drug_drug_descriptions FOREIGN KEY (drug_drug_descriptions_id)
    REFERENCES public.drug_drug_descriptions (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID,
    CONSTRAINT fk_drug_drug_names FOREIGN KEY (drug_drug_names_id)
    REFERENCES public.drug_drug_names (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID
);

CREATE TABLE IF NOT EXISTS public.drug_food_interactions
(
    id SERIAL NOT NULL PRIMARY KEY,
    general_value character varying(255),
    general_degree character varying(255),
    type character varying(255),
    drug_food_names_id numeric,
    drug_food_descriptions_id numeric,
    CONSTRAINT drug_food_descriptions_id FOREIGN KEY (drug_food_descriptions_id)
    REFERENCES public.drug_food_descriptions (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID,
    CONSTRAINT fk_drug_food_names FOREIGN KEY (drug_food_names_id)
    REFERENCES public.drug_food_names (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID
);

CREATE TABLE IF NOT EXISTS public.catalogue
(
    id SERIAL NOT NULL PRIMARY KEY,
    general_id integer,
    pd_ru text,
    pk_ru text,
    indications text,
    side_effects_ru text,
    contraindications_ru text,
    pregnancy text,
    liver_disorders_ru text,
    kidneys_disorders_ru text,
    children_ru text,
    elders_ru text,
    notice text,
    CONSTRAINT fk_catalogue_general FOREIGN KEY (general_id)
    REFERENCES public.general (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID
);