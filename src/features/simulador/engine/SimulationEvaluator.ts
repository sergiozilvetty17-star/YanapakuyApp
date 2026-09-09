import type { Answer, Question, Scenario } from '@/domain/models';
import type { SimulationState } from './SimulationState';

export class SimulationEvaluator {
  evaluateAnswer(
    answer: Answer,
    state: SimulationState
  ): SimulationState {
    const updatedState: SimulationState = {
      ...state,
      score: state.score + Math.max(0, answer.points),
      correctAnswers: state.correctAnswers + (answer.correct ? 1 : 0),
      incorrectAnswers: state.incorrectAnswers + (answer.correct ? 0 : 1),
      criticalErrors:
        state.criticalErrors + (answer.criticalError ? 1 : 0),
      selectedAnswers: [...state.selectedAnswers, answer.id],
    };

    return updatedState;
  }

  calculateMaxScore(questions: Question[], answers: Answer[]): number {
    return questions.reduce((total, question) => {
      const questionAnswers = answers.filter(
        answer => answer.questionId === question.id
      );

      const bestAnswer = questionAnswers.reduce(
        (best, answer) => Math.max(best, answer.points),
        0
      );

      return total + bestAnswer;
    }, 0);
  }

  calculatePercentage(score: number, maxScore: number): number {
    if (maxScore <= 0) {
      return 0;
    }

    return Math.round((score / maxScore) * 100);
  }

  getFinalFeedback(
    score: number,
    maxScore: number,
    criticalErrors: number
  ): string {
    if (criticalErrors > 0) {
      return 'La simulación terminó debido a una decisión crítica. Revisa las recomendaciones antes de volver a intentarlo.';
    }

    const percentage = this.calculatePercentage(score, maxScore);

    if (percentage >= 90) {
      return 'Excelente actuación. Demostraste una respuesta adecuada ante la emergencia.';
    }

    if (percentage >= 70) {
      return 'Buen trabajo. Con algunas mejoras puedes responder todavía mejor ante una emergencia.';
    }

    if (percentage >= 50) {
      return 'Actuación regular. Es recomendable repasar la guía y volver a realizar la simulación.';
    }

    return 'Necesitas reforzar tus conocimientos de primeros auxilios antes de afrontar una situación similar.';
  }
}
