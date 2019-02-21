import { Connection, Model, connection as defaultConnection } from 'mongoose';
import { RestRegistry } from './rest-registry';
import { Constructor, InstanceType } from './types';
import { RestgooseModel } from './restgoose-model';

/**
 * Get or builds the model for a specific connection
 * @param connection
 * @param model
 */
export function getModel<T extends RestgooseModel>(model: Constructor<T>, connection?: Connection): Model<InstanceType<T>> {
    if (!connection) {
        connection = defaultConnection;
    }
    const modelEntry = RestRegistry.getModel(model);
    const schemaOptions = modelEntry && modelEntry.config ? modelEntry.config.schemaOptions : undefined;

    if (!connection.models[model.name]) {
        // get schema of current model
        let schema = model.prototype.buildSchema(schemaOptions);
        // get parents class name
        let parentCtor = Object.getPrototypeOf(model);
        // iterate through all parents
        while (parentCtor && parentCtor.name !== 'RestgooseModel' && parentCtor.name !== 'Object') {
            // extend schema
            schema = parentCtor.prototype.buildSchema(schemaOptions, schema);
            // next parent
            parentCtor = Object.getPrototypeOf(parentCtor);
        }
        const newModel: Model<InstanceType<T>> = connection.model(model.name, schema);
        newModel.init();
        newModel.ensureIndexes();
        return newModel;
    }

    return connection.models[model.name];
}
