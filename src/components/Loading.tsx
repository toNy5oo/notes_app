export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center"> 
        <h2 className="animate-spin text-2xl">🌀</h2>
        <h2>Please have patience while the (free) server instance spins up...</h2>
      </div>
    </div>
  );
}
