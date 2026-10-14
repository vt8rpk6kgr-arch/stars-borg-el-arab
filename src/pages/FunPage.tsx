import React, { useState } from 'react';
import { PixelBadge } from '@/components/ui/PixelBadge';
import { PixelIcon } from '@/components/ui/PixelIcon';
import { EGYPTIAN_COMICS } from '@/data/egyptianComics';
import { EGYPTIAN_STICKERS } from '@/data/egyptianStickers';

export const FunPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'comics' | 'stickers'>('comics');
  const [selectedComicId, setSelectedComicId] = useState<string>(EGYPTIAN_COMICS[0].id);

  // Set owned stickers
  const ownedStickerIds = ['stk-1', 'stk-2', 'stk-3', 'stk-4', 'stk-6', 'stk-10'];

  const selectedComic = EGYPTIAN_COMICS.find((c) => c.id === selectedComicId) || EGYPTIAN_COMICS[0];

  return (
    <div className="space-y-6">
      <div className="border-b-[3px] border-line pb-4">
        <h1 className="font-display text-3xl text-[#FFE500] flex items-center gap-2">
          <PixelIcon name="star" size={28} color="#FF007F" />
          <span>كوميكس واستيكرز الكورة المصرية ⚽</span>
        </h1>
        <p className="font-body text-paper-cream/80 text-sm mt-1">
          حكايات وقفشات ملاعب الحارة والشوارع المصرية، وألبوم استيكرز حريفة نجوم برج العرب.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b-2 border-line">
        <button
          onClick={() => setActiveTab('comics')}
          className={`px-5 py-2 font-display text-lg border-b-4 transition-colors ${
            activeTab === 'comics'
              ? 'border-[#FF007F] text-[#FF007F] font-bold bg-[#FF007F]/10'
              : 'border-transparent text-paper-cream/60 hover:text-white'
          }`}
        >
          📰 كوميكس الحارة المصرية ({EGYPTIAN_COMICS.length})
        </button>

        <button
          onClick={() => setActiveTab('stickers')}
          className={`px-5 py-2 font-display text-lg border-b-4 transition-colors ${
            activeTab === 'stickers'
              ? 'border-[#25F143] text-[#25F143] font-bold bg-[#25F143]/10'
              : 'border-transparent text-paper-cream/60 hover:text-white'
          }`}
        >
          🏷️ استيكرز الحريفة ({ownedStickerIds.length}/{EGYPTIAN_STICKERS.length})
        </button>
      </div>

      {/* Comics Gallery Tab */}
      {activeTab === 'comics' && (
        <div className="space-y-6">
          {/* Featured Comic Stage */}
          <div className="bg-[#FFFDF6] border-[4px] border-ink p-5 shadow-[var(--shadow-x)_8px_0_#FF007F] text-ink relative">
            <div className="flex justify-between items-center border-b-2 border-ink pb-2 mb-3">
              <span className="font-pixel text-xs text-[#FF007F] font-bold">
                حكايات كورة الحارة #EGY_STREET
              </span>
              <span className="panini-box text-[9px] py-0.5">
                COMICS '90
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Comic Graphic Frame */}
              <div className="md:col-span-5 bg-gradient-to-br from-[#1B2338] via-[#090A0F] to-[#11131C] border-[3px] border-ink p-6 rounded text-center text-white min-h-[220px] flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
                <span className="text-6xl mb-3 animate-bounce">{selectedComic.emoji}</span>
                <span className="font-pixel text-[10px] text-[#25F143] bg-black/80 px-2 py-0.5 border border-[#25F143]">
                  {selectedComic.subtitle}
                </span>
                <div className="scanlines absolute inset-0 opacity-20 pointer-events-none" />
              </div>

              {/* Speech Bubble / Story */}
              <div className="md:col-span-7 space-y-3">
                <h2 className="font-display text-3xl text-ink leading-tight">
                  {selectedComic.title}
                </h2>

                {/* Comic Speech Bubble */}
                <div className="relative bg-[#FFF2A3] border-[3px] border-ink p-4 text-ink font-body text-base leading-relaxed font-semibold shadow-[3px_3px_0_#000]">
                  <p>{selectedComic.dialogue}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                  {selectedComic.tags.map((t, idx) => (
                    <span key={idx} className="bg-white px-2 py-0.5 border border-ink font-bold text-ink/80">
                      #{t}
                    </span>
                  ))}
                  <span className="text-ink/60 font-pixel text-[10px] mr-auto">
                    بواسطة: {selectedComic.author} • {selectedComic.date}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Comics Selector Carousel */}
          <div>
            <h3 className="font-display text-xl text-[#FFE500] mb-3">اختر قصة من ذكريات الملاعب:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {EGYPTIAN_COMICS.map((comic) => (
                <div
                  key={comic.id}
                  onClick={() => setSelectedComicId(comic.id)}
                  className={`
                    p-3 border-[3px] cursor-pointer transition-transform
                    ${
                      selectedComicId === comic.id
                        ? 'bg-[#15161E] border-[#FF007F] shadow-[var(--shadow-x)_4px_0_#FF007F] scale-[1.02]'
                        : 'bg-[#10121A] border-line hover:border-white/40'
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{comic.emoji.split(' ')[0] || '⚽'}</span>
                    <div>
                      <h4 className="font-display text-base text-paper-cream leading-tight">
                        {comic.title}
                      </h4>
                      <span className="text-[11px] text-[#25F143]">{comic.subtitle}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stickers Album Tab */}
      {activeTab === 'stickers' && (
        <div className="space-y-4">
          <div className="p-3 bg-black/40 border border-line text-xs text-white/70 flex justify-between items-center">
            <span>الاستيكرز الملونة هي التي قمت بفتحها بإنجازاتك في الملعب!</span>
            <span className="font-pixel text-[#25F143] text-sm">
              {ownedStickerIds.length} / {EGYPTIAN_STICKERS.length} مجمّع
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {EGYPTIAN_STICKERS.map((stk) => {
              const isOwned = ownedStickerIds.includes(stk.id);

              return (
                <div
                  key={stk.id}
                  className={`
                    p-4 text-center border-[3px] flex flex-col justify-between min-h-[190px] relative select-none
                    ${
                      isOwned
                        ? 'bg-[#FFFDF6] text-ink border-ink shadow-[var(--shadow-x)_5px_0_#25F143]'
                        : 'bg-[#10121A] text-white/40 border-dashed border-line opacity-60'
                    }
                  `}
                >
                  <div className="w-full flex justify-between items-center mb-1">
                    <PixelBadge variant={stk.rarity as any}>{stk.rarity}</PixelBadge>
                    {isOwned ? (
                      <span className="font-pixel text-[10px] text-pitch-deep font-bold bg-[#25F143]/20 px-1 border border-[#25F143]">
                        ✓ في ألبومك
                      </span>
                    ) : (
                      <span className="font-pixel text-[9px] text-white/40">🔒 مقفول</span>
                    )}
                  </div>

                  {/* Sticker Graphic */}
                  <div className="my-2">
                    <div
                      className={`
                        w-16 h-16 border-[2px] border-ink flex items-center justify-center mx-auto text-3xl shadow-[2px_2px_0_#000]
                        ${isOwned ? 'bg-[#FFE500]' : 'bg-gray-800'}
                      `}
                    >
                      {stk.icon}
                    </div>

                    <div className={`font-display text-lg mt-2 leading-tight ${isOwned ? 'text-ink' : 'text-white/60'}`}>
                      {stk.name}
                    </div>
                  </div>

                  <div className="text-[11px] font-body opacity-80 border-t border-ink/10 pt-1.5">
                    {stk.hint}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
