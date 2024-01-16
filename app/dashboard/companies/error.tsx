'use client';

export default function Error({ error }: { error: any }) {
  return (
    <div>
      <span className="text-red-500">{'Error!'}</span>
      <span className="text-red-500">{error}</span>
    </div>
  );
}
