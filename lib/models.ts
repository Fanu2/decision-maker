export type Option = { id: string; name: string };
export type Factor = { id: string; name: string; weight: number };

export type Scores = {
  [optionId: string]: { [factorId: string]: number };
};

export type Decision = {
  id: string;
  title: string;
  description?: string;
  createdAt: number;
  options: Option[];
  factors: Factor[];
  scores: Scores;
  finalChoice?: string;
  reflection?: string;
};

