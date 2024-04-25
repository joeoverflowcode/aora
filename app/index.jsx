import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { Redirect, router, Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../constants'
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';


export default function App() {

  const {isLoading , isLoggedIn } = useGlobalContext()
    if(!isLoading && isLoggedIn) return <Redirect href='/home' />
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: '100%'}}>
        <View className='w-full justify-center items-center h-full px-4'>
          < Image source={images.logo}
            className='w-[130px] h-[84px]'
            resizeMode='contain'
          />
          <Image
          source={images.cards}
          className="max-w[380px] w-full h-[300px]"
          resizeMode='contain'
          />

          <View className='relative mt-5'>
            <Text className='text-3xl text-white font-bold text-center'>
              Discover Endless Possibilities with{' '}
                <Text className='text-secondary-200'>
                  Aora
                </Text>
            </Text>
            
            <Image 
            source={images.path}
             className='w-[136px] h-[15px] absolute -bottom-4 -right-9'
            resizeMode='contain'
            />
          </View>

          <Text className='text-sm font-pregulat text-gray-100 mt-7 text-center'>Where creativity meets innovation: embark on journey of limitless exploration with Aora
          </Text>
          <CustomButton 
          title="Continue with Email"
          handlePress={()=> router.push('/sign-in')}
          containerStyles='w-full mt-7'
          />
          <Link href='/profile' className='pt-4 text-2xl text-secondary-200'>Go to Profile</Link>
        </View>
      </ScrollView>
      <StatusBar
        backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  )
}


