/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { Order } from '../../models/Order';
import { io } from '../../..';

export async function createOrder(req: Request, res: Response){

    try {
        const { table, products } = req.body;
        const order = await Order.create({
            table,
            products
        });
        const createOrder = await order.populate('products.product')  ;
        io.emit('order@new', createOrder)
        io.emit('message', 'Novo pedido criado na mesa ' + table);
        res.status(201).json(order);

    } catch (error){
        console.error(error);
        res.sendStatus(500);
    }


}

