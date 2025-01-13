/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { Table } from '../../models/Table';

export async function createTable(req: Request, res: Response){

    try {
        const numberOfTables = await Table.find().countDocuments();
        const table = await Table.create({
            name: numberOfTables + 1
        });
        res.status(201).json(table);

    } catch (error){
        console.error(error);
        res.sendStatus(500);
    }


}

