export const VALID_QUERY = `
  {
    appCollection(where: {id: "Negative Harmony"}) {
      items {
        sys {
          publishedAt
        }
      }
    }
    negativeHarmonyCollection(limit: 1, order: sys_publishedAt_DESC) {
      items {
        sys {
          publishedAt
        }
      }
    }
  }
`;

export const MASTER_QUERY = `
  {
    appCollection(where: {id: "Negative Harmony"}) {
      items {
        adIds
        ads
        adsStaging
        resetRewards
        resetRewardsStaging
        keepRewards
        keepRewardsStaging
      }
    }
    negativeHarmonyCollection {
      items {
        destination
        type
        list
      }
    }
  }
`;
