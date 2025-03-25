import { Rule } from 'sanity';

export default {
    name: 'product',
    type: 'document',
    title: 'Product',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Product Name',
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: 'price',
            type: 'number',
            title: 'Price',
            validation: (Rule: Rule) => Rule.min(1000).error('Price must be at least 1000'),
        },
        {
            name: 'image',
            type: 'image',
            title: 'Product Image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'description',
            type: 'text', 
            title: 'Description',
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name:'roomtype',
            type:'string',
            title:'roomType',
            validation: (Rule: Rule) => Rule.required(),
        }
    ]
};
