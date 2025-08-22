import axios from 'axios';

class DeezerService {
  constructor() {
    this.baseURL = 'https://api.deezer.com';
  }

  // Get new releases from Deezer
  async getNewReleases(limit = 50) {
    try {
      console.log('Fetching new releases from Deezer...');
      
      // Try editorial releases first (most recent)
      const response = await axios.get(`${this.baseURL}/editorial/0/releases`, {
        timeout: 10000
      });

      console.log('Deezer response status:', response.status);
      
      let releases = response.data.data || [];
      
      if (releases.length === 0) {
        // Fallback to chart albums
        return await this.getChartAlbums(limit);
      }

      console.log('Number of releases received:', releases.length);
      
      return {
        items: releases.slice(0, limit).map(release => this.transformReleaseData(release))
      };
      
    } catch (error) {
      console.error('Deezer editorial API error:', error.message);
      
      // Fallback to chart albums
      try {
        return await this.getChartAlbums(limit);
      } catch (fallbackError) {
        console.error('Deezer fallback failed:', fallbackError.message);
        throw new Error('Failed to fetch new releases from Deezer');
      }
    }
  }

  // Fallback method using chart albums
  async getChartAlbums(limit) {
    try {
      console.log('Trying Deezer chart albums...');
      
      const response = await axios.get(`${this.baseURL}/chart/0/albums`, {
        params: {
          limit: limit
        },
        timeout: 10000
      });

      const albums = response.data.data || [];
      console.log('Chart albums received:', albums.length);
      
      return {
        items: albums.map(album => this.transformReleaseData(album))
      };
      
    } catch (error) {
      console.error('Deezer chart API error:', error.message);
      throw new Error('Failed to fetch chart albums from Deezer');
    }
  }

  // Transform Deezer data to match our expected format
  transformReleaseData(release) {
    return {
      id: `deezer-${release.id}`,
      name: release.title || 'Unknown Release',
      artists: [
        {
          name: release.artist?.name || 'Unknown Artist'
        }
      ],
      images: release.cover_big ? [
        {
          url: release.cover_big,
          height: 500,
          width: 500
        },
        {
          url: release.cover_medium || release.cover_big,
          height: 250,
          width: 250
        },
        {
          url: release.cover_small || release.cover_medium || release.cover_big,
          height: 56,
          width: 56
        }
      ] : [],
      release_date: release.release_date || 'Unknown',
      total_tracks: release.nb_tracks || null,
      external_urls: {
        deezer: release.link
      },
      // Additional Deezer metadata
      genre: release.genres?.data?.[0]?.name,
      duration: release.duration,
      fans: release.fans
    };
  }

  // Search for albums (bonus feature)
  async searchAlbums(query, limit = 20) {
    try {
      const response = await axios.get(`${this.baseURL}/search/album`, {
        params: {
          q: query,
          limit: limit
        },
        timeout: 10000
      });

      const albums = response.data.data || [];
      
      return {
        albums: {
          items: albums.map(album => this.transformReleaseData(album))
        }
      };
    } catch (error) {
      console.error('Error searching Deezer:', error);
      throw new Error('Failed to search Deezer');
    }
  }
}

export default new DeezerService();
