import type {
  SimulatedCall,
  SimulatedCallQuestion,
} from '@/domain/models';

export interface SimulatedCallState {
  call: SimulatedCall;
  questions: SimulatedCallQuestion[];
  currentQuestionIndex: number;
  selectedOptionId: number | null;
  correctAnswers: number;
  incorrectAnswers: number;
  score: number;
  maxScore: number;
  completed: boolean;
}

export class SimulatedCallEngine {
  private state: SimulatedCallState | null = null;

  start(
    call: SimulatedCall,
    questions: SimulatedCallQuestion[]
  ): SimulatedCallState {
    const maxScore = questions.reduce(
      (total, question) =>
        total +
        Math.max(
          ...question.options.map(
            (option) => option.points
          ),
          0
        ),
      0
    );

    this.state = {
      call,
      questions,
      currentQuestionIndex: 0,
      selectedOptionId: null,
      correctAnswers: 0,
      incorrectAnswers: 0,
      score: 0,
      maxScore,
      completed: questions.length === 0,
    };

    return this.state;
  }

  getState(): SimulatedCallState | null {
    return this.state;
  }

  getCurrentQuestion(): SimulatedCallQuestion | null {
    if (!this.state || this.state.completed) {
      return null;
    }

    return (
      this.state.questions[
        this.state.currentQuestionIndex
      ] ?? null
    );
  }

  getCurrentOptions() {
    return this.getCurrentQuestion()?.options ?? [];
  }

  answer(optionId: number): SimulatedCallState {
    if (!this.state) {
      throw new Error(
        'La llamada simulada no ha sido iniciada.'
      );
    }

    if (this.state.completed) {
      throw new Error(
        'La llamada simulada ya ha terminado.'
      );
    }

    if (this.state.selectedOptionId !== null) {
      throw new Error(
        'Ya se respondió la pregunta actual.'
      );
    }

    const question =
      this.getCurrentQuestion();

    if (!question) {
      throw new Error(
        'No existe una pregunta activa para la llamada.'
      );
    }

    const option =
      question.options.find(
        (item) => item.id === optionId
      );

    if (!option) {
      throw new Error(
        'La opción seleccionada no es válida.'
      );
    }

    const correctAnswers =
      this.state.correctAnswers +
      (option.correct ? 1 : 0);

    const incorrectAnswers =
      this.state.incorrectAnswers +
      (option.correct ? 0 : 1);

    const score =
      this.state.score + option.points;

    const isLastQuestion =
      this.state.currentQuestionIndex >=
      this.state.questions.length - 1;

    this.state = {
      ...this.state,
      selectedOptionId: optionId,
      correctAnswers,
      incorrectAnswers,
      score,
      completed: isLastQuestion,
    };

    return this.state;
  }

  next(): SimulatedCallState {
    if (!this.state) {
      throw new Error(
        'La llamada simulada no ha sido iniciada.'
      );
    }

    if (this.state.selectedOptionId === null) {
      throw new Error(
        'Debes seleccionar una opción antes de continuar.'
      );
    }

    if (this.state.completed) {
      return this.state;
    }

    const nextQuestionIndex =
      this.state.currentQuestionIndex + 1;

    this.state = {
      ...this.state,
      currentQuestionIndex:
        nextQuestionIndex,
      selectedOptionId: null,
    };

    return this.state;
  }

  getSelectedOption() {
    if (!this.state) {
      return null;
    }

    const question =
      this.getCurrentQuestion();

    if (!question) {
      return null;
    }

    return (
      question.options.find(
        (option) =>
          option.id ===
          this.state?.selectedOptionId
      ) ?? null
    );
  }

  isCompleted(): boolean {
    return this.state?.completed ?? false;
  }

  getResult() {
    if (!this.state) {
      throw new Error(
        'La llamada simulada no ha sido iniciada.'
      );
    }

    return {
      callId: this.state.call.id,
      scenarioId: this.state.call.scenarioId,
      score: this.state.score,
      maxScore: this.state.maxScore,
      correctAnswers: this.state.correctAnswers,
      incorrectAnswers: this.state.incorrectAnswers,
      completed: this.state.completed,
    };
  }
}