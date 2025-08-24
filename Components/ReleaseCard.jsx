import React from 'react';
import { StyleSheet, View, Image, Pressable, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';
import ThemedCard from './ThemedCard';
import ThemedText from './ThemedText';

const ReleaseCard = ({ release, onPress }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  const formatArtists = (artists) => {
    return artists.map(artist => artist.name).join(', ');
  };

  const formatReleaseDate = (dateString) => {
    if (!dateString || dateString === 'Unknown') {
      return 'Release date unknown';
    }
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (error) {
      return 'Release date unknown';
    }
  };

  // Get the best available image (largest size)
  const getBestImage = (images) => {
    if (!images || images.length === 0) return null;
    
    // Sort by size (height) and get the largest
    const sortedImages = images
      .filter(img => img.url && img.url.trim() !== '')
      .sort((a, b) => (b.height || 0) - (a.height || 0));
    
    return sortedImages[0]?.url || null;
  };

  const imageUrl = getBestImage(release.images);

  return (
    <ThemedCard style={styles.card}>
      <Pressable onPress={() => onPress && onPress(release)} style={styles.pressable}>
        <View style={styles.content}>
          {imageUrl && (
            <Image 
              source={{ uri: imageUrl }} 
              style={styles.albumImage}
              resizeMode="cover"
            />
          )}
          
          <View style={[styles.textContent, !imageUrl && styles.textContentNoImage]}>
            <ThemedText style={[styles.albumName, { color: theme.title }]} numberOfLines={2}>
              {release.name}
            </ThemedText>
            
            <ThemedText style={[styles.artistName, { color: theme.text }]} numberOfLines={1}>
              {formatArtists(release.artists)}
            </ThemedText>
            
            <ThemedText style={[styles.releaseDate, { color: theme.text }]}>
              {formatReleaseDate(release.release_date)}
            </ThemedText>
            
            {release.total_tracks && (
              <ThemedText style={[styles.trackCount, { color: theme.text }]}>
                {release.total_tracks} track{release.total_tracks !== 1 ? 's' : ''}
              </ThemedText>
            )}
          </View>
        </View>
      </Pressable>
    </ThemedCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  pressable: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  albumImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  textContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textContentNoImage: {
    marginLeft: 0,
  },
  albumName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  artistName: {
    fontSize: 14,
    marginBottom: 4,
  },
  releaseDate: {
    fontSize: 12,
    marginBottom: 2,
  },
  trackCount: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});

export default ReleaseCard;