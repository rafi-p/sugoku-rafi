import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    // Button,
    TextInput,
    ActivityIndicator,
    Image,
    ImageBackground
  } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { fetchBoard} from '../store/index'
import { Button, Badge } from 'react-native-paper'
import win from '../assets/animation_500_ki708a4h.gif'
import imageBack from '../assets/kxUyuPU.png'

function Finish ({route, navigation}) {
    const dispatch = useDispatch()
    const name = useSelector((state) => state.name)

    const changeScreen = () => {
        navigation.navigate('Home')
        dispatch({type: 'SET_NAME', payload: ''})
        dispatch({type: 'SET_DIFFICULTY', payload: ''})
    }

    return (
        <ImageBackground source={imageBack} style={styles.container}>
            <Text style={{color: 'white', fontSize: 20}}>Congratulation!</Text>
                <Text style={{marginBottom: 7.5, marginTop: 7.5, fontWeight: 'bold', fontSize: 30, color: 'white'}}>{name}</Text>
            <Text style={{color: 'white', fontSize: 15}}>You win!</Text>
            <Image source={win} style={{width: 200, height: 200, marginTop: 90}}/>
            <Button title='Play Again' onPress={changeScreen} >Play Again?</Button>
        </ImageBackground>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '120%'
      }
})

export default Finish