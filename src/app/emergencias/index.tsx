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

export default function EmergenciasScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={() => router.canGoBack() ? router.back() : router.replace('/')}>
          <Text style={styles.back}>‹ Volver</Text>
        </Pressable>

        <Text style={styles.title}>Servicios de emergencia</Text>

        <Text style={styles.subtitle}>
          Consulta los servicios disponibles para solicitar ayuda en una emergencia real.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🚑 Ambulancia</Text>
          <Text style={styles.cardText}>
            Servicio de atención médica de emergencia.
          </Text>
          <Text style={styles.realCall}>LLAMADA REAL</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>👮 Policía</Text>
          <Text style={styles.cardText}>
            Servicio de seguridad y atención ante situaciones que requieren intervención policial.
          </Text>
          <Text style={styles.realCall}>LLAMADA REAL</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🚒 Bomberos</Text>
          <Text style={styles.cardText}>
            Atención ante incendios, rescates y otras situaciones de emergencia.
          </Text>
          <Text style={styles.realCall}>LLAMADA REAL</Text>
        </View>

        <View style={styles.warning}>
          <Text style={styles.warningTitle}>⚠ Llamadas reales</Text>
          <Text style={styles.warningText}>
            Las llamadas realizadas desde esta sección pueden comunicarse con servicios
            reales de emergencia. Utilízalas únicamente cuando exista una emergencia real.
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
  realCall: {
    marginTop: spacing.md,
    fontSize: 12,
    fontWeight: '800',
    color: colors.danger,
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
});
