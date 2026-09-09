import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import {
  AlertIcon,
  GuideIcon,
  InfoIcon,
  MedicalIcon,
  PhoneIcon,
  SimulatorIcon,
} from '@/components/ui/icons';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

type MenuCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  onPress: () => void;
  accent?: 'primary' | 'secondary';
};

function MenuCard({
  icon,
  title,
  description,
  onPress,
  accent = 'primary',
}: MenuCardProps) {
  const accentColor =
    accent === 'secondary' ? colors.secondary : colors.primary;

  return (
    <TouchableOpacity
      style={styles.menuCard}
      onPress={onPress}
      activeOpacity={0.82}
    >
      <View
        style={[
          styles.menuIcon,
          {
            backgroundColor:
              accent === 'secondary'
                ? '#ECFDF5'
                : '#FEF2F2',
          },
        ]}
      >
        {icon}
      </View>

      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{title}</Text>

        <Text style={styles.menuDescription}>
          {description}
        </Text>
      </View>

      <View style={styles.menuArrow}>
        <Text
          style={[
            styles.menuArrowText,
            { color: accentColor },
          ]}
        >
          ›
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const isSmall = width < 360;
  const isLarge = width >= 600;

  const titleSize = isSmall ? 25 : isLarge ? 34 : 30;
  const heroTitleSize = isSmall ? 23 : isLarge ? 30 : 26;
  const bodySize = isSmall ? 14 : isLarge ? 18 : 16;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <View style={styles.brandRow}>
            <View style={styles.logoContainer}>
              <MedicalIcon
                size={32}
                color={colors.white}
                strokeWidth={2}
              />
            </View>

            <View style={styles.brandTextContainer}>
              <Text
                style={[
                  styles.brandName,
                  { fontSize: isSmall ? 19 : 21 },
                ]}
              >
                YANAPAKUYAPP
              </Text>

              <Text style={styles.brandTagline}>
                Aprende. Practica. Actúa.
              </Text>
            </View>
          </View>
        </View>

        {/* HERO */}

        <View style={styles.hero}>
          <View style={styles.heroBadge}>
            <View style={styles.heroBadgeDot} />

            <Text style={styles.heroBadgeText}>
              EDUCACIÓN EN PRIMEROS AUXILIOS
            </Text>
          </View>

          <Text
            style={[
              styles.heroTitle,
              { fontSize: heroTitleSize },
            ]}
          >
            ¿Sabrías qué hacer ante una emergencia?
          </Text>

          <Text
            style={[
              styles.heroDescription,
              { fontSize: bodySize },
            ]}
          >
            Aprende a reconocer situaciones de emergencia,
            conoce qué hacer y practica tus decisiones mediante
            simulaciones interactivas.
          </Text>

          <TouchableOpacity
            style={styles.heroButton}
            onPress={() => router.push('/guia')}
            activeOpacity={0.85}
          >
            <GuideIcon
              size={21}
              color={colors.white}
              strokeWidth={2}
            />

            <Text style={styles.heroButtonText}>
              Explorar la guía
            </Text>
          </TouchableOpacity>
        </View>

        {/* QUICK ACCESS */}

        <View style={styles.sectionHeader}>
          <Text
            style={[
              styles.sectionTitle,
              { fontSize: titleSize > 30 ? 23 : 21 },
            ]}
          >
            ¿Qué quieres hacer?
          </Text>

          <Text style={styles.sectionSubtitle}>
            Elige una opción para comenzar.
          </Text>
        </View>

        <MenuCard
          icon={
            <GuideIcon
              size={29}
              color={colors.primary}
              strokeWidth={2}
            />
          }
          title="Guía de emergencias"
          description="Aprende qué hacer y qué evitar ante diferentes situaciones."
          onPress={() => router.push('/guia')}
        />

        <MenuCard
          icon={
            <SimulatorIcon
              size={29}
              color={colors.primary}
              strokeWidth={2}
            />
          }
          title="Simulador"
          description="Pon a prueba tus conocimientos y toma decisiones bajo presión."
          onPress={() => router.push('/simulador')}
        />

        <MenuCard
          icon={
            <PhoneIcon
              size={29}
              color={colors.secondary}
              strokeWidth={2}
            />
          }
          title="Servicios de emergencia"
          description="Accede a números de emergencia para solicitar ayuda real."
          onPress={() => router.push('/emergencias')}
          accent="secondary"
        />

        <MenuCard
          icon={
            <InfoIcon
              size={29}
              color={colors.secondary}
              strokeWidth={2}
            />
          }
          title="Información"
          description="Conoce el propósito de YanapakuyApp y cómo utilizarla."
          onPress={() => router.push('/informacion')}
          accent="secondary"
        />

        {/* SAFETY NOTICE */}

        <View style={styles.notice}>
          <View style={styles.noticeIcon}>
            <AlertIcon
              size={24}
              color={colors.warning}
              strokeWidth={2}
            />
          </View>

          <View style={styles.noticeContent}>
            <Text style={styles.noticeTitle}>
              Aprende antes de actuar
            </Text>

            <Text
              style={[
                styles.noticeText,
                { fontSize: bodySize },
              ]}
            >
              Esta aplicación tiene fines educativos. En una
              emergencia real, prioriza la seguridad de la escena
              y solicita ayuda profesional cuando sea necesario.
            </Text>
          </View>
        </View>

        {/* OFFLINE */}

        <View style={styles.offlineCard}>
          <View style={styles.offlineIndicator} />

          <View style={styles.offlineContent}>
            <Text style={styles.offlineTitle}>
              Contenido disponible sin conexión
            </Text>

            <Text style={styles.offlineText}>
              La guía y los escenarios de práctica están diseñados
              para funcionar sin internet.
            </Text>
          </View>
        </View>

        {/* FOOTER */}

        <View style={styles.footer}>
          <Text style={styles.footerBrand}>
            YANAPAKUYAPP
          </Text>

          <Text style={styles.footerText}>
            Aprende. Practica. Actúa.
          </Text>

          <Text style={styles.version}>
            Versión 1.0
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

  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },

  header: {
    marginBottom: spacing.lg,
  },

  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoContainer: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  brandTextContainer: {
    flex: 1,
    minWidth: 0,
  },

  brandName: {
    color: colors.text,
    fontWeight: '900',
    letterSpacing: 1.2,
  },

  brandTagline: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },

  hero: {
    backgroundColor: colors.primaryDark,
    borderRadius: 26,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    overflow: 'hidden',
  },

  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 11,
    marginBottom: spacing.md,
  },

  heroBadgeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.white,
    marginRight: 7,
  },

  heroBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.7,
  },

  heroTitle: {
    color: colors.white,
    fontWeight: '900',
    lineHeight: 34,
    marginBottom: spacing.sm,
    flexShrink: 1,
  },

  heroDescription: {
    color: '#FEE2E2',
    lineHeight: 24,
    marginBottom: spacing.lg,
    flexShrink: 1,
  },

  heroButton: {
    minHeight: 52,
    borderRadius: 15,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },

  heroButtonText: {
    color: colors.primaryDark,
    fontSize: 16,
    fontWeight: '800',
    marginLeft: spacing.sm,
  },

  sectionHeader: {
    marginBottom: spacing.md,
  },

  sectionTitle: {
    color: colors.text,
    fontWeight: '900',
    marginBottom: 4,
  },

  sectionSubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
  },

  menuCard: {
    minHeight: 92,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },

  menuIcon: {
    width: 54,
    height: 54,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    flexShrink: 0,
  },

  menuContent: {
    flex: 1,
    minWidth: 0,
  },

  menuTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 4,
    flexShrink: 1,
  },

  menuDescription: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    flexShrink: 1,
  },

  menuArrow: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
    flexShrink: 0,
  },

  menuArrowText: {
    fontSize: 30,
    fontWeight: '400',
    lineHeight: 30,
  },

  notice: {
    flexDirection: 'row',
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 19,
    padding: spacing.md,
    marginTop: spacing.md,
  },

  noticeIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    flexShrink: 0,
  },

  noticeContent: {
    flex: 1,
    minWidth: 0,
  },

  noticeTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },

  noticeText: {
    color: colors.textSecondary,
    lineHeight: 21,
    flexShrink: 1,
  },

  offlineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 17,
    padding: spacing.md,
    marginTop: spacing.md,
  },

  offlineIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.success,
    marginRight: spacing.sm,
    flexShrink: 0,
  },

  offlineContent: {
    flex: 1,
    minWidth: 0,
  },

  offlineTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 2,
  },

  offlineText: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    flexShrink: 1,
  },

  footer: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },

  footerBrand: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },

  footerText: {
    color: colors.textLight,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 3,
  },

  version: {
    color: colors.textLight,
    fontSize: 11,
    marginTop: spacing.sm,
  },
});