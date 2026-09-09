import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '@/theme';

interface SimulatedCallPanelProps {
  operatorName: string;
  message: string;
  currentStep: number;
  totalSteps: number;
  completed: boolean;
}

export function SimulatedCallPanel({
  operatorName,
  message,
  currentStep,
  totalSteps,
  completed,
}: SimulatedCallPanelProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>☎</Text>

        <View style={styles.headerText}>
          <Text style={styles.title}>Llamada simulada</Text>
          <Text style={styles.operator}>{operatorName}</Text>
        </View>
      </View>

      <View style={styles.separator} />

      <View style={styles.messageContainer}>
        <Text style={styles.messageLabel}>Operador</Text>
        <Text style={styles.message}>{message}</Text>
      </View>

      {!completed && (
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Información {Math.min(currentStep + 1, totalSteps)} de {totalSteps}
          </Text>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progress,
                {
                  width: `${Math.min(
                    ((currentStep + 1) / totalSteps) * 100,
                    100
                  )}%`,
                },
              ]}
            />
          </View>
        </View>
      )}

      {completed && (
        <View style={styles.completedContainer}>
          <Text style={styles.completedTitle}>
            Llamada completada
          </Text>

          <Text style={styles.completedText}>
            La información necesaria fue proporcionada correctamente.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    fontSize: 32,
    marginRight: spacing.md,
  },

  headerText: {
    flex: 1,
  },

  title: {
    ...typography.sectionTitle,
    color: colors.text,
  },

  operator: {
    ...typography.small,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },

  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },

  messageContainer: {
    marginBottom: spacing.md,
  },

  messageLabel: {
    ...typography.small,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },

  message: {
    ...typography.body,
    color: colors.text,
    lineHeight: 24,
  },

  progressContainer: {
    marginTop: spacing.sm,
  },

  progressText: {
    ...typography.small,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },

  progressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },

  progress: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },

  completedContainer: {
    marginTop: spacing.sm,
    padding: spacing.md,
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
  },

  completedTitle: {
    ...typography.button,
    color: colors.success,
  },

  completedText: {
    ...typography.small,
    color: colors.text,
    marginTop: spacing.xs,
  },
});