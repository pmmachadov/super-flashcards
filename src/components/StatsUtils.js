export const resetAllCardStats = () => {
  const keys = Object.keys(localStorage);

  const cardStatsKeys = keys.filter((key) => key.startsWith("card-stats-"));

  cardStatsKeys.forEach((key) => {
    localStorage.setItem(
      key,
      JSON.stringify({ remembered: 0, notRemembered: 0 })
    );
  });

  return cardStatsKeys.length;
};

export const getCardsWithStats = () => {
  const keys = Object.keys(localStorage);
  const cardStatsKeys = keys.filter((key) => key.startsWith("card-stats-"));

  return cardStatsKeys.map((key) => {
    const cardId = key.replace("card-stats-", "");
    const stats = JSON.parse(localStorage.getItem(key)) || {
      remembered: 0,
      notRemembered: 0,
    };
    return {
      id: cardId,
      ...stats,
      total: stats.remembered + stats.notRemembered,
      isRemembered:
        stats.remembered > stats.notRemembered && stats.remembered > 0,
    };
  });
};

export const getRememberedCards = (allCards) => {
  const cardsWithStats = getCardsWithStats();

  const rememberedCardIds = cardsWithStats
    .filter((card) => card.isRemembered)
    .map((card) => parseInt(card.id));

  return allCards.filter((card) => rememberedCardIds.includes(card.id));
};
