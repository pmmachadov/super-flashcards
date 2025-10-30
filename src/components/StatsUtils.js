// Estadísticas avanzadas para DAW
export const getSubjectProgress = (subjectId, totalCards = null) => {
  const keys = Object.keys(localStorage);
  const prefix = `card-stats-${subjectId}-`;
  const cardStatsKeys = keys.filter((key) => key.startsWith(prefix));

  // Usar el total real de tarjetas si se proporciona, sino usar las que tienen stats
  const actualTotal = totalCards !== null ? totalCards : cardStatsKeys.length;

  const stats = {
    total: actualTotal,
    remembered: 0,
    learning: 0,
    notStarted: actualTotal, // Inicialmente todas sin empezar
    totalAttempts: 0,
    successRate: 0,
  };

  cardStatsKeys.forEach((key) => {
    const cardStats = JSON.parse(localStorage.getItem(key)) || {
      remembered: 0,
      notRemembered: 0,
    };

    const total = cardStats.remembered + cardStats.notRemembered;
    stats.totalAttempts += total;

    if (total === 0) {
      // Ya está en notStarted
    } else if (
      cardStats.remembered > cardStats.notRemembered &&
      cardStats.remembered > 0
    ) {
      stats.remembered++;
      stats.notStarted--; // Restar de las no empezadas
    } else {
      stats.learning++;
      stats.notStarted--; // Restar de las no empezadas
    }
  });

  if (stats.totalAttempts > 0) {
    stats.successRate = Math.round(
      (stats.remembered / stats.totalAttempts) * 100
    );
  }

  stats.progressPercentage =
    stats.total > 0 ? Math.round((stats.remembered / stats.total) * 100) : 0;

  return stats;
};

export const getAllSubjectsProgress = (subjects) => {
  return subjects.map((subject) => ({
    ...subject,
    progress: getSubjectProgress(subject.id),
  }));
};

// Sistema de PACs (Pruebas de Evaluación Continua)
export const savePACResult = (subjectId, pacNumber, score, totalQuestions) => {
  const pacKey = `pac-${subjectId}-${pacNumber}`;
  const pacData = {
    date: new Date().toISOString(),
    score,
    totalQuestions,
    percentage: Math.round((score / totalQuestions) * 100),
  };
  localStorage.setItem(pacKey, JSON.stringify(pacData));

  // Guardar en historial
  const historyKey = `pac-history-${subjectId}`;
  const history = JSON.parse(localStorage.getItem(historyKey) || "[]");
  history.push({ ...pacData, pacNumber });
  localStorage.setItem(historyKey, JSON.stringify(history));
};

export const getPACHistory = (subjectId) => {
  const historyKey = `pac-history-${subjectId}`;
  return JSON.parse(localStorage.getItem(historyKey) || "[]");
};

export const getPACResult = (subjectId, pacNumber) => {
  const pacKey = `pac-${subjectId}-${pacNumber}`;
  return JSON.parse(localStorage.getItem(pacKey) || "null");
};

// Estadísticas de estudio por tiempo
export const saveStudySession = (subjectId, duration, cardsReviewed) => {
  const sessionKey = `study-sessions-${subjectId}`;
  const sessions = JSON.parse(localStorage.getItem(sessionKey) || "[]");

  sessions.push({
    date: new Date().toISOString(),
    duration, // en minutos
    cardsReviewed,
  });

  localStorage.setItem(sessionKey, JSON.stringify(sessions));
};

export const getStudyStats = (subjectId) => {
  const sessionKey = `study-sessions-${subjectId}`;
  const sessions = JSON.parse(localStorage.getItem(sessionKey) || "[]");

  const totalTime = sessions.reduce((acc, s) => acc + s.duration, 0);
  const totalCards = sessions.reduce((acc, s) => acc + s.cardsReviewed, 0);

  return {
    totalSessions: sessions.length,
    totalTime,
    totalCards,
    averageSessionTime:
      sessions.length > 0 ? Math.round(totalTime / sessions.length) : 0,
    recentSessions: sessions.slice(-5).reverse(),
  };
};

// Tags por Unidad Formativa
export const getCardsByTag = (cards, tag) => {
  return cards.filter((card) => card.tags && card.tags.includes(tag));
};

export const getAllTags = (cards) => {
  const tagsSet = new Set();
  cards.forEach((card) => {
    if (card.tags) {
      card.tags.forEach((tag) => tagsSet.add(tag));
    }
  });
  return Array.from(tagsSet).sort();
};

export const getTagStats = (cards, subjectId) => {
  const tags = getAllTags(cards);

  return tags.map((tag) => {
    const tagCards = getCardsByTag(cards, tag);
    const tagProgress = tagCards.map((card) => {
      const storageKey = `card-stats-${subjectId}-${card.id}`;
      const stats = JSON.parse(localStorage.getItem(storageKey)) || {
        remembered: 0,
        notRemembered: 0,
      };
      return {
        ...card,
        isRemembered:
          stats.remembered > stats.notRemembered && stats.remembered > 0,
      };
    });

    const remembered = tagProgress.filter((c) => c.isRemembered).length;

    return {
      tag,
      total: tagCards.length,
      remembered,
      percentage: Math.round((remembered / tagCards.length) * 100),
    };
  });
};

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
