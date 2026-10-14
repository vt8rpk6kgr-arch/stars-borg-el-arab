import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RetroFifaCard } from '@/components/ui/RetroFifaCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelIcon } from '@/components/ui/PixelIcon';
import { savePlayerPhoto, getPlayerPhoto } from '@/lib/photoStorage';

const PLAYERS_DIRECTORY: Record<string, {
  name: string;
  nickname: string;
  position: 'ATT' | 'MID' | 'DEF' | 'GK';
  rating: number;
  team: string;
  stats: { pac: number; sho: number; pas: number; dri: number; def: number; phy: number };
  goals: number;
  matches: number;
  variant?: 'gold' | 'silver' | 'bronze' | 'special';
  badgeRank?: string;
}> = {
  p1: {
    name: 'أحمد زيزو',
    nickname: 'القناص',
    position: 'ATT',
    rating: 88,
    team: 'نسور كينج مريوط',
    stats: { pac: 89, sho: 92, pas: 84, dri: 88, def: 58, phy: 80 },
    goals: 14,
    matches: 12,
    variant: 'gold',
    badgeRank: '🥇 #1 SCORER',
  },
  '1': {
    name: 'أحمد زيزو',
    nickname: 'القناص',
    position: 'ATT',
    rating: 88,
    team: 'نسور كينج مريوط',
    stats: { pac: 89, sho: 92, pas: 84, dri: 88, def: 58, phy: 80 },
    goals: 14,
    matches: 12,
    variant: 'gold',
    badgeRank: '🥇 #1 SCORER',
  },
  p2: {
    name: 'عمر القناص',
    nickname: 'الفهد',
    position: 'ATT',
    rating: 85,
    team: 'فهود برج العرب',
    stats: { pac: 91, sho: 86, pas: 78, dri: 84, def: 52, phy: 76 },
    goals: 11,
    matches: 11,
    variant: 'special',
    badgeRank: '🥈 #2 SCORER',
  },
  '2': {
    name: 'عمر القناص',
    nickname: 'الفهد',
    position: 'ATT',
    rating: 85,
    team: 'فهود برج العرب',
    stats: { pac: 91, sho: 86, pas: 78, dri: 84, def: 52, phy: 76 },
    goals: 11,
    matches: 11,
    variant: 'special',
    badgeRank: '🥈 #2 SCORER',
  },
  p3: {
    name: 'محمود تريكة',
    nickname: 'المايسترو',
    position: 'MID',
    rating: 83,
    team: 'أبطال الحارة',
    stats: { pac: 80, sho: 82, pas: 90, dri: 87, def: 64, phy: 75 },
    goals: 9,
    matches: 10,
    variant: 'gold',
    badgeRank: '🥉 #3 SCORER',
  },
  '3': {
    name: 'محمود تريكة',
    nickname: 'المايسترو',
    position: 'MID',
    rating: 83,
    team: 'أبطال الحارة',
    stats: { pac: 80, sho: 82, pas: 90, dri: 87, def: 64, phy: 75 },
    goals: 9,
    matches: 10,
    variant: 'gold',
    badgeRank: '🥉 #3 SCORER',
  },
  p4: {
    name: 'كريم شيكا',
    nickname: 'الساحر',
    position: 'MID',
    rating: 81,
    team: 'نسور كينج مريوط',
    stats: { pac: 86, sho: 84, pas: 85, dri: 92, def: 45, phy: 70 },
    goals: 7,
    matches: 10,
    variant: 'gold',
    badgeRank: '#4 SCORER',
  },
  '4': {
    name: 'كريم شيكا',
    nickname: 'الساحر',
    position: 'MID',
    rating: 81,
    team: 'نسور كينج مريوط',
    stats: { pac: 86, sho: 84, pas: 85, dri: 92, def: 45, phy: 70 },
    goals: 7,
    matches: 10,
    variant: 'gold',
    badgeRank: '#4 SCORER',
  },
  p5: {
    name: 'إبراهيم حسن',
    nickname: 'مسمار النص',
    position: 'DEF',
    rating: 79,
    team: 'دراويش بهيج',
    stats: { pac: 78, sho: 60, pas: 75, dri: 72, def: 88, phy: 92 },
    goals: 6,
    matches: 10,
    variant: 'special',
    badgeRank: '#5 SCORER',
  },
  '5': {
    name: 'إبراهيم حسن',
    nickname: 'مسمار النص',
    position: 'DEF',
    rating: 79,
    team: 'دراويش بهيج',
    stats: { pac: 78, sho: 60, pas: 75, dri: 72, def: 88, phy: 92 },
    goals: 6,
    matches: 10,
    variant: 'special',
    badgeRank: '#5 SCORER',
  },
  p6: {
    name: 'إسلام بونو',
    nickname: 'السد العالي',
    position: 'GK',
    rating: 84,
    team: 'نسور كينج مريوط',
    stats: { pac: 65, sho: 40, pas: 68, dri: 62, def: 90, phy: 88 },
    goals: 0,
    matches: 12,
    variant: 'gold',
    badgeRank: 'TOP GK',
  },
};

export const PlayerCardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const playerId = id || 'p1';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const matched = PLAYERS_DIRECTORY[playerId] || PLAYERS_DIRECTORY['p1'];

  const [player, setPlayer] = useState({
    id: playerId,
    name: matched.name,
    nickname: matched.nickname,
    position: matched.position,
    rating: matched.rating,
    team: matched.team,
    photoUrl: null as string | null,
    stats: matched.stats,
    goals: matched.goals,
    matches: matched.matches,
    variant: matched.variant || 'gold',
    badgeRank: matched.badgeRank || "LEGEND '90",
  });

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const currentData = PLAYERS_DIRECTORY[playerId] || PLAYERS_DIRECTORY['p1'];
    const savedPhoto = getPlayerPhoto(playerId);
    setPlayer({
      id: playerId,
      name: currentData.name,
      nickname: currentData.nickname,
      position: currentData.position,
      rating: currentData.rating,
      team: currentData.team,
      photoUrl: savedPhoto,
      stats: currentData.stats,
      goals: currentData.goals,
      matches: currentData.matches,
      variant: currentData.variant || 'gold',
      badgeRank: currentData.badgeRank || "LEGEND '90",
    });
  }, [playerId]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await savePlayerPhoto(playerId, file);
      setPlayer((prev) => ({ ...prev, photoUrl: url }));
    } catch (err) {
      alert('حدث خطأ أثناء رفع الصورة، يرجى المحاولة مرة أخرى.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleShareCard = () => {
    if (navigator.share) {
      navigator.share({
        title: `كارت فيفا 90s: ${player.name}`,
        text: `شوف كارتي في نجوم برج العرب بتقييم ${player.rating}! ⚽`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      alert('تم نسخ رابط كارت اللاعب بنجاح!');
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <Link to="/stats" className="inline-flex items-center gap-1 text-sm text-[#FFE500] font-bold hover:underline">
        <PixelIcon name="arrow-left" size={14} color="#FFE500" />
        <span>العودة للوحة الشرف</span>
      </Link>

      {/* Hidden File Input for uploading card photo */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handlePhotoUpload}
        accept="image/*"
        className="hidden"
      />

      {/* The 90s FIFA Retro Player Card */}
      <div className="flex flex-col items-center">
        <RetroFifaCard
          name={player.name}
          nickname={player.nickname}
          position={player.position}
          rating={player.rating}
          photoUrl={player.photoUrl}
          teamName={player.team}
          goals={player.goals}
          matches={player.matches}
          stats={player.stats}
          badgeRank="LEGEND '90"
          variant="gold"
          onClick={() => fileInputRef.current?.click()}
        />

        <p className="text-xs text-white/60 font-body text-center mt-3">
          💡 اضغط على الكارت أو الزر بالأسفل لتغيير صورتك وظهورها مباشرة داخل كارت الفيفا!
        </p>
      </div>

      {/* Action Controls */}
      <div className="space-y-2">
        <PixelButton
          variant="pink"
          size="md"
          fullWidth
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
          className="text-base"
        >
          {isUploading ? 'جاري رفع صورتك...' : '📷 ارفع صورتك في الكارت (Face Photo)'}
        </PixelButton>

        <PixelButton
          variant="green"
          size="md"
          fullWidth
          onClick={handleShareCard}
          className="text-base"
        >
          مشاركة كارت اللاعب 📲
        </PixelButton>
      </div>
    </div>
  );
};
