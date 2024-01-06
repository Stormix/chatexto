import LoadingIndicator from '@/components/atoms/loading';

export default function Loading() {
  return (
    <div className="grid p-4 place-items-center animate-pulse text-neutral-300">
      <div role="status">
        <LoadingIndicator />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
