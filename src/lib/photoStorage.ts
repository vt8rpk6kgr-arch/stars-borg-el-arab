// Utility for saving and loading player photos (Supabase Storage + LocalStorage Fallback)
import { supabase, isSupabaseConfigured } from './supabase';

export const savePlayerPhoto = async (
  playerId: string,
  file: File
): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Resize image to fit card (max 400x500) to keep size fast and snappy
    const reader = new FileReader();
    reader.onload = async (e) => {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 350;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

        // Always save to localStorage for instantaneous offline preview
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem(`fifa_card_photo_${playerId}`, dataUrl);
          }
        } catch (e) {
          console.warn('localStorage write failed', e);
        }

        // Also upload to Supabase Storage if configured
        if (isSupabaseConfigured) {
          try {
            const fileName = `avatars/${playerId}_${Date.now()}.jpg`;
            const blob = await (await fetch(dataUrl)).blob();
            const { error: uploadError } = await supabase.storage
              .from('comics')
              .upload(fileName, blob, { upsert: true });

            if (!uploadError) {
              const { data: publicData } = supabase.storage
                .from('comics')
                .getPublicUrl(fileName);
              if (publicData?.publicUrl) {
                // Update profile avatar_url
                await supabase
                  .from('profiles')
                  .update({ avatar_sticker: publicData.publicUrl })
                  .eq('id', playerId);
                resolve(publicData.publicUrl);
                return;
              }
            }
          } catch (err) {
            console.warn('Storage upload fallback to local storage', err);
          }
        }

        resolve(dataUrl);
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

export const getPlayerPhoto = (playerId: string): string | null => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    return localStorage.getItem(`fifa_card_photo_${playerId}`);
  } catch (e) {
    return null;
  }
};
