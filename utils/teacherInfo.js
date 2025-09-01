export const sortSkillLevels = (data = []) => {
  if (!data) return [];

  const levels = {
    beginner: !!data?.includes('beginner'),
    intermediate: !!data?.includes('intermediate'),
    advanced: !!data?.includes('advanced'),
    professional: !!data?.includes('professional'),
    kids: !!data?.includes('kids'),
  };

  return Object.keys(levels).filter((item) => levels[item]);
};
