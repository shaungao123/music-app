import React from 'react';
import { StyleSheet, View, FlatList, RefreshControl, useColorScheme, Alert } from 'react-native';
import { Link } from 'expo-router';
import { Colors } from '../../constants/Colors';
import ThemedView from '../../Components/ThemedView';
import ThemedText from '../../Components/ThemedText';
import ReleaseCard from '../../Components/ReleaseCard';
import { useMusicReleases } from '../../hooks/useMusicReleases';

const Releases = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  const { releases, loading, error, lastFetched, refreshReleases } = useMusicReleases();

  const handleReleasePress = (release) => {
    Alert.alert(
      release.name,
      `By ${release.artists.map(a => a.name).join(', ')}\n\nRelease Date: ${release.release_date}\nSource: Deezer`,
      [
        { text: 'OK', style: 'default' }
      ]
    );
  };

  const renderRelease = ({ item }) => (
    <ReleaseCard release={item} onPress={handleReleasePress} />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <ThemedText style={[styles.title, { color: theme.title }]}>
        New Releases
      </ThemedText>
      <ThemedText style={[styles.subtitle, { color: theme.text }]}>
        Powered by Deezer
      </ThemedText>
      {lastFetched && (
        <ThemedText style={[styles.lastFetched, { color: theme.text }]}>
          Last updated: {lastFetched.toLocaleTimeString()}
        </ThemedText>
      )}
      {error && (
        <ThemedText style={[styles.error, { color: Colors.warning }]}>
          Error: {error}
        </ThemedText>
      )}
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <ThemedText style={[styles.emptyText, { color: theme.text }]}>
        {error ? 'Failed to load releases from Deezer.' : 'No new releases found'}
      </ThemedText>
      <Link href='/' style={[styles.link, { color: theme.text }]}>
        Go Home
      </Link>
    </View>
  );

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={releases}
        renderItem={renderRelease}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refreshReleases}
            tintColor={theme.iconColor}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={releases.length === 0 ? styles.emptyListContainer : undefined}
      />
    </ThemedView>
  );
};

export default Releases;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  lastFetched: {
    fontSize: 12,
    marginBottom: 4,
  },
  error: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyListContainer: {
    flexGrow: 1,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  link: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});