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

import { GetEmergencies } from '@/domain/useCases';
import { InMemoryEmergencyRepository } from '@/data/repositories';
import type { Emergency } from '@/domain/models';
import { colors, spacing, typography } from '@/theme';

const emergencyRepository = new InMemoryEmergencyRepository();
const getEmergencies = new GetEmergencies(emergencyRepository);

export default function GuiaScreen() {
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmergencies();
  }, []);

  async function loadEmergencies() {
    try {
      const data = await getEmergencies.execute();
      setEmergencies(data);
    } finally {
      setLoading(false);
    }
  }

  function getRiskLabel(riskLevel: Emergency['riskLevel']) {
    switch (riskLevel) {
      case 'bajo':
        return 'Riesgo bajo';
      case 'medio':
        return 'Riesgo medio';
      case 'alto':
        return 'Riesgo alto';
      case 'critico':
        return 'Riesgo crítico';
    }
  }

  function getRiskColor(riskLevel: Emergency['riskLevel']) {
    switch (riskLevel) {
      case 'bajo':
        return colors.success;
      case 'medio':
        return colors.warning;
      case 'alto':
        return '#EA580C';
      case 'critico':
        return colors.danger;
    }
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

        <Text style={styles.title}>Guía de emergencias</Text>

        <Text style={styles.subtitle}>
          Selecciona una situación para conocer qué hacer, qué evitar y cuándo
          solicitar ayuda profesional.
        </Text>

        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>
              Cargando emergencias...
            </Text>
          </View>
        ) : emergencies.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>
              No hay emergencias disponibles
            </Text>

            <Text style={styles.emptyText}>
              No se encontraron contenidos de guía disponibles.
            </Text>
          </View>
        ) : (
          emergencies
            .filter((emergency) => emergency.active)
            .map((emergency) => (
              <Pressable
                key={emergency.id}
                style={({ pressed }) => [
                  styles.card,
                  pressed && styles.cardPressed,
                ]}
                onPress={() => router.push({ pathname: '/guia/[id]', params: { id: emergency.id.toString() } })}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.icon}>+</Text>
                  </View>

                  <View style={styles.cardHeaderText}>
                    <Text style={styles.cardTitle}>
                      {emergency.name}
                    </Text>

                    <Text style={styles.category}>
                      {emergency.category}
                    </Text>
                  </View>
                </View>

                <Text style={styles.description}>
                  {emergency.description}
                </Text>

                <View style={styles.cardFooter}>
                  <View
                    style={[
                      styles.riskBadge,
                      {
                        backgroundColor: getRiskColor(emergency.riskLevel),
                      },
                    ]}
                  >
                    <Text style={styles.riskText}>
                      {getRiskLabel(emergency.riskLevel)}
                    </Text>
                  </View>

                  <Text style={styles.arrow}>›</Text>
                </View>
              </Pressable>
            ))
        )}

        <View style={styles.warning}>
          <Text style={styles.warningTitle}>
            ⚠ Importante
          </Text>

          <Text style={styles.warningText}>
            Esta guía tiene fines educativos. En una emergencia real,
            prioriza la seguridad de la escena y solicita asistencia
            profesional cuando sea necesario.
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

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.white,
  },

  cardHeaderText: {
    flex: 1,
    marginLeft: spacing.md,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },

  category: {
    marginTop: 3,
    fontSize: 13,
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

  riskBadge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  riskText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.white,
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
