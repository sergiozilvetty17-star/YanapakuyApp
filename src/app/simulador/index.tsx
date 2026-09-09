import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import {
  AlertIcon,
  BackIcon,
  CheckIcon,
  SimulatorIcon,
} from '@/components/ui/icons';

import { GetScenarios } from '@/domain/useCases';
import { InMemoryScenarioRepository } from '@/data/repositories';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

const scenarioRepository =
  new InMemoryScenarioRepository();

const getScenarios =
  new GetScenarios(scenarioRepository);

const difficultyLabels: Record<string, string> = {
  facil: 'Fácil',
  medio: 'Intermedio',
  dificil: 'Difícil',
};

const difficultyColors: Record<string, string> = {
  facil: colors.success,
  medio: colors.warning,
  dificil: colors.danger,
};

const difficultyBackgrounds: Record<string, string> = {
  facil: '#F0FDF4',
  medio: '#FFFBEB',
  dificil: '#FEF2F2',
};

function DifficultyIcon({
  difficulty,
}: {
  difficulty: string;
}) {
  const color =
    difficultyColors[difficulty] ?? colors.primary;

  return (
    <CheckIcon
      size={17}
      color={color}
      strokeWidth={2.4}
    />
  );
}

export default function SimuladorScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const [scenarios, setScenarios] = React.useState<
    Awaited<ReturnType<typeof getScenarios.execute>>
  >([]);

  const [loading, setLoading] =
    React.useState(true);

  const isSmall = width < 360;
  const isLarge = width >= 600;

  const titleSize = isSmall
    ? 25
    : isLarge
      ? 32
      : 28;

  const bodySize = isSmall
    ? 14
    : isLarge
      ? 18
      : 16;

  React.useEffect(() => {
    const loadScenarios = async () => {
      try {
        const result =
          await getScenarios.execute();

        setScenarios(
          result.filter(
            (scenario) => scenario.active
          )
        );
      } finally {
        setLoading(false);
      }
    };

    loadScenarios();
  }, []);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/');
  };

  const handleScenarioPress = (
    id: number
  ) => {
    router.push({
      pathname: '/simulador/[id]',
      params: {
        id: id.toString(),
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* VOLVER */}

        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.8}
        >
          <BackIcon
            size={21}
            color={colors.primary}
            strokeWidth={2.2}
          />

          <Text style={styles.backText}>
            Volver
          </Text>
        </TouchableOpacity>

        {/* HEADER */}

        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerIcon}>
              <SimulatorIcon
                size={30}
                color={colors.white}
                strokeWidth={2}
              />
            </View>

            <View style={styles.headerText}>
              <Text
                style={[
                  styles.title,
                  { fontSize: titleSize },
                ]}
              >
                Simulador
              </Text>

              <Text
                style={[
                  styles.subtitle,
                  { fontSize: bodySize },
                ]}
              >
                Practica cómo actuar ante distintas
                situaciones de emergencia mediante
                escenarios interactivos.
              </Text>
            </View>
          </View>
        </View>

        {/* INTRODUCTION */}

        <View style={styles.introductionCard}>
          <View style={styles.introductionIcon}>
            <SimulatorIcon
              size={24}
              color={colors.secondary}
              strokeWidth={2}
            />
          </View>

          <View style={styles.introductionContent}>
            <Text style={styles.introductionTitle}>
              Aprende tomando decisiones
            </Text>

            <Text
              style={[
                styles.introductionText,
                { fontSize: bodySize - 1 },
              ]}
            >
              Cada escenario presenta una situación,
              preguntas y consecuencias. Tus decisiones
              determinarán tu resultado final.
            </Text>
          </View>
        </View>

        {/* SIMULATION NOTICE */}

        <View style={styles.simulationNotice}>
          <View style={styles.simulationNoticeIcon}>
            <AlertIcon
              size={22}
              color={colors.warning}
              strokeWidth={2}
            />
          </View>

          <View style={styles.simulationNoticeContent}>
            <Text style={styles.simulationNoticeTitle}>
              Simulación segura
            </Text>

            <Text style={styles.simulationNoticeText}>
              Las llamadas realizadas dentro de los
              escenarios son completamente simuladas.
              La aplicación nunca realiza una llamada
              telefónica real desde el simulador.
            </Text>
          </View>
        </View>

        {/* SECTION */}

        <View style={styles.sectionHeader}>
          <View style={styles.sectionHeaderText}>
            <Text style={styles.sectionTitle}>
              Elige un escenario
            </Text>

            <Text style={styles.sectionSubtitle}>
              Pon a prueba tus conocimientos.
            </Text>
          </View>

          {!loading && (
            <View style={styles.countBadge}>
              <Text style={styles.countText}>
                {scenarios.length}
              </Text>
            </View>
          )}
        </View>

        {/* LOADING */}

        {loading && (
          <View style={styles.stateCard}>
            <View style={styles.stateIcon}>
              <SimulatorIcon
                size={26}
                color={colors.primary}
              />
            </View>

            <Text style={styles.stateTitle}>
              Cargando escenarios
            </Text>

            <Text style={styles.stateText}>
              Preparando las situaciones disponibles.
            </Text>
          </View>
        )}

        {/* EMPTY */}

        {!loading &&
          scenarios.length === 0 && (
            <View style={styles.stateCard}>
              <View style={styles.stateIcon}>
                <AlertIcon
                  size={26}
                  color={colors.warning}
                />
              </View>

              <Text style={styles.stateTitle}>
                No hay escenarios disponibles
              </Text>

              <Text style={styles.stateText}>
                Actualmente no existen simulaciones
                activas para realizar.
              </Text>
            </View>
          )}

        {/* SCENARIOS */}

        {!loading &&
          scenarios.map((scenario) => {
            const difficulty =
              scenario.difficulty;

            const difficultyColor =
              difficultyColors[difficulty] ??
              colors.primary;

            const difficultyBackground =
              difficultyBackgrounds[difficulty] ??
              '#FEF2F2';

            return (
              <TouchableOpacity
                key={scenario.id}
                style={styles.scenarioCard}
                onPress={() =>
                  handleScenarioPress(
                    scenario.id
                  )
                }
                activeOpacity={0.84}
              >
                {/* TOP */}

                <View style={styles.cardTop}>
                  <View
                    style={[
                      styles.scenarioIcon,
                      {
                        backgroundColor:
                          difficultyBackground,
                      },
                    ]}
                  >
                    <SimulatorIcon
                      size={27}
                      color={difficultyColor}
                      strokeWidth={2}
                    />
                  </View>

                  <View style={styles.scenarioTitleArea}>
                    <Text style={styles.scenarioCategory}>
                      SIMULACIÓN
                    </Text>

                    <Text style={styles.scenarioTitle}>
                      {scenario.title}
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.arrow,
                      {
                        color:
                          difficultyColor,
                      },
                    ]}
                  >
                    ›
                  </Text>
                </View>

                {/* DESCRIPTION */}

                <Text
                  style={[
                    styles.scenarioDescription,
                    { fontSize: bodySize },
                  ]}
                >
                  {scenario.description}
                </Text>

                {/* METADATA */}

                <View style={styles.metadataContainer}>
                  <View
                    style={[
                      styles.metadataItem,
                      {
                        backgroundColor:
                          difficultyBackground,
                      },
                    ]}
                  >
                    <DifficultyIcon
                      difficulty={difficulty}
                    />

                    <Text
                      style={[
                        styles.metadataText,
                        {
                          color:
                            difficultyColor,
                        },
                      ]}
                    >
                      {difficultyLabels[difficulty] ??
                        difficulty}
                    </Text>
                  </View>

                  <View style={styles.metadataItem}>
                    <Text style={styles.metadataLabel}>
                      Tiempo
                    </Text>

                    <Text style={styles.metadataValue}>
                      {scenario.estimatedTime} min
                    </Text>
                  </View>

                  {scenario.requiresEmergencyCall && (
                    <View
                      style={[
                        styles.metadataItem,
                        styles.callMetadata,
                      ]}
                    >
                      <Text
                        style={
                          styles.callMetadataText
                        }
                      >
                        Llamada simulada
                      </Text>
                    </View>
                  )}
                </View>

                {/* ACTION */}

                <View style={styles.startContainer}>
                  <Text style={styles.startText}>
                    Iniciar escenario
                  </Text>

                  <View
                    style={[
                      styles.startArrow,
                      {
                        backgroundColor:
                          difficultyColor,
                      },
                    ]}
                  >
                    <Text style={styles.startArrowText}>
                      →
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}

        {/* FOOTER */}

        <View style={styles.footerNotice}>
          <View style={styles.footerIcon}>
            <AlertIcon
              size={21}
              color={colors.primary}
              strokeWidth={2}
            />
          </View>

          <View style={styles.footerContent}>
            <Text style={styles.footerTitle}>
              Recuerda
            </Text>

            <Text style={styles.footerText}>
              El simulador es una herramienta educativa.
              Ante una emergencia real, sigue las
              indicaciones de profesionales y utiliza los
              servicios de emergencia correspondientes.
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Aprende. Practica. Actúa.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },

  backButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingRight: spacing.sm,
    marginBottom: spacing.md,
  },

  backText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '800',
    marginLeft: 4,
  },

  header: {
    marginBottom: spacing.lg,
  },

  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    flexShrink: 0,
  },

  headerText: {
    flex: 1,
    minWidth: 0,
  },

  title: {
    color: colors.text,
    fontWeight: '900',
    lineHeight: 34,
    marginBottom: spacing.xs,
    flexShrink: 1,
  },

  subtitle: {
    color: colors.textSecondary,
    lineHeight: 23,
    flexShrink: 1,
  },

  introductionCard: {
    flexDirection: 'row',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 20,
    padding: spacing.md,
    marginBottom: spacing.md,
  },

  introductionIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    flexShrink: 0,
  },

  introductionContent: {
    flex: 1,
    minWidth: 0,
  },

  introductionTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 4,
  },

  introductionText: {
    color: colors.textSecondary,
    lineHeight: 21,
    flexShrink: 1,
  },

  simulationNotice: {
    flexDirection: 'row',
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 20,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },

  simulationNoticeIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    flexShrink: 0,
  },

  simulationNoticeContent: {
    flex: 1,
    minWidth: 0,
  },

  simulationNoticeTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 4,
  },

  simulationNoticeText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },

  sectionHeaderText: {
    flex: 1,
    minWidth: 0,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },

  sectionSubtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 3,
  },

  countBadge: {
    minWidth: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 9,
    marginLeft: spacing.sm,
  },

  countText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '900',
  },

  stateCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: spacing.xl,
    alignItems: 'center',
  },

  stateIcon: {
    width: 53,
    height: 53,
    borderRadius: 17,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },

  stateTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
    textAlign: 'center',
  },

  stateText: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 4,
  },

  scenarioCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: spacing.md,
    marginBottom: spacing.md,
  },

  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  scenarioIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    flexShrink: 0,
  },

  scenarioTitleArea: {
    flex: 1,
    minWidth: 0,
  },

  scenarioCategory: {
    color: colors.textLight,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
    marginBottom: 3,
  },

  scenarioTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 23,
    flexShrink: 1,
  },

  arrow: {
    fontSize: 30,
    fontWeight: '400',
    marginLeft: spacing.sm,
    flexShrink: 0,
  },

  scenarioDescription: {
    color: colors.textSecondary,
    lineHeight: 23,
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },

  metadataContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  metadataItem: {
    minHeight: 31,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 6,
  },

  metadataText: {
    fontSize: 11,
    fontWeight: '900',
    marginLeft: 5,
  },

  metadataLabel: {
    color: colors.textLight,
    fontSize: 10,
    fontWeight: '800',
    marginRight: 4,
  },

  metadataValue: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '900',
  },

  callMetadata: {
    backgroundColor: '#EFF6FF',
  },

  callMetadataText: {
    color: '#2563EB',
    fontSize: 10,
    fontWeight: '900',
  },

  startContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  startText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },

  startArrow: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  startArrowText: {
    color: colors.white,
    fontSize: 19,
    fontWeight: '900',
  },

  footerNotice: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 19,
    padding: spacing.md,
    marginTop: spacing.md,
  },

  footerIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    flexShrink: 0,
  },

  footerContent: {
    flex: 1,
    minWidth: 0,
  },

  footerTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 4,
  },

  footerText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },

  footer: {
    textAlign: 'center',
    color: colors.textLight,
    fontSize: 12,
    fontWeight: '700',
    marginTop: spacing.xl,
  },
});