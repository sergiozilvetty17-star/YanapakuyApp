import { useEffect, useMemo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { GetScenario } from '@/domain/useCases';
import {
  InMemoryScenarioRepository,
  InMemorySimulatedCallQuestionRepository,
  InMemorySimulatedCallRepository,
} from '@/data/repositories';

import type {
  Answer,
  SimulatedCallQuestion,
} from '@/domain/models';

import {
  SimulationEngine,
} from '@/features/simulador/engine';

import {
  colors,
  spacing,
  typography,
} from '@/theme';

export default function SimuladorDetalleScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const scenarioId = Number(id);

  const [engine, setEngine] =
    useState<SimulationEngine | null>(null);

  const [stateVersion, setStateVersion] =
    useState(0);

  const [error, setError] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  const scenarioRepository =
    useMemo(
      () => new InMemoryScenarioRepository(),
      []
    );

  const simulatedCallRepository =
    useMemo(
      () =>
        new InMemorySimulatedCallRepository(),
      []
    );

  const simulatedCallQuestionRepository =
    useMemo(
      () =>
        new InMemorySimulatedCallQuestionRepository(),
      []
    );

  useEffect(() => {
    let mounted = true;

    const loadSimulation = async () => {
      try {
        setLoading(true);
        setError(null);

        const getScenario =
          new GetScenario(
            scenarioRepository
          );

        const data =
          await getScenario.execute(
            scenarioId
          );

        if (!data) {
          throw new Error(
            'No se encontró el escenario.'
          );
        }

        const simulationEngine =
          new SimulationEngine();

        const simulatedCall =
          data.scenario.requiresEmergencyCall
            ? await simulatedCallRepository.getByScenarioId(
                scenarioId
              )
            : null;

        let simulatedCallQuestions: SimulatedCallQuestion[] =
          [];

        if (simulatedCall) {
          simulatedCallQuestions =
            await simulatedCallQuestionRepository.getByCallId(
              simulatedCall.id
            );
        }

        simulationEngine.start(
          data.scenario,
          data.questions,
          data.answers
        );

        if (simulatedCall) {
          simulationEngine.startSimulatedCall(
            simulatedCall,
            simulatedCallQuestions
          );
        }

        if (mounted) {
          setEngine(simulationEngine);
          setStateVersion(
            (value) => value + 1
          );
        }
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof Error
              ? err.message
              : 'No se pudo iniciar la simulación.'
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    if (
      Number.isFinite(scenarioId) &&
      scenarioId > 0
    ) {
      loadSimulation();
    } else {
      setError(
        'El escenario seleccionado no es válido.'
      );
      setLoading(false);
    }

    return () => {
      mounted = false;
    };
  }, [
    scenarioId,
    scenarioRepository,
    simulatedCallRepository,
    simulatedCallQuestionRepository,
  ]);

  const state =
    engine?.getState() ?? null;

  const question =
    engine?.getCurrentQuestion() ?? null;

  const answers =
    engine?.getCurrentAnswers() ?? [];

  const simulatedCallState =
    engine
      ?.getSimulatedCallEngine()
      .getState() ?? null;

  const simulatedCallQuestion =
    engine
      ?.getSimulatedCallEngine()
      .getCurrentQuestion() ?? null;

  const isCallQuestion =
    Boolean(
      !question &&
      state?.emergencyCallRequired === true &&
      simulatedCallState &&
      !simulatedCallState.completed
    );

  const currentQuestionNumber =
    question
      ? question.order
      : state
        ? state.currentQuestionIndex + 1
        : 1;

  const totalQuestions =
    engine?.getTotalQuestions() ?? 0;

  const result =
    engine?.getResult() ?? null;

  const showFinalResult =
    Boolean(state?.completed);

  const handleAnswer = (
    answer: Answer
  ) => {
    if (!engine) {
      return;
    }

    try {
      setError(null);

      engine.answer(answer.id);

      setStateVersion(
        (value) => value + 1
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'No se pudo registrar la respuesta.'
      );
    }
  };

  const handleSimulatedCallAnswer = (
    optionId: number
  ) => {
    if (!engine) {
      return;
    }

    try {
      setError(null);

      const callEngine =
        engine.getSimulatedCallEngine();

      const callState =
        callEngine.answer(optionId);

      if (callState.completed) {
        engine.completeEmergencyCall();
      } else {
        callEngine.next();
      }

      setStateVersion(
        (value) => value + 1
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'No se pudo registrar la respuesta de la llamada.'
      );
    }
  };

  const handleNextSimulatedCallQuestion =
    () => {
      if (!engine) {
        return;
      }

      try {
        setError(null);

        const callEngine =
          engine.getSimulatedCallEngine();

        const callState =
          callEngine.getState();

        if (!callState) {
          return;
        }

        if (callState.completed) {
          engine.completeEmergencyCall();
        } else {
          callEngine.next();
        }

        setStateVersion(
          (value) => value + 1
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'No se pudo continuar con la llamada simulada.'
        );
      }
    };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/simulador');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>
            Cargando simulación...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error && !engine) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorTitle}>
            No se pudo iniciar
          </Text>

          <Text style={styles.errorText}>
            {error}
          </Text>

          <Pressable
            style={styles.primaryButton}
            onPress={handleBack}
          >
            <Text style={styles.primaryButtonText}>
              Volver
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (!state || !engine) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorTitle}>
            Simulación no disponible
          </Text>

          <Pressable
            style={styles.primaryButton}
            onPress={handleBack}
          >
            <Text style={styles.primaryButtonText}>
              Volver
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={
          styles.scrollContent
        }
      >
        <View style={styles.header}>
          <Pressable
            onPress={handleBack}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>
              ← Volver
            </Text>
          </Pressable>

          <Text style={styles.headerTitle}>
            Simulador
          </Text>
        </View>

        <View style={styles.scenarioCard}>
          <Text style={styles.scenarioTitle}>
            {state.scenario.title}
          </Text>

          <Text style={styles.scenarioDescription}>
            {state.scenario.description}
          </Text>

          <View style={styles.badgesRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {state.scenario.difficulty}
              </Text>
            </View>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {state.scenario.estimatedTime}s
              </Text>
            </View>
          </View>
        </View>

        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>
              {error}
            </Text>
          </View>
        )}

        {!isCallQuestion &&
          !showFinalResult && (
            <View style={styles.progressCard}>
              <View style={styles.progressHeader}>
                <Text
                  style={styles.progressTitle}
                >
                  Pregunta{' '}
                  {currentQuestionNumber} de{' '}
                  {totalQuestions}
                </Text>

                <Text style={styles.scoreText}>
                  {state.score} pts
                </Text>
              </View>

              <View
                style={styles.progressTrack}
              >
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${Math.min(
                        100,
                        (currentQuestionNumber /
                          Math.max(
                            totalQuestions,
                            1
                          )) *
                          100
                      )}%`,
                    },
                  ]}
                />
              </View>
            </View>
          )}

        {!isCallQuestion &&
          !showFinalResult &&
          question && (
            <View style={styles.questionCard}>
              <Text style={styles.questionLabel}>
                DECISIÓN
              </Text>

              <Text style={styles.questionText}>
                {question.text}
              </Text>

              <View style={styles.answersContainer}>
                {answers.map((answer) => (
                  <Pressable
                    key={answer.id}
                    style={styles.answerButton}
                    onPress={() =>
                      handleAnswer(answer)
                    }
                  >
                    <Text
                      style={
                        styles.answerButtonText
                      }
                    >
                      {answer.text}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

        {isCallQuestion &&
          simulatedCallState &&
          simulatedCallQuestion && (
            <View
              style={styles.callCard}
            >
              <View
                style={styles.callHeader}
              >
                <Text
                  style={styles.callIcon}
                >
                  ☎
                </Text>

                <View
                  style={
                    styles.callHeaderText
                  }
                >
                  <Text
                    style={styles.callTitle}
                  >
                    Llamada simulada
                  </Text>

                  <Text
                    style={
                      styles.callOperator
                    }
                  >
                    {simulatedCallState.call
                      .operatorName}
                  </Text>
                </View>
              </View>

              <View
                style={
                  styles.operatorMessage
                }
              >
                <Text
                  style={
                    styles.operatorLabel
                  }
                >
                  OPERADOR
                </Text>

                <Text
                  style={
                    styles.operatorText
                  }
                >
                  {
                    simulatedCallState.call
                      .openingMessage
                  }
                </Text>
              </View>

              <View
                style={styles.callProgress}
              >
                <Text
                  style={
                    styles.callProgressText
                  }
                >
                  Pregunta{' '}
                  {simulatedCallQuestion.order}{' '}
                  de{' '}
                  {
                    simulatedCallState
                      .questions.length
                  }
                </Text>

                <Text
                  style={styles.callScore}
                >
                  {simulatedCallState.score} pts
                </Text>
              </View>

              <Text
                style={styles.callQuestion}
              >
                {simulatedCallQuestion.prompt}
              </Text>

              <View
                style={styles.answersContainer}
              >
                {simulatedCallQuestion.options.map(
                  (option) => {
                    const selected =
                      simulatedCallState.selectedOptionId ===
                      option.id;

                    return (
                      <Pressable
                        key={option.id}
                        style={[
                          styles.callOption,
                          selected &&
                            styles.callOptionSelected,
                        ]}
                        onPress={() =>
                          handleSimulatedCallAnswer(
                            option.id
                          )
                        }
                        disabled={
                          simulatedCallState.selectedOptionId !==
                          null
                        }
                      >
                        <Text
                          style={[
                            styles.callOptionText,
                            selected &&
                              styles.callOptionTextSelected,
                          ]}
                        >
                          {option.text}
                        </Text>
                      </Pressable>
                    );
                  }
                )}
              </View>




            </View>
          )}

        {showFinalResult &&
          result && (
            <View
              style={styles.resultCard}
            >
              <Text
                style={styles.resultTitle}
              >
                Simulación completada
              </Text>

              <Text
                style={styles.resultScore}
              >
                {result.score} / {result.maxScore}
              </Text>

              <Text
                style={styles.resultPercentage}
              >
                {result.maxScore > 0
                  ? Math.round(
                      (result.score /
                        result.maxScore) *
                        100
                    )
                  : 0}
                %
              </Text>

              <View
                style={styles.resultStats}
              >
                <View
                  style={styles.stat}
                >
                  <Text
                    style={styles.statValue}
                  >
                    {result.correctAnswers}
                  </Text>

                  <Text
                    style={styles.statLabel}
                  >
                    Correctas
                  </Text>
                </View>

                <View
                  style={styles.stat}
                >
                  <Text
                    style={styles.statValue}
                  >
                    {result.incorrectAnswers}
                  </Text>

                  <Text
                    style={styles.statLabel}
                  >
                    Incorrectas
                  </Text>
                </View>

                <View
                  style={styles.stat}
                >
                  <Text
                    style={styles.statValue}
                  >
                    {result.criticalErrors}
                  </Text>

                  <Text
                    style={styles.statLabel}
                  >
                    Errores críticos
                  </Text>
                </View>
              </View>

              <View
                style={styles.resultMessage}
              >
                <Text
                  style={
                    styles.resultMessageText
                  }
                >
                  {result.criticalErrors > 0
                    ? 'La simulación terminó debido a una decisión crítica.'
                    : result.score /
                        Math.max(
                          result.maxScore,
                          1
                        ) >=
                      0.9
                      ? 'Excelente desempeño. Demostraste buenas decisiones durante la emergencia.'
                      : result.score /
                          Math.max(
                            result.maxScore,
                            1
                          ) >=
                        0.7
                        ? 'Buen desempeño. Puedes seguir practicando para mejorar.'
                        : result.score /
                            Math.max(
                              result.maxScore,
                              1
                            ) >=
                          0.5
                          ? 'Desempeño regular. Conviene reforzar algunos conceptos.'
                          : 'Necesitas reforzar los conocimientos básicos de actuación ante emergencias.'}
                </Text>
              </View>

              <Pressable
                style={styles.primaryButton}
                onPress={() =>
                  router.replace(
                    '/simulador'
                  )
                }
              >
                <Text
                  style={
                    styles.primaryButtonText
                  }
                >
                  Volver a escenarios
                </Text>
              </Pressable>
            </View>
          )}

        {!showFinalResult && (
          <View style={styles.warningCard}>
            <Text
              style={styles.warningTitle}
            >
              Aviso educativo
            </Text>

            <Text
              style={styles.warningText}
            >
              Esta simulación tiene fines
              educativos. Ante una emergencia
              real, solicita ayuda profesional y
              sigue las instrucciones de los
              servicios de emergencia.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },

  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },

  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
  },

  errorTitle: {
    ...typography.sectionTitle,
    color: colors.danger,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },

  errorText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },

  errorBox: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
  },

  header: {
    marginBottom: spacing.md,
  },

  backButton: {
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },

  backButtonText: {
    ...typography.button,
    color: colors.primary,
  },

  headerTitle: {
    ...typography.title,
    color: colors.text,
  },

  scenarioCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },

  scenarioTitle: {
    ...typography.sectionTitle,
    color: colors.text,
    marginBottom: spacing.sm,
  },

  scenarioDescription: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },

  badgesRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },

  badge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: 999,
  },

  badgeText: {
    ...typography.small,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },

  progressCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },

  progressTitle: {
    ...typography.body,
    fontWeight: '700',
    color: colors.text,
  },

  scoreText: {
    ...typography.body,
    fontWeight: '700',
    color: colors.primary,
  },

  progressTrack: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 999,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 999,
  },

  questionCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },

  questionLabel: {
    ...typography.small,
    color: colors.primary,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },

  questionText: {
    ...typography.sectionTitle,
    color: colors.text,
    lineHeight: 27,
    marginBottom: spacing.lg,
  },

  answersContainer: {
    gap: spacing.sm,
  },

  answerButton: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
  },

  answerButtonText: {
    ...typography.body,
    color: colors.text,
    lineHeight: 21,
  },

  callCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.secondary,
  },

  callHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  callIcon: {
    fontSize: 30,
    marginRight: spacing.sm,
  },

  callHeaderText: {
    flex: 1,
  },

  callTitle: {
    ...typography.sectionTitle,
    color: colors.text,
  },

  callOperator: {
    ...typography.small,
    color: colors.textSecondary,
    marginTop: 2,
  },

  operatorMessage: {
    backgroundColor: '#F0FDFA',
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
  },

  operatorLabel: {
    ...typography.small,
    fontWeight: '800',
    color: colors.secondary,
    letterSpacing: 1,
    marginBottom: 4,
  },

  operatorText: {
    ...typography.body,
    color: colors.text,
    lineHeight: 22,
  },

  callProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },

  callProgressText: {
    ...typography.small,
    color: colors.textSecondary,
  },

  callScore: {
    ...typography.small,
    fontWeight: '700',
    color: colors.secondary,
  },

  callQuestion: {
    ...typography.sectionTitle,
    color: colors.text,
    lineHeight: 27,
    marginBottom: spacing.lg,
  },

  callOption: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
  },

  callOptionSelected: {
    borderColor: colors.secondary,
    backgroundColor: '#F0FDFA',
  },

  callOptionText: {
    ...typography.body,
    color: colors.text,
    lineHeight: 21,
  },

  callOptionTextSelected: {
    fontWeight: '700',
  },

  feedbackBox: {
    marginTop: spacing.md,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },

  feedbackTitle: {
    ...typography.body,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },

  feedbackText: {
    ...typography.small,
    color: colors.textSecondary,
    lineHeight: 20,
  },

  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.md,
  },

  primaryButtonText: {
    ...typography.button,
    color: colors.white,
  },

  resultCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },

  resultTitle: {
    ...typography.sectionTitle,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },

  resultScore: {
    fontSize: 42,
    fontWeight: '800',
    color: colors.primary,
  },

  resultPercentage: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.secondary,
    marginTop: 4,
  },

  resultStats: {
    flexDirection: 'row',
    width: '100%',
    marginTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.lg,
  },

  stat: {
    flex: 1,
    alignItems: 'center',
  },

  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },

  statLabel: {
    ...typography.small,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },

  resultMessage: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: spacing.md,
    marginTop: spacing.lg,
  },

  resultMessageText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },

  warningCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },

  warningTitle: {
    ...typography.body,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 4,
  },

  warningText: {
    ...typography.small,
    color: '#92400E',
    lineHeight: 20,
  },
});