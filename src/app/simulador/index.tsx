import { router } from 'expo-router';
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

import { GetScenarios } from '@/domain/useCases';
import { InMemoryScenarioRepository } from '@/data/repositories';
import type { Scenario } from '@/domain/models';
import { colors, spacing, typography } from '@/theme';

const scenarioRepository = new InMemoryScenarioRepository();
const getScenarios = new GetScenarios(scenarioRepository);

export default function SimuladorScreen() {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadScenarios();
  }, []);

  async function loadScenarios() {
    try {
      const data = await getScenarios.execute();
      setScenarios(data.filter((scenario) => scenario.active));
    } finally {
      setLoading(false);
    }
  }

  function getDifficultyLabel(
    difficulty: Scenario['difficulty']
  ) {
    switch (difficulty) {
      case 'facil':
        return 'Fácil';
      case 'medio':
        return 'Medio';
      case 'dificil':
        return 'Difícil';
    }
  }

  function getDifficultyColor(
    difficulty: Scenario['difficulty']
  ) {
    switch (difficulty) {
      case 'facil':
        return colors.success;
      case 'medio':
        return colors.warning;
      case 'dificil':
        return colors.danger;
    }
  }

  function getTimeLabel(seconds: number) {
    const minutes = Math.ceil(seconds / 60);

    return `${minutes} min`;
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
          <Text style={styles.title}>Simulador</Text>

          <Text style={styles.subtitle}>
            Pon a prueba tus decisiones frente a diferentes situaciones de
            emergencia.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>
            ¿Cómo funciona?
          </Text>

          <Text style={styles.infoText}>
            Lee cada situación, analiza las opciones y toma una decisión.
            Tus respuestas tendrán consecuencias y al finalizar recibirás
            una evaluación.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          Escenarios disponibles
        </Text>

        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator
              size="large"
              color={colors.primary}
            />

            <Text style={styles.loadingText}>
              Cargando escenarios...
            </Text>
          </View>
        ) : scenarios.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>
              No hay escenarios disponibles
            </Text>

            <Text style={styles.emptyText}>
              Actualmente no existen simulaciones activas.
            </Text>
          </View>
        ) : (
          scenarios.map((scenario) => (
            <Pressable
              key={scenario.id}
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
              onPress={() =>
                router.push({
                  pathname: '/simulador/[id]/index',
                  params: {
                    id: scenario.id.toString(),
                  },
                })
              }
            >
              <View style={styles.cardHeader}>
                <View style={styles.simulatorIcon}>
                  <Text style={styles.simulatorIconText}>
                    ?
                  </Text>
                </View>

                <View style={styles.cardHeaderText}>
                  <Text style={styles.cardTitle}>
                    {scenario.title}
                  </Text>

                  <View style={styles.metaRow}>
                    <View
                      style={[
                        styles.badge,
                        {
                          backgroundColor: getDifficultyColor(
                            scenario.difficulty
                          ),
                        },
                      ]}
                    >
                      <Text style={styles.badgeText}>
                        {getDifficultyLabel(
                          scenario.difficulty
                        )}
                      </Text>
                    </View>

                    <Text style={styles.time}>
                      ⏱ {getTimeLabel(scenario.estimatedTime)}
                    </Text>
                  </View>
                </View>
              </View>

              <Text style={styles.description}>
                {scenario.description}
              </Text>

              <View style={styles.cardFooter}>
                {scenario.requiresEmergencyCall ? (
                  <Text style={styles.callRequired}>
                    ☎ Incluye llamada simulada
                  </Text>
                ) : (
                  <Text style={styles.noCall}>
                    Simulación sin llamada
                  </Text>
                )}

                <Text style={styles.arrow}>›</Text>
              </View>
            </Pressable>
          ))
        )}

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

  back: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '700',
    marginBottom: spacing.lg,
  },

  header: {
    marginBottom: spacing.lg,
  },

  title: {
    ...typography.title,
    color: colors.text,
  },

  subtitle: {
    marginTop: spacing.sm,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
  },

  infoCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 18,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    marginBottom: spacing.xl,
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

  sectionTitle: {
    ...typography.sectionTitle,
    color: colors.text,
    marginBottom: spacing.md,
  },

  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },

  loadingText: {
    marginTop: spacing.md,
    fontSize: 14,
    color: colors.textSecondary,
  },

  empty: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
  },

  emptyText: {
    marginTop: spacing.sm,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },

  cardPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.99 }],
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  simulatorIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  simulatorIconText: {
    fontSize: 25,
    fontWeight: '900',
    color: colors.white,
  },

  cardHeaderText: {
    flex: 1,
    marginLeft: spacing.md,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },

  badge: {
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },

  badgeText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '800',
  },

  time: {
    marginLeft: spacing.sm,
    fontSize: 12,
    color: colors.textSecondary,
  },

  description: {
    marginTop: spacing.md,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
  },

  cardFooter: {
    marginTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  callRequired: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.secondary,
  },

  noCall: {
    fontSize: 12,
    color: colors.textLight,
  },

  arrow: {
    fontSize: 30,
    lineHeight: 30,
    color: colors.primary,
    fontWeight: '300',
  },

  warning: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: 16,
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FED7AA',
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
    color: '#7C2D12',
  },
});