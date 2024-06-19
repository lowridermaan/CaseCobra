// хак с динамическим обновлением tailwind через комментарии)

// bg-blue-950 border-blue-950
// bg-zinc-900 border-zinc-900
// bg-rose-950 border-rose-950
// bg-yellow-600 border-yellow-600

export const COLORS = [
  {
    label: 'Black',
    value: 'black',
    tw: 'zinc-900', //tailwind color
  },
  {
    label: 'Blue',
    value: 'blue',
    tw: 'blue-950',
  },
  {
    label: 'Rose',
    value: 'rose',
    tw: 'rose-950',
  },
  {
    label: 'Yellow',
    value: 'yellow',
    tw: 'yellow-600',
  },
] as const;
