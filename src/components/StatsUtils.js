// Utility for handling flashcard statistics
export const resetAllCardStats = () => {
  // Get all localStorage keys
  const keys = Object.keys(localStorage);

  // Filter keys that match our card-stats pattern
  const cardStatsKeys = keys.filter((key) => key.startsWith("card-stats-"));

  // Reset each card's stats
  cardStatsKeys.forEach((key) => {
    localStorage.setItem(
      key,
      JSON.stringify({ remembered: 0, notRemembered: 0 })
    );
  });

  return cardStatsKeys.length; // Return number of cards reset
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
    };
  });
};
