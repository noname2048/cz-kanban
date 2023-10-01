type Props = {
  title: string;
  rate: number;
  onChange?: () => void;
  onDelete?: () => void;
};

export default function Card({ title, rate }: Props) {
  return (
    <div>
      <div>{title}</div>
      <div>{rate}</div>
    </div>
  );
}
