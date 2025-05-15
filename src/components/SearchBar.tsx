import Input from "../components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <Input
      type="text"
      placeholder="Search by title or author..."
      className="w-full"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
