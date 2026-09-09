import type {
  Answer,
  Question,
  Scenario,
  SimulatedCall,
  SimulatedCallQuestion,
} from '@/domain/models';

import { SimulationEvaluator } from './SimulationEvaluator';
import type { SimulationState } from './SimulationState';
import { SimulatedCallEngine } from './SimulatedCallEngine';

export class SimulationEngine {
  private state: SimulationState | null = null;

  private questions: Question[] = [];
  private answers: Answer[] = [];

  private readonly evaluator: SimulationEvaluator;
  private readonly simulatedCallEngine: SimulatedCallEngine;

  constructor() {
    this.evaluator = new SimulationEvaluator();
    this.simulatedCallEngine = new SimulatedCallEngine();
  }

  start(
    scenario: Scenario,
    questions: Question[],
    answers: Answer[]
  ): void {
    this.questions = questions;
    this.answers = answers;

    const maxScore =
      this.evaluator.calculateMaxScore(
        questions,
        answers
      );

    this.state = {
      scenario,
      currentQuestionIndex: 0,
      score: 0,
      maxScore,
      correctAnswers: 0,
      incorrectAnswers: 0,
      criticalErrors: 0,
      elapsedTime: 0,
      completed: questions.length === 0,
      emergencyCallRequired:
        scenario.requiresEmergencyCall,
      emergencyCallCompleted: false,
      selectedAnswers: [],
      timedOut: false,
    };
  }

  getState(): SimulationState | null {
    return this.state;
  }

  getTotalQuestions(): number {
    return this.questions.length;
  }

  getCurrentQuestion(): Question | null {
    if (!this.state || this.state.completed) {
      return null;
    }

    return (
      this.questions[
        this.state.currentQuestionIndex
      ] ?? null
    );
  }

  getCurrentAnswers(): Answer[] {
    const question =
      this.getCurrentQuestion();

    if (!question) {
      return [];
    }

    return this.answers.filter(
      (answer) =>
        answer.questionId === question.id
    );
  }

  answer(answerId: number): SimulationState {
    if (!this.state) {
      throw new Error(
        'La simulación no ha sido iniciada.'
      );
    }

    if (this.state.completed) {
      throw new Error(
        'La simulación ya ha terminado.'
      );
    }

    const question =
      this.getCurrentQuestion();

    if (!question) {
      throw new Error(
        'No existe una pregunta activa.'
      );
    }

    const answer =
      this.answers.find(
        (item) =>
          item.id === answerId &&
          item.questionId === question.id
      );

    if (!answer) {
      throw new Error(
        'La respuesta seleccionada no es válida.'
      );
    }

    const updatedState =
      this.evaluator.evaluateAnswer(
        answer,
        this.state
      );

    const nextQuestionIndex =
      updatedState.currentQuestionIndex + 1;

    const reachedEnd =
      nextQuestionIndex >=
      this.questions.length;

    const callPending =
      this.state.emergencyCallRequired &&
      !this.state.emergencyCallCompleted;

    const completed =
      updatedState.criticalErrors > 0 ||
      (reachedEnd && !callPending);

    this.state = {
      ...updatedState,
      currentQuestionIndex:
        updatedState.criticalErrors > 0
          ? updatedState.currentQuestionIndex
          : nextQuestionIndex,
      completed,
      timedOut: false,
    };

    return this.state;
  }

  expireCurrentQuestion(): SimulationState {
    if (!this.state) {
      throw new Error(
        'La simulación no ha sido iniciada.'
      );
    }

    if (this.state.completed) {
      return this.state;
    }

    const nextQuestionIndex =
      this.state.currentQuestionIndex + 1;

    const reachedEnd =
      nextQuestionIndex >=
      this.questions.length;

    const callPending =
      this.state.emergencyCallRequired &&
      !this.state.emergencyCallCompleted;

    const completed =
      reachedEnd && !callPending;

    this.state = {
      ...this.state,
      currentQuestionIndex:
        nextQuestionIndex,
      incorrectAnswers:
        this.state.incorrectAnswers + 1,
      timedOut: true,
      completed,
    };

    return this.state;
  }

  updateElapsedTime(
    seconds: number
  ): SimulationState {
    if (!this.state) {
      throw new Error(
        'La simulación no ha sido iniciada.'
      );
    }

    this.state = {
      ...this.state,
      elapsedTime:
        this.state.elapsedTime + seconds,
    };

    return this.state;
  }

  startSimulatedCall(
    call: SimulatedCall,
    questions: SimulatedCallQuestion[] = []
  ): void {
    this.simulatedCallEngine.start(
      call,
      questions
    );
  }

  getSimulatedCallEngine(): SimulatedCallEngine {
    return this.simulatedCallEngine;
  }

  completeEmergencyCall(): void {
    if (!this.state) {
      throw new Error(
        'La simulación no ha sido iniciada.'
      );
    }

    this.state = {
      ...this.state,
      emergencyCallCompleted: true,
      completed: true,
    };
  }

  canFinish(): boolean {
    if (!this.state) {
      return false;
    }

    if (
      this.state.emergencyCallRequired &&
      !this.state.emergencyCallCompleted
    ) {
      return false;
    }

    return this.state.completed;
  }

  getResult() {
    if (!this.state) {
      throw new Error(
        'La simulación no ha sido iniciada.'
      );
    }

    const callState =
      this.simulatedCallEngine.getState();

    const callScore =
      callState?.score ?? 0;

    const callMaxScore =
      callState?.maxScore ?? 0;

    const callCorrectAnswers =
      callState?.correctAnswers ?? 0;

    const callIncorrectAnswers =
      callState?.incorrectAnswers ?? 0;

    return {
      ...this.state,
      score:
        this.state.score +
        callScore,
      maxScore:
        this.state.maxScore +
        callMaxScore,
      correctAnswers:
        this.state.correctAnswers +
        callCorrectAnswers,
      incorrectAnswers:
        this.state.incorrectAnswers +
        callIncorrectAnswers,
    };
  }
}