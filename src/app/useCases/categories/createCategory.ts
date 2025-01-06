import { Request, Response } from 'express';
import { Category } from '../../models/Category';
import { validateRequestFields, ValidationErrorResponse } from '../utils/validateRequestFields';

export async function createCategory(req: Request, res: Response){

    try {
        const { icon, name } = req.body;
        const props: { icon: string, name: string} = { icon, name };

        let errors: ValidationErrorResponse = {}
        errors = validateRequestFields(props, errors);

        if(Object.keys(errors).length > 0){
            res.status(400).json(errors);
            return
        }

        const category = await Category.create(props)
        res.status(201).json(category)
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    }
}


