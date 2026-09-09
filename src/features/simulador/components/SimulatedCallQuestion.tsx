import { Pressable, StyleSheet, Text, View } from 'react-native';

import type {
  SimulatedCallOption,
} from '@/domain/models';

import {
  colors,
  spacing,
  typography,
} from '@/theme';

interface SimulatedCallQuestionProps {
  prompt: string;
  options: SimulatedCallOption[];
  selectedOptionId: number | null;
  onSelect: (optionId: number) => void;
  disabled?: boolean;
}

export function SimulatedCallQuestion({
  prompt,
  options,
  selectedOptionId,
  onSelect,
  disabled = false,
}: SimulatedCallQuestionProps) {
  const selectedOption =
    options.find(
      (option) =>
        option.id === selectedOptionId
    ) ?? null;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Información solicitada
      </Text>

      <Text style={styles.prompt}>
        {prompt}
      </Text>

      <View style={styles.options}>
        {options.map((option) => {
          const selected =
            option.id === selectedOptionId;

          const showResult =
            selectedOptionId !== null;

          return (
            <Pressable
              key={option.id}
              onPress={() =>
                onSelect(option.id)
              }
              disabled={
                disabled ||
                selectedOptionId !== null
              }
              style={({ pressed }) => [
                styles.option,
                selected &&
                  option.correct &&
                  styles.optionCorrect,
                selected &&
                  !option.correct &&
                  styles.optionIncorrect,
                pressed &&
                  !showResult &&
                  styles.optionPressed,
              ]}
            >
              <View style={styles.optionContent}>
                <View
                  style={[
                    styles.optionIndicator,
                    selected &&
                      option.correct &&
                      styles.indicatorCorrect,
                    selected &&
                      !option.correct &&
                      styles.indicatorIncorrect,
                  ]}
                >
                  <Text
                    style={styles.optionIndicatorText}
                  >
                    {String.fromCharCode(
                      65 +
                        options.indexOf(
                          option
                        )
                    )}
                  </Text>
                </View>

                <Text style={styles.optionText}>
                  {option.text}
                </Text>

                {selected && (
                  <Text
                    style={[
                      styles.resultIcon,
                      option.correct
                        ? styles.correctText
                        : styles.incorrectText,
                    ]}
                  >
                    {option.correct
                      ? '✓'
                      : '✕'}
                  </Text>
                )}
              </View>
            </Pressable>
          );
        })}
      </View>

      {selectedOption && (
        <View
          style={[
            styles.feedback,
            selectedOption.correct
              ? styles.feedbackCorrect
              : styles.feedbackIncorrect,
          ]}
        >
          <Text
            style={[
              styles.feedbackTitle,
              selectedOption.correct
                ? styles.correctText
                : styles.incorrectText,
            ]}
          >
            {selectedOption.correct
              ? `✓ Respuesta correcta  +${selectedOption.points} puntos`
              : '✕ Respuesta incorrecta'}
          </Text>

          <Text style={styles.feedbackText}>
            {selectedOption.feedback}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.lg,
  },

  label: {
    fontSize: typography.small.fontSize,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },

  prompt: {
    fontSize: typography.sectionTitle.fontSize,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },

  options: {
    gap: spacing.sm,
  },

  option: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.surface,
    padding: spacing.md,
  },

  optionPressed: {
    opacity: 0.7,
  },

  optionCorrect: {
    borderColor: colors.success,
    backgroundColor: '#F0FDF4',
  },

  optionIncorrect: {
    borderColor: colors.danger,
    backgroundColor: '#FEF2F2',
  },

  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  optionIndicator: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    marginRight: spacing.sm,
  },

  indicatorCorrect: {
    backgroundColor: colors.success,
  },

  indicatorIncorrect: {
    backgroundColor: colors.danger,
  },

  optionIndicatorText: {
    fontSize: typography.button.fontSize,
    fontWeight: '700',
    color: colors.text,
  },

  optionText: {
    flex: 1,
    fontSize: typography.body.fontSize,
    color: colors.text,
    lineHeight: 22,
  },

  resultIcon: {
    fontSize: 22,
    fontWeight: '700',
    marginLeft: spacing.sm,
  },

  correctText: {
    color: colors.success,
  },

  incorrectText: {
    color: colors.danger,
  },

  feedback: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
  },

  feedbackCorrect: {
    borderColor: colors.success,
    backgroundColor: '#F0FDF4',
  },

  feedbackIncorrect: {
    borderColor: colors.danger,
    backgroundColor: '#FEF2F2',
  },

  feedbackTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },

  feedbackText: {
    fontSize: typography.small.fontSize,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});