export const toScenarioSlug = (value: string) => value.trim().toLowerCase().replace(/\s+/g, '-');

export const normalizeScenarioSlug = (value: string) => {
  try {
    return toScenarioSlug(decodeURIComponent(value));
  } catch {
    return toScenarioSlug(value);
  }
};
