import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import image from '../assets/kxUyuPU.png'
import { fetchBoard, validateBoard, solveGame } from '../store/index'
import { Button, Snackbar, Badge } from 'react-native-paper'

function Board ({route, navigation}) {
  const dispatch = useDispatch()

  const visible = useSelector((state) => state.visible)
  const errText = useSelector((state) => state.errText)

  const onToggleSnackBar = () => dispatch ({ type: 'SET_VISIBLE', payload: !visible });

  const onDismissSnackBar = () => dispatch ({ type: 'SET_VISIBLE', payload: false });

  const board = useSelector((state) => state.data)
  const solveBoard = useSelector((state) => state.solveBoard)
  const input = useSelector((state) => state.input)
  const loading = useSelector((state) => state.loading)
  const loadingButton = useSelector((state) => state.loadingButton)
  const status = useSelector((state) => state.status)

  const name = useSelector((state) => state.name)
  const difficulty = useSelector((state) => state.difficulty)

  useEffect(() => {
      dispatch(fetchBoard(difficulty))
    }, [])

  const handleChangeText = (val, row, col) => {
    const newBoard = input
    newBoard[row][col] = Number(val)

    dispatch({ type: 'SET_NEW_INPUT', payload: newBoard})
  }

  const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

  const encodeParams = (params) =>
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');

  const validate = () => {
    let finalBoard;
    if(status === 'solved') {
      finalBoard = {
        board: board
      }
    } else {
      finalBoard = {
        board: input
      }
    }

    dispatch(validateBoard(encodeParams(finalBoard), navigation, name))
  }

  const solve = () => {
    const startBoard = {
      board: solveBoard
    }
    dispatch(solveGame(encodeParams(startBoard)))
  }

  return (
    <ImageBackground source={image} style={styles.container}>
      <Text style={styles.heading}>SUGOKU</Text>
      <View>
        <Badge style={{marginBottom: 7.5, width: 50, backgroundColor: 'black'}}>{name}</Badge>
      </View>

      {   loading === true &&
          <ActivityIndicator size="large" color="#7ea4b3"/>
      }

      { loading === false &&
          <View style={styles.board}>
            {board.map((el, rowIndex) => {
              return  <View style={ rowIndex === 2 || rowIndex === 5 ? styles.rowDouble : styles.row} key={rowIndex}>
                {el.map((ell, colIndex) => {
                  return <View style={ [colIndex === 2 || colIndex === 5 ? styles.columnDouble : styles.column, ell === 0 ? {backgroundColor:'white'} : {backgroundColor: '#e0d6ff'}]}
                  key={colIndex}>
                    <TextInput onChangeText={(val) => handleChangeText(val, rowIndex, colIndex)} keyboardType="number-pad" editable={ell === 0 ? true : false} maxLength={1}  style={{textAlign: 'center'}}>
                        {ell === 0 ? '' : ell}
                    </TextInput>
                  </View>
                })}
              </View>
            })}
          </View>
      }

      <View style={styles.rowBtn}>
        <Button title="Validate"  loading={loadingButton} onPress={validate} style={styles.textBtn}>{loadingButton === false ? 'Validate' : ''}</Button>


        <Button title="Solve" loading={loadingButton}  onPress={solve} style={styles.textBtn}>{loadingButton === false ? 'Solve' : ''}</Button>

      </View>
      <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
          label: 'Dismiss',
          onPress: () => {
              dispatch ({ type: 'SET_VISIBLE', payload: false })
          },
          }}>
          {errText}
      </Snackbar>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '120%'
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 35,
        marginBottom: 10,
        color: 'white'
    },
    board: {
        marginBottom: 15,
        borderWidth : 2,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowDouble: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth : 1.5
    },
    column: {
        width: 30,
        height: 30,
        borderWidth : .5
    },
    columnDouble: {
        width: 30,
        height: 30,
        backgroundColor: 'powderblue',
        borderTopWidth : .5,
        borderBottomWidth : .5,
        borderLeftWidth : .5,
        borderRightWidth : 2
    },
    buttonCustom: {

    },
    rowBtn: {
      flexDirection: 'row',
      marginTop: 5
    },
    textBtn: {
      color:"#709fb0",
      fontSize:8,
      textAlign: 'center'
    },
    pushBtn: {
      width: 100,
      height:35,
      alignItems:"center",
      justifyContent:"center",
      margin: 5,
  }
  });


export default Board