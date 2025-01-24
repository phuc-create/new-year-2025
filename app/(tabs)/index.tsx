import { View, Text, TouchableOpacity, Animated, Image } from 'react-native'

import { HelloWave } from '@/components/HelloWave'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useRef, useState } from 'react'
import Svg, { G, Path, Text as SvgText } from 'react-native-svg'
type Edge = {
  id: string,
  money: number,
}
const mockEdges: Edge[] = [
  { id: "10", money: 10000 },
  { id: "20", money: 20000 },
  { id: "50", money: 50000 },
  { id: "30", money: 30000 },
  { id: "100", money: 100000 },
  { id: "500", money: 500000 },
]

const colorPalette2025 = [
  "#D2042D", // Cherry Red
  "#6B498F", // Aura Indigo
  "#7E9B76", // Dill Green
  "#D2C1A5", // Alpine Oat
  "#8B645A", // Mocha Mousse
  "#A3B5C9", // Serene Blues and Greens
]

interface WheelSegmentProps {
  angle: number,
  money: number,
  radius: number,
  index: number,
  d: string
}

const WheelSegment = ({ d, angle, money, radius, index }: WheelSegmentProps) => {
  const color = colorPalette2025[Math.floor(Math.random() * colorPalette2025.length)]
  const labelAngle = (index * angle) + angle / 2
  const radians = (labelAngle * Math.PI) / 180
  const labelX = radius + (radius / 1.5) * Math.cos(radians)
  const labelY = radius - (radius / 1.5) * Math.sin(radians)
  return (
    <G>
      <Path d={d} fill={color} />
      <SvgText
        fill="yellow"
        fontSize={14}
        fontWeight={700}
        x={labelX}
        y={labelY}
        textAnchor="middle"
        strokeWidth={2}
        rotation={(angle / 2) * (index * angle)}
      >
        {money.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
      </SvgText>
    </G>
  )
}

const Wheel = () => {
  const [edges, setEdges] = useState<Edge[]>(mockEdges)
  const [randomDegree, setRandomDegree] = useState(360)
  const spinValue = useRef(new Animated.Value(0)).current


  const startSpinAnimation = () => {
    spinValue.setValue(0)
    const luckyNumber = Math.floor(Math.random() * edges.length)
    setRandomDegree(luckyNumber + 1)
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 7000,
      useNativeDriver: true,
    }).start()
  }

  const spin = spinValue.interpolate({
    inputRange: [0, 1], // From 0 to 1
    // 90 deg for every node
    outputRange: ['0deg', `${(360 / edges.length) * randomDegree + (1440 * 3) - (360 / edges.length)}deg`],
  })
  const radius = 340 / 2 // Radius of the wheel
  const segments = edges.length // Total number of segments
  const angle = 360 / segments // Angle per segment

  const getWedgePath = (startAngle: number, endAngle: number) => {
    const startRadians = (startAngle * Math.PI) / 180
    const endRadians = (endAngle * Math.PI) / 180

    const x1 = radius + radius * Math.cos(startRadians)
    const y1 = radius - radius * Math.sin(startRadians)

    const x2 = radius + radius * Math.cos(endRadians)
    const y2 = radius - radius * Math.sin(endRadians)

    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0

    return `M${radius},${radius} L${x1},${y1} A${radius},${radius} 0 ${largeArcFlag},0 ${x2},${y2} Z`
  }
  /**
   * 1 => 20.000
   * 2 => 50.000
   * 3 => 30.000
   * 4 => 100.000
   * 5 => 500.000
   * 6 => 10.000
   */
  return (
    <ThemedView className='mx-auto mt-14 relative !bg-none'>
      {/* Wrapper */}
      <View className='w-[340px] h-[340px] relative !bg-none'>
        {/* Wheel */}
        <Animated.View style={[{ transform: [{ rotate: spin }], position: "relative" }]} className={`w-[340px] h-[340px] bg-green-600 flex flex-wrap rounded-full overflow-hidden relative flex-1 border-yellow-200 border-2 shadow-lg !bg-none`}>
          <Svg width={radius * 2} height={radius * 2} className='shadow-lg'>
            {edges.map((edge, i) => {
              const startAngle = i * angle
              const endAngle = (i + 1) * angle
              return (
                <WheelSegment
                  key={edge.id}
                  angle={angle}
                  d={getWedgePath(startAngle, endAngle)}
                  money={edge.money}
                  radius={radius}
                  index={i}
                />
              )
            })}
          </Svg>
        </Animated.View>
        <View className='absolute top-[47%] left-1/2 w-7 h-10 border-b-[35px] border-x-[12px] border-x-transparent rounded-full border-b-red-500 -translate-x-1/2 -translate-y-1/2'></View>

      </View >
      <TouchableOpacity className='bg-green-600 border border-orange-400 p-4 flex items-center justify-center mt-5 rounded-lg' onPress={startSpinAnimation}>
        <Text className='text-xl font-bold color-yellow-300' >Quay</Text></TouchableOpacity>
    </ThemedView >
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
      <Wheel />

    </SafeAreaView >
  )
}

