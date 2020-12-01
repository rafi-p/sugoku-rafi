import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    ActivityIndicator,
    TouchableOpacity,
    ImageBackground,
    Image
  } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import image from '../assets/wave.svg'

function Home ({navigation}) {
    const [loadingPlay, setLoadingPlay] = useState(false)
    const [text, setText] = useState('')

    const dispatch = useDispatch()
    const difficulty = useSelector((state) => state.difficulty)

    const changeScreen = () => {

        console.log(loadingPlay)
        if(!text) {
            alert('Name is required')

        } else {
            navigation.navigate('Game')
            setText('')

        }

    }

    const setDifficulty = (dif) => {
        console.log(dif)
        dispatch({type: 'SET_DIFFICULTY', payload: dif})
        // setDif(true)
    }

    const handleChangeText = (val) => {

        dispatch({type: 'SET_NAME', payload: val})
        setText(val)
      }

    return (
        <View style={styles.container}>

                <Text style={styles.heading}>SUGOKU</Text>
                    <TextInput value={text} onChangeText={(val) => handleChangeText(val)} style={styles.inputText} placeholder='Your name' >
                </TextInput>

                { difficulty !== '' && loadingPlay === false &&
                    <TouchableOpacity style={styles.pushPlay}>
                        <Text title='Play' onPress={changeScreen} style={styles.textPlay}>Play</Text>
                    </TouchableOpacity>
                }

                {loadingPlay === true &&
                    <ActivityIndicator  size="large" color="#7ea4b3"/>
                }

                <Text style={{fontSize: 12, color: '#838383'}}>Choose difficulties:</Text>
                <View style={styles.rowBtn}>

                    <TouchableOpacity style={styles.pushBtn}>
                        <Text title='Easy' onPress={() => setDifficulty('easy')} style={styles.textBtn}>Easy</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.pushBtn}>
                        <Text title='Medium' onPress={() => setDifficulty('medium')} style={styles.textBtn}>Medium</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.pushBtn}>
                        <Text title='Hard' onPress={() => setDifficulty('hard')} style={styles.textBtn}>Hard</Text>
                    </TouchableOpacity>


                </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    inputText: {
        textAlign: 'center',
        borderWidth: 1,
        width: 250,
        padding: 0,
        marginBottom: 10,
        height: 50,
        borderRadius:25,
        fontSize: 20,
        marginTop: 20
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 40,
        marginBottom: 10
    },
    pushBtn: {
        width: 75,
        // backgroundColor:"#fb5b5a",
        borderWidth: 1,
        borderRadius:5,
        height:35,
        alignItems:"center",
        justifyContent:"center",
        // marginTop:20,
        // marginBottom:10
        margin: 5,
        borderColor: '#f4f4f4'
    },
    textBtn: {
        color:"#709fb0",
        fontSize:12
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
        fontSize:20
    }
})

export default Home