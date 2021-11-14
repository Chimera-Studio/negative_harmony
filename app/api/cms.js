export const MASTER_QUERY = `
  {
    appCollection(where: {id: "Negative Harmony"}) {
      items {
        ads
        adsStaging
        resetRewards
        resetRewardsStaging
        keepRewards
        keepRewardsStaging
      }
    }
  }
`;

export const SCALES_QUERY = `
  {
    negativeHarmonyCollection(where: {type: "Scale"}) {
      items {
        destination
        id
        pattern
      }
    }
  }
`;

export const CHORDS_QUERY = `
  {
    negativeHarmonyCollection(where: {type: "Chord"}) {
      items {
        destination
        id
        pattern
      }
    }
  }
`;
