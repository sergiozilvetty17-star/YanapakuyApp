import { router, useLocalSearchParams } from 'expo-router';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';

import { GetScenario, StartSimulation } from '@/domain/useCases';
import { InMemoryScenarioRepository } from '@/data/repositories';
import type { Answer, Scenario } from '@/domain/models';
import type { SimulationEngine } from '@/features/simulador/engine';
import { colors, spacing, typography } from '@/theme';

const scenarioRepository = new InMemoryScenarioRepository();
const getScenario = new GetScenario(scenarioRepository);
const startSimulation = new StartSimulation(scenarioRepository);

export default function SimuladorDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const scenarioId = Number(id);

  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [engine, setEngine] = useState<SimulationEngine | null>(null);
  const [currentAnswers, setCurrentAnswers] = useState<Answer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadScenario();
  }, [scenarioId]);

  useEffect(() => {
    if (!engine || selectedAnswer) {
      return;
    }

    const question = engine.getCurrentQuestion();

    if (!question || question.timeLimit === undefined) {
      setRemainingTime(null);
      return;
    }

    setRemainingTime(question.timeLimit);

    const interval = setInterval(() => {
      setRemainingTime((current) => {
        if (current === null) {
          return null;
        }

        if (current <= 1) {
          clearInterval(interval);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [engine, selectedAnswer]);

  async function loadScenario() {
    setLoading(true);
    setError(null);

    try {
      const result = await getScenario.execute(scenarioId);

      if (!result) {
        setError('No se encontró el escenario.');
        return;
      }

      setScenario(result.scenario);
    } catch {
      setError('No se pudo cargar el escenario.');
    } finally {
      setLoading(false);
    }
  }

  async function handleStartSimulation() {
    setStarting(true);
    setError(null);

    try {
      const simulation = await startSimulation.execute(scenarioId);

      setEngine(simulation);
      setCurrentAnswers(simulation.getCurrentAnswers());
    } catch {
      setError('No se pudo iniciar la simulación.');
    } finally {
      setStarting(false);
    }
  }

  function handleAnswer(answerId: number) {
    if (!engine) {
      return;
    }

    const answer = currentAnswers.find(
      (item) => item.id === answerId
    );

    if (!answer) {
      return;
    }

    try {
      engine.answer(answerId);

      setSelectedAnswer(answer);
    } catch {
      setError('No se pudo procesar la respuesta.');
    }
  }

  function handleContinue() {
    if (!engine) {
      return;
    }

    setSelectedAnswer(null);
    setEngine(engine);
    setCurrentAnswers(engine.getCurrentAnswers());
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loading}>
          <ActivityIndicator
            size="large"
            color={colors.primary}
          />

          <Text style={styles.loadingText}>
            Preparando escenario...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!scenario) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <Text style={styles.errorTitle}>
            Escenario no disponible
          </Text>

          <Pressable
            style={styles.primaryButton}
            onPress={() => router.back()}
          >
            <Text style={styles.primaryButtonText}>
              Volver
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (engine) {
    const question = engine.getCurrentQuestion();
    const state = engine.getState();

    if (!state) {
      return (
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.center}>
            <Text style={styles.errorTitle}>
              No se pudo obtener el estado de la simulación.
            </Text>

            <Pressable
              style={styles.primaryButton}
              onPress={() => setEngine(null)}
            >
              <Text style={styles.primaryButtonText}>
                Volver al escenario
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      );
    }

    if (!question || state.completed) {
      return (
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            contentContainerStyle={styles.container}
          >
            <Text style={styles.title}>
              Simulación finalizada
            </Text>

            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>
                Puntuación
              </Text>

              <Text style={styles.resultScore}>
                {state.score} / {state.maxScore}
              </Text>

              <Text style={styles.resultText}>
                Respuestas correctas: {state.correctAnswers}
              </Text>

              <Text style={styles.resultText}>
                Respuestas incorrectas: {state.incorrectAnswers}
              </Text>

              <Text style={styles.resultText}>
                Errores críticos: {state.criticalErrors}
              </Text>

              <Text style={styles.resultText}>
                Tiempo: {state.elapsedTime} segundos
              </Text>
            </View>

            <Pressable
              style={styles.primaryButton}
              onPress={() => router.back()}
            >
              <Text style={styles.primaryButtonText}>
                Volver a escenarios
              </Text>
            </Pressable>
          </ScrollView>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <Pressable onPress={() => router.back()}>
            <Text style={styles.back}>‹ Salir</Text>
          </Pressable>

          <View style={styles.progressHeader}>
            <Text style={styles.progressText}>
              Pregunta {state.currentQuestionIndex + 1}
            </Text>

            <Text style={styles.scoreText}>
              {state.score} puntos
            </Text>
          </View>

          <View style={styles.questionCard}>
            {remainingTime !== null && (
              <View
                style={[
                  styles.timerCard,
                  remainingTime <= 10 && styles.timerDanger,
                ]}
              >
                <Text
                  style={[
                    styles.timerText,
                    remainingTime <= 10 && styles.timerTextDanger,
                  ]}
                >
                  ⏱ {remainingTime} segundos
                </Text>
              </View>
            )}

            <Text style={styles.questionText}>
              {question.text}
            </Text>

            {question.critical && (
              <View style={styles.criticalBadge}>
                <Text style={styles.criticalText}>
                  Decisión importante
                </Text>
              </View>
            )}
          </View>

          {!selectedAnswer && (
            <>
              <Text style={styles.sectionTitle}>
                Selecciona una respuesta
              </Text>

              {currentAnswers.map((answer, index) => (
                <Pressable
                  key={answer.id}
                  style={({ pressed }) => [
                    styles.answerCard,
                    pressed && styles.answerPressed,
                  ]}
                  onPress={() => handleAnswer(answer.id)}
                >
                  <View style={styles.answerBullet}>
                    <Text style={styles.answerBulletText}>
                      {String.fromCharCode(65 + index)}
                    </Text>
                  </View>

                  <Text style={styles.answerText}>
                    {answer.text}
                  </Text>
                </Pressable>
              ))}
            </>
          )}

          {selectedAnswer && (
            <View
              style={[
                styles.feedbackCard,
                selectedAnswer.correct
                  ? styles.feedbackCorrect
                  : styles.feedbackIncorrect,
              ]}
            >
              <Text
                style={[
                  styles.feedbackTitle,
                  selectedAnswer.correct
                    ? styles.feedbackTitleCorrect
                    : styles.feedbackTitleIncorrect,
                ]}
              >
                {selectedAnswer.correct
                  ? '✓ Respuesta correcta'
                  : '✕ Respuesta incorrecta'}
              </Text>

              <Text style={styles.feedbackPoints}>
                {selectedAnswer.points > 0
                  ? `+${selectedAnswer.points} puntos`
                  : '0 puntos'}
              </Text>

              <View style={styles.feedbackSection}>
                <Text style={styles.feedbackLabel}>
                  Retroalimentación
                </Text>

                <Text style={styles.feedbackText}>
                  {selectedAnswer.feedback}
                </Text>
              </View>

              {selectedAnswer.consequence && (
                <View style={styles.consequenceCard}>
                  <Text style={styles.consequenceLabel}>
                    Consecuencia
                  </Text>

                  <Text style={styles.consequenceText}>
                    {selectedAnswer.consequence}
                  </Text>
                </View>
              )}

              {selectedAnswer.criticalError && (
                <View style={styles.criticalErrorCard}>
                  <Text style={styles.criticalErrorTitle}>
                    ⚠ Error crítico
                  </Text>

                  <Text style={styles.criticalErrorText}>
                    Esta decisión puede finalizar la simulación debido
                    a la gravedad del error.
                  </Text>
                </View>
              )}

              <Pressable
                style={({ pressed }) => [
                  styles.continueButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={handleContinue}
              >
                <Text style={styles.continueButtonText}>
                  {selectedAnswer.criticalError
                    ? 'Ver resultado'
                    : 'Continuar →'}
                </Text>
              </Pressable>
            </View>
          )}

          {currentAnswers.map((answer, index) => (
            <Pressable
              key={answer.id}
              style={({ pressed }) => [
                styles.answerCard,
                pressed && styles.answerPressed,
              ]}
              onPress={() => handleAnswer(answer.id)}
            >
              <View style={styles.answerBullet}>
                <Text style={styles.answerBulletText}>
                  {String.fromCharCode(65 + index)}
                </Text>
              </View>

              <Text style={styles.answerText}>
                {answer.text}
              </Text>
            </Pressable>
          ))}

          {error && (
            <View style={styles.errorCard}>
              <Text style={styles.errorText}>
                {error}
              </Text>
            </View>
          )}

          <View style={styles.simulationWarning}>
            <Text style={styles.warningTitle}>
              Simulación educativa
            </Text>

            <Text style={styles.warningText}>
              Esta actividad es ficticia y no sustituye la capacitación
              profesional en primeros auxilios.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>‹ Volver</Text>
        </Pressable>

        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>?</Text>
          </View>

          <Text style={styles.title}>
            {scenario.title}
          </Text>

          <Text style={styles.description}>
            {scenario.description}
          </Text>

          <View style={styles.metaRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {scenario.difficulty === 'facil'
                  ? 'Fácil'
                  : scenario.difficulty === 'medio'
                    ? 'Medio'
                    : 'Difícil'}
              </Text>
            </View>

            <Text style={styles.metaText}>
              {Math.ceil(scenario.estimatedTime / 60)} min
            </Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>
            Preparado para comenzar
          </Text>

          <Text style={styles.infoText}>
            El escenario se ejecutará mediante el motor de simulación.
            Deberás analizar cada situación y seleccionar una respuesta.
          </Text>

          {scenario.requiresEmergencyCall && (
            <Text style={styles.callInfo}>
              ☎ Este escenario incluye una llamada simulada.
            </Text>
          )}
        </View>

        {error && (
          <View style={styles.errorCard}>
            <Text style={styles.errorText}>
              {error}
            </Text>
          </View>
        )}

        <Pressable
          style={({ pressed }) => [
            styles.startButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleStartSimulation}
          disabled={starting}
        >
          {starting ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.startButtonText}>
              Comenzar simulación
            </Text>
          )}
        </Pressable>

        <View style={styles.warning}>
          <Text style={styles.warningTitle}>
            ⚠ Simulación únicamente
          </Text>

          <Text style={styles.warningText}>
            Las llamadas realizadas dentro del simulador son ficticias y
            nunca realizan una llamada telefónica real.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },

  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingText: {
    marginTop: spacing.md,
    color: colors.textSecondary,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },

  back: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '700',
    marginBottom: spacing.lg,
  },

  header: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },

  iconContainer: {
    width: 54,
    height: 54,
    borderRadius: 17,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },

  icon: {
    fontSize: 30,
    fontWeight: '900',
    color: colors.white,
  },

  title: {
    ...typography.title,
    color: colors.text,
  },

  description: {
    marginTop: spacing.sm,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: colors.primary,
  },

  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '800',
  },

  metaText: {
    marginLeft: spacing.md,
    fontSize: 13,
    color: colors.textSecondary,
  },

  infoCard: {
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: 18,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.secondary,
  },

  infoText: {
    marginTop: spacing.sm,
    fontSize: 14,
    lineHeight: 21,
    color: colors.text,
  },

  callInfo: {
    marginTop: spacing.md,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '700',
    color: colors.secondary,
  },

  startButton: {
    marginTop: spacing.xl,
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonPressed: {
    opacity: 0.75,
  },

  startButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  progressText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
  },

  scoreText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.secondary,
  },

  questionCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },

  timerCard: {
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: '#FEF3C7',
  },

  timerDanger: {
    backgroundColor: '#FEE2E2',
  },

  timerText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#92400E',
  },

  timerTextDanger: {
    color: colors.danger,
  },

  questionText: {
    fontSize: 19,
    lineHeight: 28,
    fontWeight: '800',
    color: colors.text,
  },

  criticalBadge: {
    alignSelf: 'flex-start',
    marginTop: spacing.md,
    backgroundColor: '#FEF3C7',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  criticalText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#92400E',
  },

  sectionTitle: {
    ...typography.sectionTitle,
    color: colors.text,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },

  answerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },

  answerPressed: {
    opacity: 0.7,
  },

  answerBullet: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  answerBulletText: {
    color: colors.white,
    fontWeight: '800',
  },

  answerText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
    color: colors.text,
  },

  feedbackCard: {
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: 20,
    borderWidth: 1,
  },

  feedbackCorrect: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },

  feedbackIncorrect: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },

  feedbackTitle: {
    fontSize: 20,
    fontWeight: '900',
  },

  feedbackTitleCorrect: {
    color: colors.success,
  },

  feedbackTitleIncorrect: {
    color: colors.danger,
  },

  feedbackPoints: {
    marginTop: spacing.sm,
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },

  feedbackSection: {
    marginTop: spacing.lg,
  },

  feedbackLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },

  feedbackText: {
    marginTop: spacing.xs,
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
  },

  consequenceCard: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: 14,
    backgroundColor: '#FFFBEB',
  },

  consequenceLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.warning,
  },

  consequenceText: {
    marginTop: spacing.xs,
    fontSize: 14,
    lineHeight: 21,
    color: colors.text,
  },

  criticalErrorCard: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: 14,
    backgroundColor: '#7F1D1D',
  },

  criticalErrorTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.white,
  },

  criticalErrorText: {
    marginTop: spacing.xs,
    fontSize: 13,
    lineHeight: 20,
    color: colors.white,
  },

  continueButton: {
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  continueButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '800',
  },

  resultCard: {
    marginTop: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },

  resultLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },

  resultScore: {
    marginTop: spacing.sm,
    fontSize: 34,
    fontWeight: '900',
    color: colors.primary,
  },

  resultText: {
    marginTop: spacing.sm,
    fontSize: 14,
    color: colors.text,
  },

  errorCard: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: 14,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },

  errorText: {
    color: colors.danger,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '700',
  },

  warning: {
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: 16,
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FED7AA',
  },

  simulationWarning: {
    marginTop: spacing.xl,
    padding: spacing.md,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: colors.border,
  },

  warningTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.warning,
  },

  warningText: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
  },

  errorTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },

  primaryButton: {
    marginTop: spacing.xl,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 14,
  },

  primaryButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '800',
  },
});