import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
    ImageBackground,
    Image
  } from 'react-native';
import { useSelector, useDispatch, Title } from 'react-redux'
import image from '../assets/kxUyuPU.png'
import sudoku from '../assets/sudoku.png'
import { RadioButton, Button, TextInput, Snackbar } from 'react-native-paper'

function Home ({navigation}) {
    const [loadingPlay, setLoadingPlay] = useState(false)
    const [text, setText] = useState('')
    const [visible, setVisible] = useState(false);
    const [errText, setError] = useState('')

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    const dispatch = useDispatch()
    const difficulty = useSelector((state) => state.difficulty)

    const changeScreen = () => {

        console.log(loadingPlay)
        if(!text) {

            setError('Name is required')
            setVisible(true)
        } else if (!difficulty) {

            setError('Choose your difficulty level')
            setVisible(true)
        } else {
            navigation.navigate('Game')
            setText('')

        }

    }

    const setDifficulty = (dif) => {
        console.log(dif)
        dispatch({type: 'SET_DIFFICULTY', payload: dif})

    }

    const handleChangeText = (val) => {

        dispatch({type: 'SET_NAME', payload: val})
        setText(val)
      }

    return (

        <ImageBackground source={image} style={styles.container}>




            <Image source={sudoku} style={{width: 150, height: 150}}/>

            <Text style={styles.heading}>SUGOKU</Text>

            <TextInput mode='outlined' label='Name' value={text} onChangeText={(val) => handleChangeText(val)} style={styles.inputText} placeholder='Your name' >
            </TextInput>

            <Button loading={loadingPlay} title='Play' onPress={changeScreen} style={styles.textPlay}>Play</Button>


            <Text style={{fontSize: 12, color: '#838383'}}>Choose difficulties:</Text>
            <View style={styles.rowBtn}>

                <RadioButton.Item
                    value="easy"
                    status={ difficulty === 'easy' ? 'checked' : 'unchecked' }
                    onPress={() => setDifficulty('easy')}
                    label='Easy'
                    labelStyle={styles.textBtn}
                    color='#726a95'
                />

                <RadioButton.Item
                    value="medium"
                    status={ difficulty === 'medium' ? 'checked' : 'unchecked' }
                    onPress={() => setDifficulty('medium')}
                    label='Medium'
                    labelStyle={styles.textBtn}
                    color='#726a95'
                />

                <RadioButton.Item
                    value="hard"
                    status={ difficulty === 'hard' ? 'checked' : 'unchecked' }
                    onPress={() => setDifficulty('hard')}
                    label='Hard'
                    labelStyle={styles.textBtn}
                    color='#726a95'
                />

            </View>

            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                label: 'Dismiss',
                onPress: () => {
                    setVisible(false)
                },
                }}>
                {errText}
            </Snackbar>
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
        height: '120%',
        fontFamily: 'poppins-regular'
      },
    inputText: {
        textAlign: 'center',
        width: 250,
        padding: 0,
        marginBottom: 10,
        height: 50,
        fontSize: 20,
        marginTop: 0
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 40,
        marginBottom: 10,
        color: 'black',
        marginTop: 80,
        marginBottom: 20
    },
    pushBtn: {
        width: 75,
        borderWidth: 1,
        borderRadius:5,
        height:35,
        alignItems:"center",
        justifyContent:"center",
        margin: 5,
        borderColor: '#f4f4f4'
    },
    textBtn: {
        color:"#838383",
        fontSize:12,
    },
    rowBtn: {
        flexDirection: 'row',
        marginTop: 5
    },
    pushPlay: {
        width: 250,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#709fb0",
        borderRadius:25,
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 20
    },
    textPlay: {
        color:"white",
        fontSize:20,
        width: 250,
        marginTop: 10,
        marginBottom: 20
    }
})

export default Home