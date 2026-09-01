export function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="eyebrow mb-2 block !text-[9px] !text-[#999a93]">{label}</span>
      <input {...props} className="focus-ring h-12 w-full border-b border-[#d8ad56]/30 bg-transparent px-0 text-[#f0ece0] outline-none transition placeholder:text-[#606663] focus:border-[#d8ad56]" />
    </label>
  );
}