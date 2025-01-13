import { model, Schema } from 'mongoose';
import { Table } from './Table';

export const Order = model('Order', new Schema({
    table: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Table'
    },
    status: {
        type: String,
        enum: ['WAITING', 'IN_PRODUCTION', 'DONE'],
        default: 'WAITING',
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    products: {
        required: true,
        type: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product'
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1
                }
            }
        ]
    }
}));

