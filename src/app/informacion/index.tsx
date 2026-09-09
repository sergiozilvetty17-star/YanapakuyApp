import { router } from 'expo-router';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';

import { colors, spacing, typography } from '@/theme';

export default function InformacionScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={() => router.canGoBack() ? router.back() : router.replace('/')}>
          <Text style={styles.back}>‹ Volver</Text>
        </Pressable>

        <Text style={styles.title}>Información</Text>

        <Text style={styles.subtitle}>
          Conoce el propósito y funcionamiento de YanapakuyApp.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>¿Qué es YanapakuyApp?</Text>
          <Text style={styles.cardText}>
            YanapakuyApp es una aplicación educativa diseñada para enseñar
            conceptos básicos de primeros auxilios mediante guías y situaciones
            simuladas.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Aprende</Text>
          <Text style={styles.cardText}>
            Consulta información organizada sobre diferentes emergencias,
            acciones recomendadas y acciones que deben evitarse.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Practica</Text>
          <Text style={styles.cardText}>
            Utiliza el simulador para enfrentarte a situaciones hipotéticas
            y tomar decisiones.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Actúa</Text>
          <Text style={styles.cardText}>
            En una emergencia real, busca asistencia profesional y utiliza
            los servicios de emergencia correspondientes.
          </Text>
        </View>

        <View style={styles.warning}>
          <Text style={styles.warningTitle}>⚠ Aviso educativo</Text>
          <Text style={styles.warningText}>
            YanapakuyApp no sustituye la capacitación profesional en primeros
            auxilios ni la atención de personal médico o de emergencia.
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
  back: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '700',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  subtitle: {
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  cardText: {
    marginTop: spacing.sm,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
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
