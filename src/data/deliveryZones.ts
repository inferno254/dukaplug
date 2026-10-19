export type DeliveryLocation = { name: string; detail: string };

export const deliveryAreas: DeliveryLocation[] = [
  { name: "Home · Rongai", detail: "Maasai Lodge Road, Ongata Rongai" },
  { name: "Multimedia University", detail: "Magadi Road, Nairobi" },
  { name: "Karen", detail: "Karen Shopping Centre, Nairobi" },
  { name: "Lang'ata", detail: "Lang'ata Road, Nairobi" },
  { name: "Kiserian", detail: "Kiserian Town, Kajiado" },
  { name: "Kitengela", detail: "Namanga Road, Kitengela" },
];

export const DELIVERY_ZONES = deliveryAreas.map((zone, index) => ({
  id: String(index + 1),
  name: zone.name,
  deliveryFee: 0,
}));