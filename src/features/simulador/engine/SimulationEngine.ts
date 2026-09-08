import type { Answer, Question, Scenario } from '@/domain/models';
import { SimulationEvaluator } from './SimulationEvaluator';
import type { SimulationState } from './SimulationState';

export class SimulationEngine {
  private readonly evaluator: SimulationEvaluator;

  private questions: Question[] = [];
  private answers: Answer[] = [];

  private state: SimulationState | null = null;

  constructor() {
    this.evaluator = new SimulationEvaluator();
  }

  start(
    scenario: Scenario,
    questions: Question[],
    answers: Answer[]
  ): SimulationState {
    this.questions = questions;
    this.answers = answers;

    const maxScore = this.evaluator.calculateMaxScore(
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
      completed: false,
      emergencyCallRequired: scenario.requiresEmergencyCall,
      emergencyCallCompleted: false,
      selectedAnswers: [],
    };

    return this.state;
  }

  getState(): SimulationState | null {
    return this.state;
  }

  getCurrentQuestion(): Question | null {
    if (!this.state) {
      return null;
    }

    return this.questions[this.state.currentQuestionIndex] ?? null;
  }

  getCurrentAnswers(): Answer[] {
    const question = this.getCurrentQuestion();

    if (!question) {
      return [];
    }

    return this.answers.filter(
      answer => answer.questionId === question.id
    );
  }

  answer(answerId: number): SimulationState {
    if (!this.state) {
      throw new Error('La simulación no ha sido iniciada.');
    }

    if (this.state.completed) {
      throw new Error('La simulación ya ha terminado.');
    }

    const answer = this.answers.find(
      item => item.id === answerId
    );

    if (!answer) {
      throw new Error('La respuesta seleccionada no existe.');
    }

    this.state = this.evaluator.evaluateAnswer(
      answer,
      this.state
    );

    if (answer.criticalError) {
      this.state = {
        ...this.state,
        completed: true,
      };

      return this.state;
    }

    const nextQuestionIndex =
      this.state.currentQuestionIndex + 1;

    if (nextQuestionIndex >= this.questions.length) {
      this.state = {
        ...this.state,
        completed: true,
      };

      return this.state;
    }

    this.state = {
      ...this.state,
      currentQuestionIndex: nextQuestionIndex,
    };

    return this.state;
  }

  updateElapsedTime(seconds: number): SimulationState {
    if (!this.state) {
      throw new Error('La simulación no ha sido iniciada.');
    }

    this.state = {
      ...this.state,
      elapsedTime: Math.max(0, seconds),
    };

    return this.state;
  }

  completeEmergencyCall(): SimulationState {
    if (!this.state) {
      throw new Error('La simulación no ha sido iniciada.');
    }

    this.state = {
      ...this.state,
      emergencyCallCompleted: true,
    };

    return this.state;
  }

  canFinish(): boolean {
    if (!this.state) {
      return false;
    }

    if (!this.state.completed) {
      return false;
    }

    if (
      this.state.emergencyCallRequired &&
      !this.state.emergencyCallCompleted
    ) {
      return false;
    }

    return true;
  }

  getResult() {
    if (!this.state) {
      throw new Error('La simulación no ha sido iniciada.');
    }

    const percentage =
      this.evaluator.calculatePercentage(
        this.state.score,
        this.state.maxScore
      );

    return {
      scenarioId: this.state.scenario.id,
      score: this.state.score,
      maxScore: this.state.maxScore,
      percentage,
      correctAnswers: this.state.correctAnswers,
      incorrectAnswers: this.state.incorrectAnswers,
      criticalErrors: this.state.criticalErrors,
      elapsedTime: this.state.elapsedTime,
      completed: this.state.completed,
      emergencyCallRequired:
        this.state.emergencyCallRequired,
      emergencyCallCompleted:
        this.state.emergencyCallCompleted,
      feedback: this.evaluator.getFinalFeedback(
        this.state.score,
        this.state.maxScore,
        this.state.criticalErrors
      ),
    };
  }
}
