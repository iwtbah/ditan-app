import { useState } from "react";
import { DITAN_INITIAL_CARDS } from "../mocks";

export function useDitanCardStack() {
  const [cards, setCards] = useState(DITAN_INITIAL_CARDS);

  const resetCards = () => {
    setCards(DITAN_INITIAL_CARDS);
  };

  const removeCard = (id: number) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const consumeTopCard = () => {
    setCards((prev) => prev.slice(1));
  };

  return {
    cards,
    consumeTopCard,
    removeCard,
    resetCards,
  };
}
