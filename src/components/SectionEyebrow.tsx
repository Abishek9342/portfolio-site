type Props = {
  num: string;
  label: string;
};

export function SectionEyebrow({ num, label }: Props) {
  return (
    <span className="eyebrow">
      <span className="eyebrow-num">{num}</span>
      {label}
      <span className="eyebrow-rule" aria-hidden="true" />
    </span>
  );
}
