import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { Button, ListItem, Icon, Header, Tooltip } from 'react-native-elements';
import * as SQLite from 'expo-sqlite'
import * as Contacts from 'expo-contacts'

export default function List({ navigation }) {
    const [object, setObject] = useState({name: "", price: 0, address: "", phone: 0})
    const [list, setList] = useState([])
    const db = SQLite.openDatabase('ordersdatabase.db');

    useEffect(() => {
        console.log("Paivitys")
        db.transaction(tx => {
            tx.executeSql('create table if not exists shopping (id integer primary key not null, name text, price text, address text, phone text);')
        }, console.log("Ei luotu"), updateList )
        
    }, []);

    const deleteIt = (id) => {
        console.log(id)
        db.transaction(
            tx => {
                tx.executeSql('delete from shopping where id = ?;', [id]);
            },console.log("Ei poistettu") , updateList
        )
    }

    const updateList = () => {
        console.log("Paivitys") 

        db.transaction(
            tx => {
                tx.executeSql('select * from shopping', [], (_, { rows }) => {
                    setList(rows._array)
                    console.log(list)
                })
            }
        )
    }

    const [delButton, setDelButton] = useState(true)
    const toggle = () => {
        setDelButton(!delButton)
    }

    const renderItem = ({item}) => (
        <ListItem>
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.price} €</ListItem.Subtitle>
            </ListItem.Content>

            { !delButton ? <Icon onPress={() => deleteIt(item.id)} 
                                size={35} 
                                name="delete" 
                                color="red"/> 
                            : null}
            {delButton && (
                <ListItem.Chevron onPress={() => navigation.navigate("Map")} 
                    disabled={!delButton} 
                    size={30} >
                </ListItem.Chevron>
            )}
        </ListItem>
    )

    return(
        <View style={styles.container}>
            <FlatList
                style={styles.table}
                keyExtractor={item => item.id}
                data={list}
                renderItem={renderItem}
                placeholder="Nothing"
            />

            
            <Header>
                <Button
                    title="Kartta"
                    onPress={() => navigation.navigate('Map')}
                />

                <Button
                    title="Lisaa"
                    onPress={() => navigation.navigate('Form')}
                />

                { delButton ? <Button
                                title="Delete"
                                onPress={toggle}
                                /> : <Button
                                title="DELETE"
                                onPress={toggle}
                                color="secondary"/> }
                
            </Header>

            <StatusBar style='auto'/>
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
    table: {
        width:400
    },
    buttons: {
        margin: 20,
    }
  });