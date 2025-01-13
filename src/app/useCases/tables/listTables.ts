import {Request, Response} from 'express';
import { Table } from '../../models/Table';

export async function listTable(req: Request, res: Response) {
    try {
        const products = await Table.find();
        res.json(products);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}