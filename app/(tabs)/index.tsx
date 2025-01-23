import { Image, StyleSheet, View, Text, Pressable, TouchableOpacity, Animated } from 'react-native'

import { HelloWave } from '@/components/HelloWave'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useRef, useState } from 'react'
type Edge = {
  id: string,
  money: number,
}
const mockEdges: Edge[] = [
  { id: "10", money: 10000 },
  { id: "20", money: 20000 },
  { id: "50", money: 50000 },
  { id: "30", money: 30000 },
]
const Circle = () => {
  const [edges, setEdges] = useState<Edge[]>(mockEdges)
  const [randomDegree, setRandomDegree] = useState(360)
  const spinValue = useRef(new Animated.Value(0)).current


  const startSpinAnimation = () => {
    spinValue.setValue(0)
    const luckyNumber = Math.floor(Math.random() * edges.length)
    setRandomDegree(luckyNumber + 1)
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 6000,
      useNativeDriver: true,
    }).start()
  }

  // Interpolate the spin value to create a spin animation
  const spin = spinValue.interpolate({
    inputRange: [0, 1], // From 0 to 1
    // 90 deg for every node
    outputRange: ['0deg', `${90 * randomDegree + (1440 * 3) - 45}deg`], // From 0 degrees to 360 degrees
  })

  return (
    <ThemedView className='mx-auto mt-14 relative'>
      <View className='w-[340px] h-[340px] relative'>
        <Animated.View style={[{ transform: [{ rotate: spin }] }]} className={`w-[340px] h-[340px] bg-green-600 flex flex-wrap rounded-full overflow-hidden`}>
          {edges.map(edge => {
            return (
              <View key={edge.id} className='w-[calc(340px/2)] h-[calc(340px/2)] border-red-600 border flex items-center justify-center'>
                <Text>
                  {edge.money}
                </Text>
              </View>
            )
          })}
        </Animated.View>
        <View className='absolute top-[47%] left-1/2 w-7 h-10 border-b-[35px] border-x-[12px] border-x-transparent rounded-full border-b-red-500 -translate-x-1/2 -translate-y-1/2'></View>
        {/* <View className='absolute top-1/2 left-1/2 w-2 h-7 border-b-[35px] border-x-[10px] border-x-transparent rounded-full border-b-red-500 -translate-x-1/2 -translate-y-1/2'></View> */}

      </View>
      <TouchableOpacity className='bg-green-600 border border-orange-400 p-4 flex items-center justify-center mt-5 rounded-lg' onPress={startSpinAnimation}>
        <Text className='text-xl font-bold color-yellow-300' >Quay</Text></TouchableOpacity>
    </ThemedView>
  )
}
export default function HomeScreen() {
  return (
    <SafeAreaView className='w-full h-full relative'>
      <Image
        // TODO: Update background later
        className='w-full h-full object-cover absolute top-16 left-0'
        source={require('@/assets/images/primary-bg.png')}
      />
      <ThemedView className='!bg-green-600 !backdrop-blur-sm flex flex-row items-center rounded-md w-fit m-2'>
        <ThemedText type='subtitle' className='p-3'>Vòng Quay May Mắn!</ThemedText>
        <HelloWave />
      </ThemedView>
      <Circle />

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
