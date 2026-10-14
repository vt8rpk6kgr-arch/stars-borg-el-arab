import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RetroFifaCard } from '@/components/ui/RetroFifaCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelIcon } from '@/components/ui/PixelIcon';
import { savePlayerPhoto, getPlayerPhoto } from '@/lib/photoStorage';

export const PlayerCardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const playerId = id || 'p1';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [player, setPlayer] = useState({
    id: playerId,
    name: 'أحمد زيزو',
    nickname: 'القناص',
    position: 'ATT',
    rating: 88,
    team: 'نسور كينج مريوط',
    photoUrl: null as string | null,
    stats: { pac: 89, sho: 92, pas: 84, dri: 88, def: 58, phy: 80 },
    goals: 14,
    matches: 12,
  });

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const savedPhoto = getPlayerPhoto(playerId);
    if (savedPhoto) {
      setPlayer((prev) => ({ ...prev, photoUrl: savedPhoto }));
    }
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
