import { useState } from 'react';
import {
  Alert,
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
  AmbulanceIcon,
  BackIcon,
  FirefighterIcon,
  MedicalIcon,
  PhoneIcon,
  PoliceIcon,
} from '@/components/ui/icons';
import { emergencyServices } from '@/data/seed/emergencyServices';
import { callEmergencyNumber } from '@/services/phone/emergencyCallService';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

const serviceLabels: Record<string, string> = {
  ambulancia: 'Emergencia médica',
  policia: 'Seguridad',
  bomberos: 'Incendios y rescate',
};

function ServiceIcon({
  type,
  size = 30,
  color = colors.primary,
}: {
  type: string;
  size?: number;
  color?: string;
}) {
  if (type === 'ambulancia') {
    return (
      <AmbulanceIcon
        size={size}
        color={color}
        strokeWidth={2}
      />
    );
  }

  if (type === 'policia') {
    return (
      <PoliceIcon
        size={size}
        color={color}
        strokeWidth={2}
      />
    );
  }

  return (
    <FirefighterIcon
      size={size}
      color={color}
      strokeWidth={2}
    />
  );
}

export default function EmergenciasScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [callingId, setCallingId] = useState<number | null>(null);

  const isSmall = width < 360;
  const isLarge = width >= 600;

  const titleSize = isSmall ? 25 : isLarge ? 32 : 28;
  const bodySize = isSmall ? 14 : isLarge ? 18 : 16;
  const serviceTitleSize = isSmall ? 18 : isLarge ? 22 : 20;

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/');
  };

  const handleCall = (
    service: (typeof emergencyServices)[number]
  ) => {
    Alert.alert(
      'Llamada real',
      `Vas a llamar al servicio de ${service.name} al número ${service.phoneNumber}. Esta acción abrirá el marcador de tu teléfono.`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Llamar',
          style: 'destructive',
          onPress: async () => {
            setCallingId(service.id);

            const success = await callEmergencyNumber(
              service.phoneNumber
            );

            setCallingId(null);

            if (!success) {
              Alert.alert(
                'No se pudo iniciar la llamada',
                'Verifica que tu dispositivo pueda realizar llamadas telefónicas.'
              );
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* BACK */}

        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.8}
        >
          <BackIcon
            size={21}
            color={colors.primary}
            strokeWidth={2.2}
          />

          <Text style={styles.backText}>
            Volver
          </Text>
        </TouchableOpacity>

        {/* HEADER */}

        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <PhoneIcon
              size={29}
              color={colors.white}
              strokeWidth={2}
            />
          </View>

          <Text
            style={[
              styles.title,
              { fontSize: titleSize },
            ]}
          >
            Servicios de emergencia
          </Text>

          <Text
            style={[
              styles.subtitle,
              { fontSize: bodySize },
            ]}
          >
            Contacta rápidamente con servicios profesionales
            cuando una situación requiera ayuda inmediata.
          </Text>
        </View>

        {/* REAL CALL WARNING */}

        <View style={styles.realCallNotice}>
          <View style={styles.noticeIcon}>
            <AlertIcon
              size={22}
              color={colors.danger}
              strokeWidth={2.2}
            />
          </View>

          <View style={styles.noticeContent}>
            <View style={styles.noticeHeader}>
              <Text style={styles.noticeTitle}>
                LLAMADAS REALES
              </Text>

              <View style={styles.realBadge}>
                <Text style={styles.realBadgeText}>
                  REAL
                </Text>
              </View>
            </View>

            <Text
              style={[
                styles.noticeText,
                { fontSize: bodySize - 1 },
              ]}
            >
              Estos botones pueden iniciar una llamada
              telefónica real desde tu dispositivo. Úsalos
              únicamente cuando necesites asistencia.
            </Text>
          </View>
        </View>

        {/* SECTION */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Servicios disponibles
          </Text>

          <Text style={styles.sectionSubtitle}>
            Selecciona el servicio que necesitas.
          </Text>
        </View>

        {/* SERVICES */}

        {emergencyServices
          .filter((service) => service.active)
          .map((service) => {
            const isCalling = callingId === service.id;

            const serviceColor =
              service.type === 'ambulancia'
                ? colors.primary
                : service.type === 'policia'
                  ? colors.secondary
                  : colors.warning;

            const iconBackground =
              service.type === 'ambulancia'
                ? '#FEF2F2'
                : service.type === 'policia'
                  ? '#ECFDF5'
                  : '#FFFBEB';

            return (
              <View
                key={service.id}
                style={styles.serviceCard}
              >
                <View style={styles.serviceHeader}>
                  <View
                    style={[
                      styles.serviceIcon,
                      {
                        backgroundColor:
                          iconBackground,
                      },
                    ]}
                  >
                    <ServiceIcon
                      type={service.type}
                      size={31}
                      color={serviceColor}
                    />
                  </View>

                  <View
                    style={styles.serviceTitleContainer}
                  >
                    <Text
                      style={[
                        styles.serviceName,
                        { fontSize: serviceTitleSize },
                      ]}
                    >
                      {service.name}
                    </Text>

                    <Text style={styles.serviceCategory}>
                      {serviceLabels[service.type]}
                    </Text>
                  </View>
                </View>

                <Text
                  style={[
                    styles.serviceDescription,
                    { fontSize: bodySize },
                  ]}
                >
                  {service.description}
                </Text>

                <View style={styles.phoneContainer}>
                  <View style={styles.phoneInfo}>
                    <Text style={styles.phoneLabel}>
                      Número de emergencia
                    </Text>

                    <Text style={styles.phoneNumber}>
                      {service.phoneNumber}
                    </Text>
                  </View>

                  <View style={styles.phoneIconContainer}>
                    <PhoneIcon
                      size={22}
                      color={serviceColor}
                      strokeWidth={2}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.callButton,
                    {
                      backgroundColor: serviceColor,
                    },
                    isCalling &&
                      styles.callButtonDisabled,
                  ]}
                  onPress={() => handleCall(service)}
                  disabled={isCalling}
                  activeOpacity={0.82}
                >
                  <PhoneIcon
                    size={20}
                    color={colors.white}
                    strokeWidth={2.2}
                  />

                  <Text style={styles.callButtonText}>
                    {isCalling
                      ? 'Abriendo teléfono...'
                      : 'Llamar ahora'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}

        {/* IMPORTANT */}

        <View style={styles.footerNotice}>
          <View style={styles.footerNoticeIcon}>
            <MedicalIcon
              size={23}
              color={colors.secondary}
              strokeWidth={2}
            />
          </View>

          <View style={styles.footerNoticeContent}>
            <Text style={styles.footerTitle}>
              Recuerda
            </Text>

            <Text
              style={[
                styles.footerText,
                { fontSize: bodySize - 1 },
              ]}
            >
              YanapakuyApp es una herramienta educativa y no
              reemplaza la atención de profesionales de
              emergencia o personal médico.
            </Text>
          </View>
        </View>

        {/* PHONE REQUIREMENT */}

        <View style={styles.requirementCard}>
          <View style={styles.requirementIndicator} />

          <Text style={styles.requirementText}>
            Para realizar una llamada necesitas un dispositivo
            con capacidad telefónica y servicio celular.
          </Text>
        </View>

        {/* FOOTER */}

        <View style={styles.footer}>
          <Text style={styles.footerBrand}>
            YANAPAKUYAPP
          </Text>

          <Text style={styles.footerTagline}>
            Aprende. Practica. Actúa.
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

  backButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingRight: spacing.sm,
    marginBottom: spacing.md,
  },

  backText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '800',
    marginLeft: 4,
  },

  header: {
    marginBottom: spacing.lg,
  },

  headerIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },

  title: {
    color: colors.text,
    fontWeight: '900',
    lineHeight: 34,
    marginBottom: spacing.sm,
    flexShrink: 1,
  },

  subtitle: {
    color: colors.textSecondary,
    lineHeight: 24,
    flexShrink: 1,
  },

  realCallNotice: {
    flexDirection: 'row',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 20,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },

  noticeIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    flexShrink: 0,
  },

  noticeContent: {
    flex: 1,
    minWidth: 0,
  },

  noticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 5,
  },

  noticeTitle: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.7,
    marginRight: spacing.sm,
  },

  realBadge: {
    backgroundColor: colors.danger,
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },

  realBadgeText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.6,
  },

  noticeText: {
    color: colors.text,
    lineHeight: 21,
    flexShrink: 1,
  },

  sectionHeader: {
    marginBottom: spacing.md,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '900',
    marginBottom: 4,
  },

  sectionSubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
  },

  serviceCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: spacing.md,
    marginBottom: spacing.md,
  },

  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  serviceIcon: {
    width: 60,
    height: 60,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    flexShrink: 0,
  },

  serviceTitleContainer: {
    flex: 1,
    minWidth: 0,
  },

  serviceName: {
    color: colors.text,
    fontWeight: '900',
    lineHeight: 25,
    flexShrink: 1,
  },

  serviceCategory: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 3,
    flexShrink: 1,
  },

  serviceDescription: {
    color: colors.textSecondary,
    lineHeight: 23,
    marginBottom: spacing.md,
    flexShrink: 1,
  },

  phoneContainer: {
    minHeight: 76,
    backgroundColor: colors.background,
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },

  phoneInfo: {
    flex: 1,
    minWidth: 0,
  },

  phoneLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 2,
  },

  phoneNumber: {
    color: colors.text,
    fontSize: 29,
    fontWeight: '900',
    letterSpacing: 1,
  },

  phoneIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },

  callButton: {
    minHeight: 53,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },

  callButtonDisabled: {
    opacity: 0.6,
  },

  callButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '900',
    marginLeft: spacing.sm,
  },

  footerNotice: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 19,
    padding: spacing.md,
    marginTop: spacing.md,
  },

  footerNoticeIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    flexShrink: 0,
  },

  footerNoticeContent: {
    flex: 1,
    minWidth: 0,
  },

  footerTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 4,
  },

  footerText: {
    color: colors.textSecondary,
    lineHeight: 21,
    flexShrink: 1,
  },

  requirementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 15,
    padding: spacing.md,
    marginTop: spacing.sm,
  },

  requirementIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
    marginRight: spacing.sm,
    flexShrink: 0,
  },

  requirementText: {
    flex: 1,
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

  footerTagline: {
    color: colors.textLight,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 3,
  },
});