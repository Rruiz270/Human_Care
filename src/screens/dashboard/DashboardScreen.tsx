import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Calendar,
  ChevronRight,
  Sparkles,
  Activity,
  PenLine,
} from 'lucide-react-native';
import { useUserStore } from '../../store/user-store';
import { GlassCard } from '../../components/design-system/GlassCard';
import { BlueprintBackground } from '../../components/design-system/BlueprintBackground';
import { WarmTechButton } from '../../components/design-system/WarmTechButton';
import { Avatar } from '../../components/shared/Avatar';
import { Badge } from '../../components/shared/Badge';
import { HealthEnergyBar } from '../../components/rpg/HealthEnergyBar';
import { XPBar } from '../../components/rpg/XPBar';
import { InventoryGrid } from '../../components/rpg/InventoryGrid';
import { LevelBadge } from '../../components/rpg/LevelBadge';
import { StreakCounter } from '../../components/rpg/StreakCounter';
import { colors } from '../../constants/colors';
import { fonts, fontSizes } from '../../constants/typography';
import { translations } from '../../constants/translations';
import { getGreeting } from '../../utils/helpers';
import { formatDate, formatTime } from '../../utils/formatters';
import { isIOS, STATUS_BAR_HEIGHT, TAB_BAR_HEIGHT } from '../../utils/platform';
import type { InventoryItem } from '../../types';

const { width } = Dimensions.get('window');
const BAR_WIDTH = width - 80;

// Demo inventory items
const inventoryItems: InventoryItem[] = [
  { id: '1', name: 'Sono', icon: 'moon', category: 'sleep', score: 75, description: '7h por noite' },
  { id: '2', name: 'Nutricao', icon: 'apple', category: 'nutrition', score: 60, description: 'Alimentacao equilibrada' },
  { id: '3', name: 'Rotina', icon: 'clock', category: 'routine', score: 82, description: '3 habitos ativos' },
  { id: '4', name: 'Conexoes', icon: 'users', category: 'connections', score: 68, description: '5 relacionamentos' },
];

export function DashboardScreen() {
  const { currentUser, rpgStats, upcomingSessions, pendingMissions, todayTracking } = useUserStore();

  if (!currentUser) return null;

  const greeting = getGreeting();

  return (
    <View style={styles.root}>
      <BlueprintBackground />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header / Greeting */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>{greeting},</Text>
            <Text style={styles.userName}>{currentUser.name.split(' ')[0]}</Text>
          </View>
          <View style={styles.headerRight}>
            <StreakCounter streak={rpgStats.streak} />
            <Avatar name={currentUser.name} uri={currentUser.avatar} size={48} />
          </View>
        </View>

        {/* RPG Stats Card */}
        <GlassCard variant="copper" style={styles.rpgCard}>
          <View style={styles.rpgHeader}>
            <LevelBadge level={rpgStats.level} />
            <View style={styles.rpgTitleContainer}>
              <Text style={styles.rpgTitle}>Status do Aventureiro</Text>
              <Text style={styles.rpgSubtitle}>Continue sua jornada!</Text>
            </View>
          </View>
          <View style={styles.rpgBars}>
            <HealthEnergyBar
              label={translations.rpg.health}
              value={rpgStats.health}
              type="health"
              width={BAR_WIDTH}
            />
            <HealthEnergyBar
              label={translations.rpg.energy}
              value={rpgStats.energy}
              type="energy"
              width={BAR_WIDTH}
            />
            <XPBar
              currentXP={rpgStats.xp}
              xpToNext={rpgStats.xpToNext}
              level={rpgStats.level}
              width={BAR_WIDTH}
            />
          </View>
        </GlassCard>

        {/* Daily Tracking CTA */}
        {!todayTracking?.moodScore && (
          <GlassCard style={styles.trackingCta}>
            <View style={styles.ctaRow}>
              <PenLine size={20} color={colors.glow.green} />
              <View style={styles.ctaTextContainer}>
                <Text style={styles.ctaTitle}>Registro Diario</Text>
                <Text style={styles.ctaSubtitle}>Como voce esta se sentindo hoje?</Text>
              </View>
              <WarmTechButton title="Registrar" onPress={() => {}} size="sm" />
            </View>
          </GlassCard>
        )}

        {/* Inventory Grid */}
        <InventoryGrid items={inventoryItems} />

        {/* Upcoming Sessions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Proximas Sessoes</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Ver todas</Text>
              <ChevronRight size={16} color={colors.copper.DEFAULT} />
            </TouchableOpacity>
          </View>
          {upcomingSessions.length > 0 ? (
            upcomingSessions.slice(0, 2).map((session) => (
              <GlassCard key={session.id} style={styles.sessionCard}>
                <View style={styles.sessionRow}>
                  <View style={styles.sessionInfo}>
                    <Avatar
                      name={session.professional?.name ?? 'Prof'}
                      size={36}
                    />
                    <View>
                      <Text style={styles.sessionProfessional}>
                        {session.professional?.name}
                      </Text>
                      <Text style={styles.sessionType}>
                        {translations.sessionType[session.type]}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.sessionDate}>
                    <Calendar size={14} color={colors.text.secondary} />
                    <Text style={styles.sessionDateText}>
                      {formatDate(session.scheduledAt)}
                    </Text>
                  </View>
                </View>
                <Badge
                  label={session.isOnline ? 'Online' : 'Presencial'}
                  variant={session.isOnline ? 'info' : 'copper'}
                />
              </GlassCard>
            ))
          ) : (
            <GlassCard>
              <Text style={styles.emptyText}>Nenhuma sessao agendada</Text>
            </GlassCard>
          )}
        </View>

        {/* Pending Missions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Missoes Pendentes</Text>
            <Badge label={`${pendingMissions.length}`} variant="copper" />
          </View>
          {pendingMissions.slice(0, 3).map((mission) => (
            <GlassCard key={mission.id} style={styles.missionCard}>
              <View style={styles.missionRow}>
                <View style={styles.missionCheck}>
                  <View style={styles.checkbox} />
                </View>
                <View style={styles.missionInfo}>
                  <Text style={styles.missionTitle}>{mission.title}</Text>
                  <Badge
                    label={translations.missionType[mission.type]}
                    variant={
                      mission.type === 'DAILY_HABIT'
                        ? 'success'
                        : mission.type === 'THERAPY_TASK'
                        ? 'info'
                        : 'warning'
                    }
                  />
                </View>
                {mission.streak && mission.streak > 0 && (
                  <StreakCounter streak={mission.streak} label="dias" />
                )}
              </View>
            </GlassCard>
          ))}
        </View>

        {/* AI Insight */}
        <GlassCard variant="copper" style={styles.aiInsight}>
          <View style={styles.aiHeader}>
            <Sparkles size={20} color={colors.glow.amber} />
            <Text style={styles.aiTitle}>Insight da IA</Text>
          </View>
          <Text style={styles.aiText}>
            Voce tem mantido uma otima sequencia de registros diarios! Seus niveis de
            energia estao acima da media essa semana. Continue assim e foque em manter
            a qualidade do sono.
          </Text>
        </GlassCard>

        {/* Care Ratio Mini */}
        <GlassCard style={styles.careRatio}>
          <Text style={styles.sectionTitle}>Razao de Cuidado</Text>
          <View style={styles.careBarContainer}>
            <View style={[styles.careBarSegment, { flex: 40, backgroundColor: colors.glow.blue }]} />
            <View style={[styles.careBarSegment, { flex: 35, backgroundColor: colors.glow.amber }]} />
            <View style={[styles.careBarSegment, { flex: 25, backgroundColor: colors.glow.green }]} />
          </View>
          <View style={styles.careLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.glow.blue }]} />
              <Text style={styles.legendText}>Profissional 40%</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.glow.amber }]} />
              <Text style={styles.legendText}>IA 35%</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.glow.green }]} />
              <Text style={styles.legendText}>Autocuidado 25%</Text>
            </View>
          </View>
        </GlassCard>

        {/* Bottom spacer for tab bar */}
        <View style={{ height: TAB_BAR_HEIGHT + 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.cream.DEFAULT,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: STATUS_BAR_HEIGHT + (isIOS ? 12 : 24),
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  headerLeft: {},
  greeting: {
    fontFamily: fonts.body,
    fontSize: fontSizes.base,
    color: colors.text.secondary,
  },
  userName: {
    fontFamily: fonts.heading,
    fontSize: fontSizes['2xl'],
    color: colors.text.primary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rpgCard: {
    gap: 16,
  },
  rpgHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rpgTitleContainer: {},
  rpgTitle: {
    fontFamily: fonts.headingMedium,
    fontSize: fontSizes.md,
    color: colors.text.primary,
  },
  rpgSubtitle: {
    fontFamily: fonts.body,
    fontSize: fontSizes.sm,
    color: colors.text.secondary,
  },
  rpgBars: {
    gap: 10,
  },
  trackingCta: {
    borderWidth: 1,
    borderColor: 'rgba(164,223,0,0.3)',
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ctaTextContainer: {
    flex: 1,
  },
  ctaTitle: {
    fontFamily: fonts.bodySemibold,
    fontSize: fontSizes.base,
    color: colors.text.primary,
  },
  ctaSubtitle: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.text.secondary,
  },
  section: {
    gap: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontFamily: fonts.headingMedium,
    fontSize: fontSizes.lg,
    color: colors.text.primary,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  seeAllText: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.sm,
    color: colors.copper.DEFAULT,
  },
  sessionCard: {
    gap: 8,
  },
  sessionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sessionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sessionProfessional: {
    fontFamily: fonts.bodySemibold,
    fontSize: fontSizes.base,
    color: colors.text.primary,
  },
  sessionType: {
    fontFamily: fonts.body,
    fontSize: fontSizes.sm,
    color: colors.text.secondary,
  },
  sessionDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sessionDateText: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.xs,
    color: colors.text.secondary,
  },
  emptyText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.sm,
    color: colors.text.tertiary,
    textAlign: 'center',
  },
  missionCard: {
    paddingVertical: 12,
  },
  missionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  missionCheck: {},
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.copper.DEFAULT,
  },
  missionInfo: {
    flex: 1,
    gap: 4,
  },
  missionTitle: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.base,
    color: colors.text.primary,
  },
  aiInsight: {
    gap: 10,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  aiTitle: {
    fontFamily: fonts.headingMedium,
    fontSize: fontSizes.base,
    color: colors.glow.amber,
  },
  aiText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.sm,
    color: colors.text.primary,
    lineHeight: 20,
  },
  careRatio: {
    gap: 12,
  },
  careBarContainer: {
    flexDirection: 'row',
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    gap: 2,
  },
  careBarSegment: {
    borderRadius: 5,
  },
  careLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.text.secondary,
  },
});
