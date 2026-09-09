import { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { GetEmergencyGuide } from '@/domain/useCases';
import { InMemoryGuideRepository } from '@/data/repositories';
import { guideMedia } from '@/data/guideMedia';
import { colors, spacing, typography } from '@/theme';
import type { Guide, GuideStep } from '@/domain/models';

export default function GuideDetailScreen() {
  const router = useRouter();

  const { width } = useWindowDimensions();

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const [guide, setGuide] = useState<Guide | null>(null);
  const [steps, setSteps] = useState<GuideStep[]>([]);
  const [loading, setLoading] = useState(true);

  /*
   * ==========================================================
   * TIPOGRAFÍA RESPONSIVE
   * ==========================================================
   *
   * Ajustamos ligeramente los tamaños según el ancho
   * disponible del dispositivo.
   */

  const isSmallScreen = width < 360;
  const isLargeScreen = width >= 600;

  const titleSize = isSmallScreen
    ? 25
    : isLargeScreen
      ? 32
      : 28;

  const sectionTitleSize = isSmallScreen
    ? 19
    : isLargeScreen
      ? 23
      : 21;

  const bodySize = isSmallScreen
    ? 15
    : isLargeScreen
      ? 18
      : 16;

  const bodyLineHeight = isSmallScreen
    ? 21
    : isLargeScreen
      ? 26
      : 23;

  const stepTitleSize = isSmallScreen
    ? 17
    : isLargeScreen
      ? 21
      : 19;

  useEffect(() => {
    const loadGuide = async () => {
      try {
        setLoading(true);

        const repository =
          new InMemoryGuideRepository();

        const useCase =
          new GetEmergencyGuide(repository);

        const result =
          await useCase.execute(Number(id));

        if (result) {
          setGuide(result.guide);

          setSteps(
            [...result.steps].sort(
              (a, b) => a.order - b.order
            )
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadGuide();
  }, [id]);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/guia');
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>
          Cargando guía...
        </Text>
      </View>
    );
  }

  if (!guide) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>
          Guía no encontrada
        </Text>

        <Text
          style={styles.backLink}
          onPress={handleBack}
        >
          Volver a la guía
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* =====================================================
            VOLVER
            ===================================================== */}

        <Text
          style={styles.backLink}
          onPress={handleBack}
        >
          ← Volver
        </Text>

        {/* =====================================================
            ENCABEZADO
            ===================================================== */}

        <View style={styles.header}>
          <Text
            style={[
              styles.title,
              {
                fontSize: titleSize,
              },
            ]}
          >
            {guide.title}
          </Text>

          <Text
            style={[
              styles.summary,
              {
                fontSize: bodySize,
                lineHeight: bodyLineHeight,
              },
            ]}
          >
            {guide.summary}
          </Text>
        </View>

        {/* =====================================================
            SEÑALES DE ALERTA
            ===================================================== */}

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                fontSize: sectionTitleSize,
              },
            ]}
          >
            🚨 Señales de alerta
          </Text>

          <View style={styles.alertCard}>
            {guide.warningSigns.map(
              (warning, index) => (
                <View
                  key={`${warning}-${index}`}
                  style={styles.bulletRow}
                >
                  <Text style={styles.alertBullet}>
                    !
                  </Text>

                  <Text
                    style={[
                      styles.bulletText,
                      {
                        fontSize: bodySize,
                        lineHeight: bodyLineHeight,
                      },
                    ]}
                  >
                    {warning}
                  </Text>
                </View>
              )
            )}
          </View>
        </View>

        {/* =====================================================
            QUÉ HACER
            ===================================================== */}

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                fontSize: sectionTitleSize,
              },
            ]}
          >
            ✅ Qué hacer
          </Text>

          <View style={styles.infoCard}>
            {guide.whatToDo.map(
              (item, index) => (
                <View
                  key={`${item}-${index}`}
                  style={styles.bulletRow}
                >
                  <Text style={styles.number}>
                    {index + 1}
                  </Text>

                  <Text
                    style={[
                      styles.bulletText,
                      {
                        fontSize: bodySize,
                        lineHeight: bodyLineHeight,
                      },
                    ]}
                  >
                    {item}
                  </Text>
                </View>
              )
            )}
          </View>
        </View>

        {/* =====================================================
            QUÉ NO HACER
            ===================================================== */}

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                fontSize: sectionTitleSize,
              },
            ]}
          >
            ❌ Qué NO hacer
          </Text>

          <View style={styles.dangerCard}>
            {guide.whatNotToDo.map(
              (item, index) => (
                <View
                  key={`${item}-${index}`}
                  style={styles.bulletRow}
                >
                  <Text style={styles.dangerBullet}>
                    ×
                  </Text>

                  <Text
                    style={[
                      styles.bulletText,
                      {
                        fontSize: bodySize,
                        lineHeight: bodyLineHeight,
                      },
                    ]}
                  >
                    {item}
                  </Text>
                </View>
              )
            )}
          </View>
        </View>

        {/* =====================================================
            CUÁNDO LLAMAR
            ===================================================== */}

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                fontSize: sectionTitleSize,
              },
            ]}
          >
            📞 Cuándo llamar a emergencias
          </Text>

          <View style={styles.callCard}>
            <Text
              style={[
                styles.callText,
                {
                  fontSize: bodySize,
                  lineHeight: bodyLineHeight,
                },
              ]}
            >
              {guide.whenToCall}
            </Text>
          </View>
        </View>

        {/* =====================================================
            PASOS DE ACTUACIÓN
            ===================================================== */}

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                fontSize: sectionTitleSize,
              },
            ]}
          >
            🩺 Pasos de actuación
          </Text>

          {steps.map((step) => {
            const media =
              step.mediaKey
                ? guideMedia[step.mediaKey]
                : undefined;

            return (
              <View
                key={step.id}
                style={styles.stepCard}
              >
                {/* =================================================
                    CABECERA DEL PASO
                    ================================================= */}

                <View style={styles.stepHeader}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>
                      {step.order}
                    </Text>
                  </View>

                  <View
                    style={styles.stepTitleContainer}
                  >
                    <Text
                      style={[
                        styles.stepTitle,
                        {
                          fontSize: stepTitleSize,
                        },
                      ]}
                    >
                      {step.title}
                    </Text>

                    {step.important && (
                      <View
                        style={styles.importantBadge}
                      >
                        <Text
                          style={
                            styles.importantBadgeText
                          }
                        >
                          IMPORTANTE
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                {/* =================================================
                    IMAGEN
                    ================================================= */}

                {media && (
                  <Image
                    source={media}
                    style={styles.stepImage}
                    resizeMode="cover"
                  />
                )}

                {/* =================================================
                    DESCRIPCIÓN
                    ================================================= */}

                <Text
                  style={[
                    styles.stepDescription,
                    {
                      fontSize: bodySize,
                      lineHeight: bodyLineHeight,
                    },
                  ]}
                >
                  {step.description}
                </Text>
              </View>
            );
          })}
        </View>

        {/* =====================================================
            ADVERTENCIA EDUCATIVA
            ===================================================== */}

        <View style={styles.warningCard}>
          <Text
            style={[
              styles.warningTitle,
              {
                fontSize: sectionTitleSize,
              },
            ]}
          >
            ⚠️ Importante
          </Text>

          <Text
            style={[
              styles.warningText,
              {
                fontSize: bodySize,
                lineHeight: bodyLineHeight,
              },
            ]}
          >
            Esta guía tiene fines educativos y no
            sustituye la capacitación en primeros
            auxilios ni la evaluación de un profesional.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: spacing.lg,
  },

  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
  },

  errorTitle: {
    ...typography.sectionTitle,
    color: colors.text,
    marginBottom: spacing.md,
  },

  backLink: {
    ...typography.button,
    color: colors.primary,
    marginBottom: spacing.lg,
  },

  header: {
    marginBottom: spacing.xl,
  },

  title: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.md,
    flexShrink: 1,
  },

  summary: {
    ...typography.body,
    color: colors.textSecondary,
    flexShrink: 1,
  },

  section: {
    marginBottom: spacing.xl,
  },

  sectionTitle: {
    ...typography.sectionTitle,
    color: colors.text,
    marginBottom: spacing.md,
    flexShrink: 1,
  },

  alertCard: {
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FED7AA',
    borderRadius: 16,
    padding: spacing.md,
  },

  infoCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: spacing.md,
  },

  dangerCard: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 16,
    padding: spacing.md,
  },

  callCard: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: spacing.lg,
  },

  callText: {
    ...typography.body,
    color: colors.white,
    flexShrink: 1,
  },

  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },

  alertBullet: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.accent,
    color: colors.white,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '700',
    marginRight: spacing.sm,
  },

  number: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.secondary,
    color: colors.white,
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: '700',
    marginRight: spacing.sm,
  },

  dangerBullet: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.danger,
    color: colors.white,
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 18,
    fontWeight: '700',
    marginRight: spacing.sm,
  },

  bulletText: {
    ...typography.body,
    flex: 1,
    color: colors.text,
    flexShrink: 1,
  },

  stepCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: spacing.md,
    marginBottom: spacing.md,
  },

  stepHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },

  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    flexShrink: 0,
  },

  stepNumberText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '800',
  },

  stepTitleContainer: {
    flex: 1,
    minWidth: 0,
  },

  stepTitle: {
    ...typography.sectionTitle,
    color: colors.text,
    marginBottom: spacing.xs,
    flexShrink: 1,
  },

  importantBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },

  importantBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.warning,
  },

  stepImage: {
    width: '75%',
    height: "75%",
    aspectRatio: 1,
    alignSelf: 'center',
    borderRadius: 12,
    backgroundColor: colors.background,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },

  stepDescription: {
    ...typography.body,
    color: colors.textSecondary,
    flexShrink: 1,
  },

  warningCard: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 16,
    padding: spacing.lg,
    marginTop: spacing.md,
  },

  warningTitle: {
    ...typography.sectionTitle,
    color: colors.warning,
    marginBottom: spacing.sm,
    flexShrink: 1,
  },

  warningText: {
    ...typography.body,
    color: colors.textSecondary,
    flexShrink: 1,
  },
});