interface ProductOptions {
  value: string;
  label: string;
}

export const productOptions: ProductOptions[] = [
  { value: "new", label: "New" },
  { value: "used", label: "Used" },
  { value: "broken", label: "Broken" },
  { value: "repaired", label: "Repaired" },
];
