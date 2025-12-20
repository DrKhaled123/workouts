
export type Language = 'en' | 'ar' | 'both';

export interface BilingualText {
  en: string;
  ar: string;
}

export interface Exercise {
  name: BilingualText;
  sets: number;
  reps: string;
  rest: number;
  desc: BilingualText;
  warmup: BilingualText;
}

export interface WorkoutGoal {
  id: string;
  title: BilingualText;
  desc: BilingualText;
  plan: BilingualText;
  exercises: Partial<Exercise>[];
}

export interface DayPlan {
  day: BilingualText;
  exercises: Exercise[];
}

export interface NutritionSection {
  title: BilingualText;
  items: BilingualText[];
}

export interface FastingSection {
  title: BilingualText;
  content: BilingualText;
  guidelines: BilingualText[];
  references: BilingualText[];
}
