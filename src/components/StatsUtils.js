export const resetAllCardStats = (subjectId) => {
  const keys = Object.keys(localStorage);

  const prefix = subjectId ? `card-stats-${subjectId}-` : "card-stats-";
  const cardStatsKeys = keys.filter((key) => key.startsWith(prefix));

  cardStatsKeys.forEach((key) => {
    localStorage.setItem(
      key,
      JSON.stringify({ remembered: 0, notRemembered: 0 })
    );
  });

  return cardStatsKeys.length;
};

export const getCardsWithStats = (subjectId) => {
  const keys = Object.keys(localStorage);
  const prefix = subjectId ? `card-stats-${subjectId}-` : "card-stats-";
  const cardStatsKeys = keys.filter((key) => key.startsWith(prefix));

  return cardStatsKeys.map((key) => {
    const cardId = key.replace(prefix, "");
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

export const getRememberedCards = (allCards, subjectId) => {
  const cardsWithStats = getCardsWithStats(subjectId);

  const rememberedCardIds = cardsWithStats
    .filter((card) => card.isRemembered)
    .map((card) => parseInt(card.id));

  return allCards.filter((card) => rememberedCardIds.includes(card.id));
};
