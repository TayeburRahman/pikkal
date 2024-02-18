
export default function ClientProfileLink({ clientName }) {
  return (
    <div className="px-4 py-2 mx-auto max-w-full text-left leading-6 overflow-hidden mb-4 border-b-[1px] border-slate-300 hover:bg-slate-50">
      <div  className="text-lg text-blue-600 hover:underline">
        {clientName}
      </div>
    </div>
  );
}
