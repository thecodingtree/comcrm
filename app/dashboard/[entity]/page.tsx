'use client';

import { useParams } from 'next/navigation';

export default function EntityView() {
  const params = useParams();

  return (
    <div>
      <h1>{`Entity View: ${params?.entity}`}</h1>
    </div>
  );
}
