const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');

// db.sync({force: true})

const q1 = db.query("CREATE FUNCTION public.tr_fc_animalproducts_insert() RETURNS trigger LANGUAGE \'plpgsql\' COST 100 VOLATILE NOT LEAKPROOF AS $BODY$ DECLARE	v_unit varchar(50); BEGIN " +
    " IF(NEW.\"quantity\" < 1) THEN RAISE EXCEPTION \'Quantity cannot be lower than 1\'; END IF; SELECT \"unit\" INTO v_unit FROM public.\"Products\" WHERE \"Products\".\"id\" = NEW.\"ProductId\"; " +

    " IF(v_unit = \'KG\' AND NEW.\"weight\" < 1) THEN RAISE EXCEPTION \'Products in KG must have weight\'; END IF; NEW.\"quantityAvailable\" = NEW.\"quantity\"; RETURN NEW; END; $BODY$; " +

    " ALTER FUNCTION public.tr_fc_animalproducts_insert() OWNER TO postgres; ")

const q2 = db.query("CREATE TRIGGER \"tr_animalProducts_insert\"BEFORE INSERT ON public.\"AnimalProducts\" FOR EACH ROW " +
    " EXECUTE FUNCTION public.tr_fc_animalproducts_insert();")

console.log('resultado', q1, q2)

const User = db.define('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "name field is required",
            }
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
        validate: {
            isEmail: {
                msg: 'Please enter an email'
            },
            notEmpty: {
                msg: "email field is required",
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "password field is required",
            }
        },

    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "active field is required",
            }
        },
    },
    permission: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "permission field is required",
            }
        },
        defaultValue: ['ADMIN'],
    },

    address: {
        type: DataTypes.STRING,
    },
    locale: {
        type: DataTypes.STRING,
    },
    zipcode: {
        type: DataTypes.STRING,
    },
    fiscalNumber: {
        type: DataTypes.INTEGER,
        unique: true
    },
    telephone: {
        type: DataTypes.INTEGER,
        unique: true
    },
    mobilePhone: {
        type: DataTypes.INTEGER,
        unique: true
    },
},
)

module.exports = User