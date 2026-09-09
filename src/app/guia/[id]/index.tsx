import { router, useLocalSearchParams } from 'expo-router';
import {
  ActivityIndicator,
  Image,
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
import { guideMedia } from '@/data/guideMedia';

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
          <ActivityIndicator
            size="large"
            color={colors.primary}
          />

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
          <Text style={styles.notFoundIcon}>
            !
          </Text>

          <Text style={styles.notFoundTitle}>
            Guía no encontrada
          </Text>

          <Text style={styles.notFoundText}>
            No existe una guía disponible para esta emergencia.
          </Text>

          <Pressable
            style={styles.primaryButton}
            onPress={() =>
              router.canGoBack()
                ? router.back()
                : router.replace('/')
            }
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
        {/* BOTÓN VOLVER */}
        <Pressable
          onPress={() =>
            router.canGoBack()
              ? router.back()
              : router.replace('/')
          }
        >
          <Text style={styles.back}>
            ‹ Volver
          </Text>
        </Pressable>

        {/* ENCABEZADO */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>
              +
            </Text>
          </View>

          <Text style={styles.title}>
            {guide.title}
          </Text>

          <Text style={styles.summary}>
            {guide.summary}
          </Text>
        </View>

        {/* QUÉ HACER */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Qué hacer
          </Text>

          {guide.whatToDo.map((item, index) => (
            <View
              key={`todo-${index}`}
              style={styles.item}
            >
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

        {/* QUÉ NO HACER */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Qué NO hacer
          </Text>

          {guide.whatNotToDo.map((item, index) => (
            <View
              key={`not-${index}`}
              style={styles.notItem}
            >
              <Text style={styles.notIcon}>
                ×
              </Text>

              <Text style={styles.itemText}>
                {item}
              </Text>
            </View>
          ))}
        </View>

        {/* CUÁNDO LLAMAR */}
        <View style={styles.callCard}>
          <Text style={styles.callTitle}>
            ☎ Cuándo llamar
          </Text>

          <Text style={styles.callText}>
            {guide.whenToCall}
          </Text>
        </View>

        {/* PASOS */}
        {steps.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Pasos de la guía
            </Text>

            {steps
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((step) => (
                <View
                  key={step.id}
                  style={styles.stepCard}
                >
                  {/* CABECERA DEL PASO */}
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

                  {/* IMAGEN DEL PASO */}
                  {guideMedia[step.id] && (
                    <View style={styles.imageContainer}>
                      <Image
                        source={guideMedia[step.id]}
                        style={styles.stepImage}
                        resizeMode="contain"
                      />
                    </View>
                  )}

                  {/* DESCRIPCIÓN */}
                  <Text style={styles.stepDescription}>
                    {step.description}
                  </Text>

                  {/* IMPORTANTE */}
                  {step.important && (
                    <View style={styles.importantBadge}>
                      <Text style={styles.importantIcon}>
                        !
                      </Text>

                      <Text style={styles.importantText}>
                        Importante
                      </Text>
                    </View>
                  )}
                </View>
              ))}
          </View>
        )}

        {/* ADVERTENCIA FINAL */}
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

  /* =========================
     ENCABEZADO
     ========================= */

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

  /* =========================
     SECCIONES
     ========================= */

  section: {
    marginTop: spacing.lg,
  },

  sectionTitle: {
    ...typography.sectionTitle,
    color: colors.text,
    marginBottom: spacing.md,
  },

  /* =========================
     QUÉ HACER
     ========================= */

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

  /* =========================
     QUÉ NO HACER
     ========================= */

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

  /* =========================
     CUÁNDO LLAMAR
     ========================= */

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

  /* =========================
     TARJETA DE PASO
     ========================= */

  stepCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },

  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  stepNumber: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },

  stepNumberText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '800',
  },

  stepTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
  },

  /* =========================
     IMAGEN
     ========================= */

  imageContainer: {
    width: '100%',
    height: 230,
    marginTop: spacing.md,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  stepImage: {
    width: '100%',
    height: '100%',
  },

  /* =========================
     DESCRIPCIÓN
     ========================= */

  stepDescription: {
    marginTop: spacing.md,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
  },

  /* =========================
     IMPORTANTE
     ========================= */

  importantBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: '#FEF3C7',
  },

  importantIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    textAlign: 'center',
    lineHeight: 18,
    marginRight: 6,
    backgroundColor: '#F59E0B',
    color: colors.white,
    fontSize: 11,
    fontWeight: '900',
  },

  importantText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#92400E',
  },

  /* =========================
     ADVERTENCIA
     ========================= */

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

  /* =========================
     NO ENCONTRADO
     ========================= */

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