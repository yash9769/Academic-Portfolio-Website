import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../utils/supabaseClient';
import { profile as staticProfile } from '../data/profile';

export type ProfileData = typeof staticProfile & {
  resumeUrl?: string;
  photoUrl?: string;
};

interface ProfileContextType {
  profile: ProfileData;
  loading: boolean;
  user: User | null;
  updateProfile: (newProfile: ProfileData) => Promise<void>;
  signOut: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData>(staticProfile);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // 1. Listen for auth changes
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // 2. Fetch active profile from key-value database
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('kv_store_ba9b0fcf')
          .select('value')
          .eq('key', 'profile')
          .maybeSingle();

        if (error) {
          console.error('Error fetching profile:', error.message);
        } else if (data?.value) {
          // Merge dynamic data on top of static profile in case static has new structure/items
          const mergedProfile = {
            ...staticProfile,
            ...data.value,
            // Ensure stats and other sub-objects merge nicely
            stats: {
              ...staticProfile.stats,
              ...(data.value.stats || {}),
            },
            publications: {
              ...staticProfile.publications,
              ...(data.value.publications || {}),
            },
            urls: {
              ...staticProfile.urls,
              ...(data.value.urls || {}),
            },
          };
          setProfile(mergedProfile);
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const updateProfile = async (newProfile: ProfileData) => {
    const { error } = await supabase
      .from('kv_store_ba9b0fcf')
      .upsert({
        key: 'profile',
        value: newProfile,
      });

    if (error) {
      throw new Error(error.message);
    }

    setProfile(newProfile);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, loading, user, updateProfile, signOut }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
