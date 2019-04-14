export const flipCard = (index, mark) => ({
  type: FLIP_CARD,
  index,
  mark
});

export const resetCards = () => ({
  type: RESET_CARDS,
  cards: [
    { isFlipped: false, mark: '' },
    { isFlipped: false, mark: '' },
    { isFlipped: false, mark: '' },
    { isFlipped: false, mark: '' },
    { isFlipped: false, mark: '' },
    { isFlipped: false, mark: '' },
    { isFlipped: false, mark: '' },
    { isFlipped: false, mark: '' },
    { isFlipped: false, mark: '' }
  ]
});

export const RESET_CARDS = 'RESET_CARDS';
export const FLIP_CARD = 'FLIP_CARD';
