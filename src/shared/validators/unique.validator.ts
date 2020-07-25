import {registerDecorator, ValidationArguments, ValidationOptions} from 'class-validator';
import {getRepository} from "typeorm";

interface UniqueMongoOptions {
    model: string;
    field: string;
}

export function Unique(options: UniqueMongoOptions, validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            name: 'unique',
            target: object.constructor,
            propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                async validate(value: any) {
                    const model = getRepository(options.model);
                    const unique = !await model.findOne({where: {[options.field]: value}});
                    return unique;
                },

                defaultMessage(validationArguments?: ValidationArguments): string {
                    return `${validationArguments.property} must be unique`;
                },
            },
        });
    };
}
