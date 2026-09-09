import { router } from 'expo-router';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { MenuCard } from '@/components/ui/MenuCard';
import { colors, spacing, typography } from '@/theme';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Encabezado */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>✚</Text>
          </View>

          <View style={styles.headerText}>
            <Text style={styles.appName}>
              YANAPAKUYAPP
            </Text>

            <Text style={styles.tagline}>
              Aprende. Practica. Actúa.
            </Text>
          </View>
        </View>

        {/* Presentación */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            ¿Sabrías qué hacer ante una emergencia?
          </Text>

          <Text style={styles.heroText}>
            Aprende primeros auxilios y practica tus
            decisiones mediante situaciones simuladas.
          </Text>
        </View>

        {/* Menú */}
        <Text style={styles.sectionTitle}>
          ¿Qué quieres hacer?
        </Text>

        <MenuCard
          icon="▣"
          title="Guía de emergencias"
          description="Aprende qué hacer y qué evitar ante diferentes situaciones."
          variant="primary"
          onPress={() => router.push('/guia')}
        />

        <MenuCard
          icon="▶"
          title="Simulador"
          description="Enfrenta situaciones de emergencia y toma decisiones."
          variant="secondary"
          onPress={() => router.push('/simulador')}
        />

        <MenuCard
          icon="☎"
          title="Servicios de emergencia"
          description="Consulta los servicios disponibles y realiza llamadas reales."
          variant="danger"
          onPress={() => router.push('/emergencias')}
        />

        <MenuCard
          icon="ⓘ"
          title="Información"
          description="Conoce el propósito y funcionamiento de YanapakuyApp."
          onPress={() => router.push('/informacion')}
        />

        {/* Advertencia */}
        <View style={styles.warning}>
          <Text style={styles.warningTitle}>
            ⚠ Importante
          </Text>

          <Text style={styles.warningText}>
            YanapakuyApp es una herramienta educativa y
            de simulación. Ante una emergencia real,
            solicita asistencia profesional.
          </Text>
        </View>

        <Text style={styles.version}>
          YanapakuyApp · Versión 1.0
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

  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  logoContainer: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    color: colors.white,
    fontSize: 32,
    fontWeight: '700',
  },

  headerText: {
    marginLeft: spacing.md,
  },

  appName: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 1,
    color: colors.text,
  },

  tagline: {
    marginTop: 3,
    fontSize: 13,
    color: colors.textSecondary,
  },

  hero: {
    backgroundColor: colors.primary,
    borderRadius: 22,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },

  heroTitle: {
    ...typography.title,
    fontSize: 24,
    lineHeight: 31,
    color: colors.white,
  },

  heroText: {
    marginTop: spacing.sm,
    fontSize: 15,
    lineHeight: 22,
    color: '#FEE2E2',
  },

  sectionTitle: {
    ...typography.sectionTitle,
    color: colors.text,
    marginBottom: spacing.md,
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
    fontWeight: '700',
    color: colors.warning,
  },

  warningText: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 19,
    color: '#7C2D12',
  },

  version: {
    marginTop: spacing.lg,
    textAlign: 'center',
    fontSize: 12,
    color: colors.textLight,
  },
});
