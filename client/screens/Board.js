import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { fetchBoard, validateBoard, solveGame } from '../store/index'

function Board ({route, navigation}) {

  const dispatch = useDispatch()

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
    <View style={styles.container}>
        <Text style={styles.heading}>SUGOKU</Text>
        <Text>Player name: {name}</Text>
        {   loading === true &&
            <ActivityIndicator size="large" color="#7ea4b3"/>
        }

        { loading === false &&
            <View style={styles.board}>
                {board.map((el, rowIndex) => {
                    return  <View style={ rowIndex === 2 || rowIndex === 5 ? styles.rowDouble : styles.row} key={rowIndex}>
                    {el.map((ell, colIndex) => {
                        return <View style={ colIndex === 2 || colIndex === 5 ? styles.columnDouble : styles.column}
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



            { loadingButton === true &&
                <ActivityIndicator  size="large" color="#7ea4b3"/>
            }
            { loadingButton === false &&
              <View style={styles.rowBtn}>
                <Button title="Validate"  onPress={validate} style={styles.textBtn}></Button>
                <Button title="Solve"  onPress={solve} style={styles.textBtn}></Button>
              </View>
            }


    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 35,
        marginBottom: 10
    },
    board: {
        marginBottom: 15,
        borderWidth : 2,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        // borderWidth : .5,
    },
    rowDouble: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth : 1.5
    },
    column: {
        width: 30,
        height: 30,
        backgroundColor: 'powderblue',
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
      fontSize:12
  }
  });


export default Board