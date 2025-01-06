

export function validateRequestFields(props: object, errors: ValidationErrorResponse): ValidationErrorResponse {
    for (const [key, value] of Object.entries(props)) {
        if (!value) {
            if (errors[key] === undefined) {
                errors[key] = [];
            }
            errors[key].push(`${key} is required`);
        }
    }
    return errors;
}

export type ValidationErrorResponse = {
    [key: string]: string[];
}

