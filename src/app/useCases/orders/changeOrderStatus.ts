/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { Order } from '../../models/Order';

export async function changeOrderStatus(req: Request, res: Response){
    const possibleStatus = ['WAITING', 'IN_PRODUCTION', 'DONE'];
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        if(!possibleStatus.includes(status)){
            res.status(400).json({ error: `Invalid status. Valid status: ${possibleStatus}` });
        }
        await Order.updateOne({ _id: orderId }, { status });
        res.sendStatus(204)

    } catch (error){
        console.error(error);
        res.sendStatus(500);
    }


}

