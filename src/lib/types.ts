export type UserRole = 'player' | 'admin';
export type PlayerPosition = 'GK' | 'DEF' | 'MID' | 'ATT';
export type MatchStatus = 'scheduled' | 'pending_review' | 'final';
export type BookingKind = 'team' | 'private' | 'blocked';
export type BookingStatus = 'confirmed' | 'cancelled';
export type TournamentFormat = 'league' | 'knockout';
export type TournamentStatus = 'upcoming' | 'live' | 'finished';

export interface Profile {
  id: string;
  full_name: string;
  nickname?: string | null;
  phone: string;
  role: UserRole;
  position?: PlayerPosition | null;
  avatar_sticker?: string | null;
  created_at: string;
}

export interface PitchSettings {
  id: number;
  open_hour: number;
  close_hour: number;
  slot_minutes: number;
  price_per_slot_egp: number;
  whatsapp_number?: string | null;
  cancel_before_hours: number;
}

export interface Team {
  id: string;
  name: string;
  captain_id: string;
  color: string;
  badge?: string | null;
  max_players: number;
  created_at: string;
  captain?: Profile;
  members_count?: number;
}

export interface TeamMember {
  team_id: string;
  player_id: string;
  joined_at: string;
  player?: Profile;
}

export interface Booking {
  id: string;
  slot_start: string;
  booked_by?: string | null;
  team_a?: string | null;
  team_b?: string | null;
  is_open_challenge: boolean;
  kind: BookingKind;
  status: BookingStatus;
  note?: string | null;
  created_at: string;
  team_a_data?: Team;
  team_b_data?: Team;
}

export interface Match {
  id: string;
  booking_id?: string | null;
  tournament_id?: string | null;
  round_label?: string | null;
  home_team: string;
  away_team: string;
  home_score?: number | null;
  away_score?: number | null;
  status: MatchStatus;
  submitted_by?: string | null;
  played_at?: string | null;
  created_at: string;
  home_team_data?: Team;
  away_team_data?: Team;
}

export interface Goal {
  id: string;
  match_id: string;
  team_id: string;
  scorer_id?: string | null;
  assist_id?: string | null;
  minute?: number | null;
  is_own_goal: boolean;
  scorer?: Profile;
  assist?: Profile;
}

export interface Tournament {
  id: string;
  name: string;
  format: TournamentFormat;
  status: TournamentStatus;
  starts_on?: string | null;
  ends_on?: string | null;
  champion_team?: string | null;
  created_at: string;
}

export interface ActivityFeedItem {
  id: number;
  type: 'goal' | 'match_final' | 'booking' | 'team_created' | 'team_full' | 'sticker' | 'tournament';
  actor_id?: string | null;
  payload: Record<string, any>;
  created_at: string;
}
