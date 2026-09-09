import React from 'react';
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
  BackIcon,
  CheckIcon,
  GuideIcon,
  MedicalIcon,
} from '@/components/ui/icons';
import { GetEmergencies } from '@/domain/useCases';
import { InMemoryEmergencyRepository } from '@/data/repositories';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

const emergencyRepository =
  new InMemoryEmergencyRepository();

const getEmergencies = new GetEmergencies(
  emergencyRepository
);

const riskLabels: Record<string, string> = {
  bajo: 'Riesgo bajo',
  medio: 'Riesgo medio',
  alto: 'Riesgo alto',
  critico: 'Riesgo crítico',
};

const riskDescriptions: Record<string, string> = {
  bajo: 'Requiere atención y observación.',
  medio: 'Puede requerir evaluación profesional.',
  alto: 'Requiere atención profesional.',
  critico: 'Actúa rápidamente y solicita ayuda.',
};

function getRiskColor(riskLevel: string) {
  switch (riskLevel) {
    case 'critico':
      return colors.danger;
    case 'alto':
      return colors.warning;
    case 'medio':
      return '#CA8A04';
    default:
      return colors.success;
  }
}

function getRiskBackground(riskLevel: string) {
  switch (riskLevel) {
    case 'critico':
      return '#FEF2F2';
    case 'alto':
      return '#FFF7ED';
    case 'medio':
      return '#FEFCE8';
    default:
      return '#F0FDF4';
  }
}

function EmergencyCategoryIcon({
  riskLevel,
}: {
  riskLevel: string;
}) {
  const color = getRiskColor(riskLevel);

  return (
    <MedicalIcon
      size={29}
      color={color}
      strokeWidth={2}
    />
  );
}

export default function GuiaScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const [emergencies, setEmergencies] = React.useState<
    Awaited<ReturnType<typeof getEmergencies.execute>>
  >([]);

  const [selectedFilter, setSelectedFilter] =
    React.useState<string>('todas');

  const [loading, setLoading] =
    React.useState(true);

  const isSmall = width < 360;
  const isLarge = width >= 600;

  const titleSize = isSmall ? 25 : isLarge ? 32 : 28;
  const bodySize = isSmall ? 14 : isLarge ? 18 : 16;

  React.useEffect(() => {
    const loadEmergencies = async () => {
      try {
        const result =
          await getEmergencies.execute();

        setEmergencies(
          result.filter(
            (emergency) => emergency.active
          )
        );
      } finally {
        setLoading(false);
      }
    };

    loadEmergencies();
  }, []);

  const filters = [
    { key: 'todas', label: 'Todas' },
    { key: 'critico', label: 'Críticas' },
    { key: 'alto', label: 'Altas' },
    { key: 'medio', label: 'Medias' },
    { key: 'bajo', label: 'Bajas' },
  ];

  const filteredEmergencies =
    selectedFilter === 'todas'
      ? emergencies
      : emergencies.filter(
          (emergency) =>
            emergency.riskLevel ===
            selectedFilter
        );

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/');
  };

  const handleEmergencyPress = (
    id: number
  ) => {
    router.push({
      pathname: '/guia/[id]',
      params: {
        id: id.toString(),
      },
    });
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
          <View style={styles.headerTop}>
            <View style={styles.headerIcon}>
              <GuideIcon
                size={29}
                color={colors.white}
                strokeWidth={2}
              />
            </View>

            <View style={styles.headerText}>
              <Text
                style={[
                  styles.title,
                  { fontSize: titleSize },
                ]}
              >
                Guía de emergencias
              </Text>

              <Text
                style={[
                  styles.subtitle,
                  { fontSize: bodySize },
                ]}
              >
                Aprende a reconocer una emergencia y
                conoce los primeros pasos que puedes tomar.
              </Text>
            </View>
          </View>
        </View>

        {/* EDUCATIONAL NOTICE */}

        <View style={styles.educationalNotice}>
          <View style={styles.educationalIcon}>
            <MedicalIcon
              size={23}
              color={colors.primary}
              strokeWidth={2}
            />
          </View>

          <View style={styles.educationalContent}>
            <Text style={styles.educationalTitle}>
              Información para aprender
            </Text>

            <Text
              style={[
                styles.educationalText,
                { fontSize: bodySize - 1 },
              ]}
            >
              Revisa cada emergencia para conocer qué
              hacer, qué evitar y cuándo solicitar ayuda
              profesional.
            </Text>
          </View>
        </View>

        {/* FILTERS */}

        <View style={styles.filterHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Situaciones de emergencia
            </Text>

            <Text style={styles.sectionSubtitle}>
              Filtra por nivel de riesgo.
            </Text>
          </View>

          <View style={styles.countBadge}>
            <Text style={styles.countText}>
              {filteredEmergencies.length}
            </Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={
            styles.filtersContent
          }
        >
          {filters.map((filter) => {
            const selected =
              selectedFilter === filter.key;

            return (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterButton,
                  selected &&
                    styles.filterButtonSelected,
                ]}
                onPress={() =>
                  setSelectedFilter(filter.key)
                }
                activeOpacity={0.8}
              >
                {selected && (
                  <CheckIcon
                    size={15}
                    color={colors.white}
                    strokeWidth={2.5}
                  />
                )}

                <Text
                  style={[
                    styles.filterText,
                    selected &&
                      styles.filterTextSelected,
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* LOADING */}

        {loading && (
          <View style={styles.stateCard}>
            <View style={styles.stateIcon}>
              <GuideIcon
                size={25}
                color={colors.primary}
              />
            </View>

            <Text style={styles.stateTitle}>
              Cargando guía
            </Text>

            <Text style={styles.stateText}>
              Preparando el contenido disponible.
            </Text>
          </View>
        )}

        {/* EMPTY */}

        {!loading &&
          filteredEmergencies.length === 0 && (
            <View style={styles.stateCard}>
              <View style={styles.stateIcon}>
                <AlertIcon
                  size={25}
                  color={colors.warning}
                />
              </View>

              <Text style={styles.stateTitle}>
                No hay emergencias
              </Text>

              <Text style={styles.stateText}>
                No encontramos situaciones para el filtro
                seleccionado.
              </Text>
            </View>
          )}

        {/* EMERGENCY CARDS */}

        {!loading &&
          filteredEmergencies.map(
            (emergency) => {
              const riskColor =
                getRiskColor(
                  emergency.riskLevel
                );

              const riskBackground =
                getRiskBackground(
                  emergency.riskLevel
                );

              return (
                <TouchableOpacity
                  key={emergency.id}
                  style={styles.emergencyCard}
                  onPress={() =>
                    handleEmergencyPress(
                      emergency.id
                    )
                  }
                  activeOpacity={0.84}
                >
                  <View
                    style={styles.cardTop}
                  >
                    <View
                      style={[
                        styles.emergencyIcon,
                        {
                          backgroundColor:
                            riskBackground,
                        },
                      ]}
                    >
                      <EmergencyCategoryIcon
                        riskLevel={
                          emergency.riskLevel
                        }
                      />
                    </View>

                    <View
                      style={
                        styles.cardTitleContainer
                      }
                    >
                      <Text
                        style={
                          styles.category
                        }
                      >
                        {emergency.category}
                      </Text>

                      <Text
                        style={
                          styles.emergencyName
                        }
                      >
                        {emergency.name}
                      </Text>
                    </View>

                    <Text
                      style={[
                        styles.arrow,
                        {
                          color:
                            riskColor,
                        },
                      ]}
                    >
                      ›
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.description,
                      { fontSize: bodySize },
                    ]}
                  >
                    {emergency.description}
                  </Text>

                  <View
                    style={
                      styles.riskContainer
                    }
                  >
                    <View
                      style={[
                        styles.riskBadge,
                        {
                          backgroundColor:
                            riskBackground,
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.riskDot,
                          {
                            backgroundColor:
                              riskColor,
                          },
                        ]}
                      />

                      <Text
                        style={[
                          styles.riskText,
                          {
                            color:
                              riskColor,
                          },
                        ]}
                      >
                        {
                          riskLabels[
                            emergency.riskLevel
                          ]
                        }
                      </Text>
                    </View>

                    <Text
                      style={
                        styles.riskDescription
                      }
                    >
                      {
                        riskDescriptions[
                          emergency.riskLevel
                        ]
                      }
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }
          )}

        {/* FOOTER */}

        <View style={styles.footerNotice}>
          <View style={styles.footerIcon}>
            <AlertIcon
              size={22}
              color={colors.warning}
              strokeWidth={2}
            />
          </View>

          <View style={styles.footerContent}>
            <Text style={styles.footerTitle}>
              Importante
            </Text>

            <Text
              style={[
                styles.footerText,
                { fontSize: bodySize - 1 },
              ]}
            >
              La información de esta guía tiene fines
              educativos y no sustituye la capacitación
              ni la atención de profesionales de emergencia.
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Aprende. Practica. Actúa.
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

  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    flexShrink: 0,
  },

  headerText: {
    flex: 1,
    minWidth: 0,
  },

  title: {
    color: colors.text,
    fontWeight: '900',
    lineHeight: 34,
    marginBottom: spacing.xs,
    flexShrink: 1,
  },

  subtitle: {
    color: colors.textSecondary,
    lineHeight: 23,
    flexShrink: 1,
  },

  educationalNotice: {
    flexDirection: 'row',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 20,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },

  educationalIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    flexShrink: 0,
  },

  educationalContent: {
    flex: 1,
    minWidth: 0,
  },

  educationalTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 4,
  },

  educationalText: {
    color: colors.textSecondary,
    lineHeight: 21,
    flexShrink: 1,
  },

  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },

  sectionSubtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 3,
  },

  countBadge: {
    minWidth: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 9,
    marginLeft: spacing.sm,
  },

  countText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '900',
  },

  filtersContent: {
    paddingBottom: spacing.md,
  },

  filterButton: {
    minHeight: 40,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 13,
    marginRight: spacing.sm,
  },

  filterButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  filterText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '800',
  },

  filterTextSelected: {
    color: colors.white,
  },

  stateCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: spacing.xl,
    alignItems: 'center',
    marginTop: spacing.sm,
  },

  stateIcon: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },

  stateTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
    textAlign: 'center',
  },

  stateText: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 4,
  },

  emergencyCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: spacing.md,
    marginBottom: spacing.md,
  },

  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  emergencyIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    flexShrink: 0,
  },

  cardTitleContainer: {
    flex: 1,
    minWidth: 0,
  },

  category: {
    color: colors.textLight,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 3,
    flexShrink: 1,
  },

  emergencyName: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 23,
    flexShrink: 1,
  },

  arrow: {
    fontSize: 30,
    fontWeight: '400',
    marginLeft: spacing.sm,
    flexShrink: 0,
  },

  description: {
    color: colors.textSecondary,
    lineHeight: 23,
    marginTop: spacing.md,
    marginBottom: spacing.md,
    flexShrink: 1,
  },

  riskContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },

  riskBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 9,
  },

  riskDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 6,
  },

  riskText: {
    fontSize: 11,
    fontWeight: '900',
  },

  riskDescription: {
    color: colors.textLight,
    fontSize: 11,
    marginTop: 5,
  },

  footerNotice: {
    flexDirection: 'row',
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 19,
    padding: spacing.md,
    marginTop: spacing.md,
  },

  footerIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    flexShrink: 0,
  },

  footerContent: {
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

  footer: {
    textAlign: 'center',
    color: colors.textLight,
    fontSize: 12,
    fontWeight: '700',
    marginTop: spacing.xl,
  },
});