// pages/api/products.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getAllProductsPag } from '@/lib/actions/product.action';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { page = '1' } = req.query;
    const result = await getAllProductsPag({ query: '', limit: 8, page: parseInt(page as string) });
    res.status(200).json(result);
}
