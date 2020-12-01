import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    ActivityIndicator
  } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { fetchBoard} from '../store/index'

function Finish ({route, navigation}) {
    const dispatch = useDispatch()
    const name = useSelector((state) => state.name)
    // const difficulty = useSelector((state) => state.difficulty)

    const changeScreen = () => {
        navigation.navigate('Home')
        // dispatch(fetchBoard(difficulty))
        dispatch({type: 'SET_NAME', payload: ''})
        dispatch({type: 'SET_DIFFICULTY', payload: ''})
    }

    return (
        <View style={styles.container}>
            <Text>Congratulation {name}, you win!</Text>
            <Button title='Play Again' onPress={changeScreen} />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }
})

export default Finish