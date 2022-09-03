export const VALID_PRODUCTION_QUERY = `
  {
    appCollection(where: {id: "Negative Harmony"}) {
      items {
        sys {
          publishedAt
        }
      }
    }
    announcementCollection(where: {id: "Negative Harmony"}) {
      items {
        sys {
          publishedAt
        }
      }
    }
    negativeHarmonyCollection(limit: 1, order: sys_publishedAt_DESC, where: {destination: true}) {
      items {
        sys {
          publishedAt
        }
      }
    }
  }
`;

export const VALID_STAGING_QUERY = `
  {
    appCollection(where: {id: "Negative Harmony"}) {
      items {
        sys {
          publishedAt
        }
      }
    }
    announcementCollection(where: {id: "Negative Harmony - Staging"}) {
      items {
        sys {
          publishedAt
        }
      }
    }
    negativeHarmonyCollection(limit: 1, order: sys_publishedAt_DESC, where: {destination: false}) {
      items {
        sys {
          publishedAt
        }
      }
    }
  }
`;

export const PRODUCTION_QUERY = `
  {
    appCollection(where: {id: "Negative Harmony"}) {
      items {
        adIds
        ads
        resetRewards
        keepRewards
      }
    }
    announcementCollection(where: {id: "Negative Harmony"}) {
      items {
        content {
          json
        }
      }
    }
    negativeHarmonyCollection(where: {destination: true}) {
      items {
        type
        list
      }
    }
  }
`;

export const STAGING_QUERY = `
  {
    appCollection(where: {id: "Negative Harmony"}) {
      items {
        adIds
        adsStaging
        resetRewardsStaging
        keepRewardsStaging
      }
    }
    announcementCollection(where: {id: "Negative Harmony - Staging"}) {
      items {
        content {
          json
        }
      }
    }
    negativeHarmonyCollection(where: {destination: false}) {
      items {
        type
        list
      }
    }
  }
`;
