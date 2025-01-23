import { StyleSheet, Image, Platform, SafeAreaView } from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'

export default function TabTwoScreen() {
  return (
    <SafeAreaView
      className='w-full h-full relative box-border'
    >
      <Image
        // TODO: Update background later
        className='w-full h-full object-cover absolute top-16'
        source={require('@/assets/images/secondary-bg.png')}
      />
      <ThemedView className='!bg-green-600 !backdrop-blur-sm flex flex-row items-center rounded-md w-fit m-2'>
        <ThemedText type="subtitle" className='p-3'>Rút Quẻ May Mắn</ThemedText>
      </ThemedView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    // objectFit: "cover",
    top: 0,
    left: 0,
    position: 'absolute',
  },
})
