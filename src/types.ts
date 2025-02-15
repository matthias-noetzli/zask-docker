import type { Component } from "vue";

export interface Area<T extends Question> {
  title: string;
  questions: Array<T>;
  slug: string;
  type: T["type"];
  component: Component;
}

export interface BaseQuestion {
  id?: number;
  text: string;
  value: string;
}

export interface ScaleQuestion extends BaseQuestion {
  type: "scale";
  comment: string;
}

export interface RadioQuestion extends BaseQuestion {
  type: "radio";
  options: Array<{
    label: string;
    value: string;
  }>;
}

export type Question = ScaleQuestion | RadioQuestion;
