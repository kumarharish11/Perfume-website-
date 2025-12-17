import { Product } from './types';

export const PERFUMES: Product[] = [
  {
    id: '1',
    name: 'Midnight Velvet',
    brand: 'Aura',
    price: 145,
    description: 'A mysterious and seductive blend of dark florals and warm spices, perfect for evening wear.',
    image: 'https://picsum.photos/400/500?random=1',
    notes: {
      top: ['Black Cherry', 'Saffron'],
      middle: ['Rose Absolute', 'Jasmine'],
      base: ['Oud', 'Amber', 'Vanilla'],
    },
    category: 'oriental',
    isNew: true
  },
  {
    id: '2',
    name: 'Oceanic Drift',
    brand: 'Essence',
    price: 95,
    description: 'Capturing the essence of a sea breeze, this scent is crisp, clean, and invigorating.',
    image: 'https://picsum.photos/400/500?random=2',
    notes: {
      top: ['Sea Salt', 'Bergamot'],
      middle: ['Sage', 'Driftwood'],
      base: ['White Musk', 'Seaweed'],
    },
    category: 'fresh'
  },
  {
    id: '3',
    name: 'Golden Bloom',
    brand: 'Lumière',
    price: 120,
    description: 'A radiant bouquet of sun-drenched white flowers with a touch of honeyed sweetness.',
    image: 'https://picsum.photos/400/500?random=3',
    notes: {
      top: ['Pear', 'Neroli'],
      middle: ['Orange Blossom', 'Tuberose'],
      base: ['Honey', 'Sandalwood'],
    },
    category: 'floral'
  },
  {
    id: '4',
    name: 'Cedar & Smoke',
    brand: 'Roots',
    price: 135,
    description: 'An intense and grounding woody fragrance reminiscent of an ancient forest after rain.',
    image: 'https://picsum.photos/400/500?random=4',
    notes: {
      top: ['Cardamom', 'Cypress'],
      middle: ['Cedarwood', 'Vetiver'],
      base: ['Leather', 'Tobacco', 'Patchouli'],
    },
    category: 'woody'
  },
  {
    id: '5',
    name: 'Citrus Grove',
    brand: 'Essence',
    price: 85,
    description: 'A vibrant explosion of zest that uplifts the spirit and awakens the senses.',
    image: 'https://picsum.photos/400/500?random=5',
    notes: {
      top: ['Lemon', 'Grapefruit', 'Mandarin'],
      middle: ['Basil', 'Mint'],
      base: ['Cedar', 'Musk'],
    },
    category: 'citrus'
  },
  {
    id: '6',
    name: 'Velvet Rose',
    brand: 'Aura',
    price: 155,
    description: 'A classic rose scent reimagined with a modern, velvety texture and dark fruit undertones.',
    image: 'https://picsum.photos/400/500?random=6',
    notes: {
      top: ['Raspberry', 'Peppercorn'],
      middle: ['Damask Rose', 'Peony'],
      base: ['Cashmere Wood', 'Musk'],
    },
    category: 'floral',
    isNew: true
  }
];

export const FILTERS = ['All', 'Floral', 'Woody', 'Oriental', 'Fresh', 'Citrus'];
