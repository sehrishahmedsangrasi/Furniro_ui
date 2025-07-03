// /schemas/order.ts

export default {
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    {
      name: "userId",
      title: "User ID",
      type: "string",
    },
    {
      name: "cart",
      title: "Cart Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Product Name" },
            { name: "price", type: "number", title: "Price" },
            { name: "quantity", type: "number", title: "Quantity" },
           
           
          ],
        },
      ],
    },
    {
      name: "total",
      title: "Total Amount",
      type: "number",
    },
     {name: "deliveryDate",title: "Delivery Date",type: "datetime",},
    {
      name: "paymentIntent",
      title: "Stripe Payment Intent",
      type: "string",
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
    },
  ],
};
