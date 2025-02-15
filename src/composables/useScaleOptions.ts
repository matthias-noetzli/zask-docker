const options = [
  {
    value: 0,
    label: "0",
    description: "vergleichbar mit den Erwartungen an gleichaltrige Kinder",
  },
  {
    value: 1,
    label: "1",
    description: "geringe Unterschiede",
  },
  { value: 2, label: "2", description: "deutlich sichtbare Unterschiede" },
  {
    value: 3,
    label: "3",
    description: "ausgeprägte Unterschiede",
  },
  {
    value: 4,
    label: "N",
    description: "eindeutig und regelmässig beobachtbar",
  },
];

export const useScaleOptions = () => {
  return { options };
};
