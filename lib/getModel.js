"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RestRegistry_1 = require("./RestRegistry");
/**
 * Get or builds the model for a specific connection
 * @param connection
 * @param model
 */
function getModel(connection, model) {
    const modelEntry = RestRegistry_1.RestRegistry.getModel(model);
    const schemaOptions = modelEntry && modelEntry.config ? modelEntry.config.schemaOptions : undefined;
    if (!connection.models[model.name]) {
        // get schema of current model
        let schema = model.prototype.buildSchema(model, model.name, schemaOptions);
        // get parents class name
        let parentCtor = Object.getPrototypeOf(model);
        // iterate trough all parents
        while (parentCtor && parentCtor.name !== 'Typegoose' && parentCtor.name !== 'Object') {
            // extend schema
            schema = model.prototype.buildSchema(parentCtor, parentCtor.name, schemaOptions, schema);
            // next parent
            parentCtor = Object.getPrototypeOf(parentCtor);
        }
        const newModel = connection.model(model.name, schema);
        newModel.init();
        newModel.ensureIndexes();
        return newModel;
    }
    return connection.models[model.name];
}
exports.getModel = getModel;
//# sourceMappingURL=getModel.js.map