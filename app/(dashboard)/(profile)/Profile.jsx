import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '../../AuthContext'
import { useRouter } from 'expo-router'

const Profile = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      
      <View style={styles.infoSection}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{user?.username}</Text>
        
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user?.email}</Text>
        
        <Text style={styles.label}>Display Name:</Text>
        <Text style={styles.value}>{user?.display_name}</Text>
        
        <Text style={styles.label}>Country:</Text>
        <Text style={styles.value}>{user?.country}</Text>
        
        <Text style={styles.label}>Notifications:</Text>
        <Text style={styles.value}>{user?.notification_enabled ? 'Enabled' : 'Disabled'}</Text>
        
        <Text style={styles.label}>Email Notifications:</Text>
        <Text style={styles.value}>{user?.email_notifications ? 'Enabled' : 'Disabled'}</Text>
        
        <Text style={styles.label}>Push Notifications:</Text>
        <Text style={styles.value}>{user?.push_notifications ? 'Enabled' : 'Disabled'}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoSection: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 'auto',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
})