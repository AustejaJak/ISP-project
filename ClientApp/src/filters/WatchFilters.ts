import { t } from "i18next";

export const watchFilters = [
  {
    id: "price",
    name: "Price",
    options: [],
  },
  {
    id: "color",
    name: "Color",
    options: [
      { value: "gold", label: "Auksinė" },
      { value: "white", label: "Balta" },
      { value: "black", label: "Juoda" },
      { value: "grey", label: "Pilka" },
      { value: "silver", label: "Sidabrinė" },
    ],
  },
  {
    id: "face",
    name: "Ciferblatas",
    options: [
      { value: "digital", label: "Skaitmeninis" },
      { value: "analogue", label: "Analoginis" },
    ],
  },
  {
    id: "sizes",
    name: "Sizes",
    options: [
      { value: "xs", label: "XS" },
      { value: "s", label: "S" },
      { value: "m", label: "M" },
      { value: "l", label: "L" },
      { value: "xl", label: "XL" },
      { value: "2xl", label: "2XL" },
    ],
  },
];
