var Validations = {
    notEquals: function (values, value, neq) {
        return value !== neq;
    },
    notEqualsField: function (values, value, field) {
        return value !== values[field];
    }
};

module.exports = Validations;
