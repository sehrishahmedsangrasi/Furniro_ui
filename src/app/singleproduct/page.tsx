import SingleProduct from '@/components/singleproduct';
import { Suspense } from 'react';

export default function Page() {
    return (
        <Suspense fallback={<div>Loading product details...</div>}>
          <SingleProduct />
        </Suspense>
      );
}
