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

import { GetEmergencyGuide } from '@/domain/useCases';
import { InMemoryGuideRepository } from '@/data/repositories';
import type { Guide, GuideStep } from '@/domain/models';
import { colors, spacing, typography } from '@/theme';

const guideRepository = new InMemoryGuideRepository();
const getEmergencyGuide = new GetEmergencyGuide(guideRepository);

export default function GuiaDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const emergencyId = Number(id);

  const [guide, setGuide] = useState<Guide | null>(null);
  const [steps, setSteps] = useState<GuideStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    loadGuide();
  }, [emergencyId]);

  async function loadGuide() {
    setLoading(true);
    setNotFound(false);

    try {
      const result = await getEmergencyGuide.execute(emergencyId);

      if (!result) {
        setNotFound(true);
        return;
      }

      setGuide(result.guide);
      setSteps(result.steps);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.primary} />

          <Text style={styles.loadingText}>
            Cargando guía...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (notFound || !guide) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundIcon}>!</Text>

          <Text style={styles.notFoundTitle}>
            Guía no encontrada
          </Text>

          <Text style={styles.notFoundText}>
            No existe una guía disponible para esta emergencia.
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
            <Text style={styles.icon}>+</Text>
          </View>

          <Text style={styles.title}>
            {guide.title}
          </Text>

          <Text style={styles.summary}>
            {guide.summary}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Qué hacer
          </Text>

          {guide.whatToDo.map((item, index) => (
            <View key={`todo-${index}`} style={styles.item}>
              <View style={styles.number}>
                <Text style={styles.numberText}>
                  {index + 1}
                </Text>
              </View>

              <Text style={styles.itemText}>
                {item}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Qué NO hacer
          </Text>

          {guide.whatNotToDo.map((item, index) => (
            <View key={`not-${index}`} style={styles.notItem}>
              <Text style={styles.notIcon}>
                ×
              </Text>

              <Text style={styles.itemText}>
                {item}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.callCard}>
          <Text style={styles.callTitle}>
            ☎ Cuándo llamar
          </Text>

          <Text style={styles.callText}>
            {guide.whenToCall}
          </Text>
        </View>

        {steps.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Pasos de la guía
            </Text>

            {steps
              .sort((a, b) => a.order - b.order)
              .map((step) => (
                <View key={step.id} style={styles.stepCard}>
                  <View style={styles.stepHeader}>
                    <View style={styles.stepNumber}>
                      <Text style={styles.stepNumberText}>
                        {step.order}
                      </Text>
                    </View>

                    <Text style={styles.stepTitle}>
                      {step.title}
                    </Text>
                  </View>

                  <Text style={styles.stepDescription}>
                    {step.description}
                  </Text>

                  {step.important && (
                    <View style={styles.importantBadge}>
                      <Text style={styles.importantText}>
                        Importante
                      </Text>
                    </View>
                  )}
                </View>
              ))}
          </View>
        )}

        <View style={styles.warning}>
          <Text style={styles.warningTitle}>
            ⚠ Importante
          </Text>

          <Text style={styles.warningText}>
            Esta información tiene fines educativos y no sustituye la
            atención de profesionales de emergencia. Ante una emergencia
            real, solicita ayuda profesional.
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
    fontSize: 14,
    color: colors.textSecondary,
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
    fontWeight: '800',
    color: colors.white,
  },

  title: {
    ...typography.title,
    color: colors.text,
  },

  summary: {
    marginTop: spacing.sm,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
  },

  section: {
    marginTop: spacing.lg,
  },

  sectionTitle: {
    ...typography.sectionTitle,
    color: colors.text,
    marginBottom: spacing.md,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },

  number: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },

  numberText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '800',
  },

  itemText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
    color: colors.text,
  },

  notItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },

  notIcon: {
    fontSize: 24,
    lineHeight: 21,
    color: colors.danger,
    fontWeight: '800',
    marginRight: spacing.sm,
  },

  callCard: {
    marginTop: spacing.lg,
    backgroundColor: '#ECFDF5',
    borderRadius: 18,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },

  callTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.secondary,
  },

  callText: {
    marginTop: spacing.sm,
    fontSize: 14,
    lineHeight: 21,
    color: colors.text,
  },

  stepCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },

  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  stepNumber: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },

  stepNumberText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '800',
  },

  stepTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },

  stepDescription: {
    marginTop: spacing.sm,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
  },

  importantBadge: {
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: '#FEF3C7',
  },

  importantText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#92400E',
  },

  warning: {
    marginTop: spacing.lg,
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

  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },

  notFoundIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.danger,
    color: colors.white,
    textAlign: 'center',
    lineHeight: 64,
    fontSize: 34,
    fontWeight: '800',
  },

  notFoundTitle: {
    marginTop: spacing.lg,
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },

  notFoundText: {
    marginTop: spacing.sm,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
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