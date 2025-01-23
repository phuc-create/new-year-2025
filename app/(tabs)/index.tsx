import { Image, StyleSheet, Platform } from 'react-native'

import { HelloWave } from '@/components/HelloWave'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  return (
    <SafeAreaView
      className='w-full h-full relative'
    // headerBackgroundColor={{ light: '#902b34', dark: '#902b34' }}
    // headerImage={}
    >
      <Image
        // TODO: Update background later
        className='w-full h-full object-cover absolute top-16 left-0'
        source={require('@/assets/images/primary-bg.png')}
      />
      <ThemedView className='!bg-green-600 !backdrop-blur-sm flex flex-row items-center rounded-md w-fit m-2'>
        <ThemedText type='subtitle' className='p-3'>Vòng Quay May Mắn!</ThemedText>
        <HelloWave />
      </ThemedView>

    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    top: 0,
    left: 0,
    position: 'absolute',
  },
})
