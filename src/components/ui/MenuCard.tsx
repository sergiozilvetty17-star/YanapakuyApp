import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors, spacing, typography } from '@/theme';

interface MenuCardProps {
  icon: string;
  title: string;
  description: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'neutral';
}

export function MenuCard({
  icon,
  title,
  description,
  onPress,
  variant = 'neutral',
}: MenuCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          variant === 'primary' && styles.primaryIcon,
          variant === 'secondary' && styles.secondaryIcon,
          variant === 'danger' && styles.dangerIcon,
        ]}
      >
        <Text style={styles.icon}>{icon}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.description}>
          {description}
        </Text>
      </View>

      <Text style={styles.arrow}>→</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing.md,
    marginBottom: spacing.md,

    borderWidth: 1,
    borderColor: colors.border,

    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 3,
  },

  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryIcon: {
    backgroundColor: '#FEE2E2',
  },

  secondaryIcon: {
    backgroundColor: '#CCFBF1',
  },

  dangerIcon: {
    backgroundColor: '#FEE2E2',
  },

  icon: {
    fontSize: 28,
  },

  content: {
    flex: 1,
    marginLeft: spacing.md,
    marginRight: spacing.sm,
  },

  title: {
    ...typography.sectionTitle,
    fontSize: 17,
    color: colors.text,
  },

  description: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSecondary,
  },

  arrow: {
    fontSize: 30,
    color: colors.textLight,
  },
});
