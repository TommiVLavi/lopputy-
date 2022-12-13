import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { Button, Input, Icon, Dialog } from 'react-native-elements';
import * as SQLite from 'expo-sqlite'

export default function Form({ navigation }) {
    const [object, setObject] = useState({name: "", price: 0, address: "", phone: 0})
    const [contacts, setContacts] = useState([])

    const db = SQLite.openDatabase('ordersdatabase.db');

    const saveIt = () => {
        if (object.name == "") {
            Alert.alert("Laittaisitko nimen.")
        } else {
            db.transaction(
                tx => {
                    tx.executeSql('insert into shopping (name, price, address, phone) values (?, ?, ?, ?);',
                    [object.name, object.price, object.address, object.phone])
            }, console.log("Ei tallennettu"), stop )
        }
    }
    
    const stop = () => {
        setObject({name: "", price: 0, address: "", phone: 0})
        navigation.navigate('List')
    }

    const [visible2, setVisible2] = useState(false)
    const toggle2 = () => {
        setVisible2(!visible2)
        fetchContacts()
    }

    const renderContact = ({item}) => (
        <ListItem>
            <ListItem.Content>
                <ListItem.Title >
                    {item.phoneNumbers ? item.phoneNumbers[0].number : "No Number"}
                </ListItem.Title>

                <ListItem.Subtitle>{item.name}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )

    const fetchContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync()

        if (status === "granted") {
            const { data } = await Contacts.getContactsAsync(
                { fields: [Contacts.Fields.PhoneNumbers] }
            )
            console.log("Haettu")
            setContacts(data)
            console.log(contacts)
            
        } else {
            Alert.alert("Lupaa ei ole annettu")
        }
    }

    const error = () => {
        Alert.alert("Ei pystytty tallentamaan")
        console.log("Ei tallennettu")
    }

    return(
        <View>
            <Input
                placeholder='Ruoka'
                onChangeText={text => setObject({...object, name: text})}
                value={object.nimi}
            />

            <Input
                placeholder='Hinta'
                onChangeText={text => setObject({...object, price: text})}
                value={object.hinta}
            />

            <Input
                placeholder='Osoite'
                onChangeText={text => setObject({...object, address: text})}
                value={object.osoite}
                leftIcon={{ name: "sc-telegram", type: "evilicon"}}
            />

            <Input
                placeholder='Puhelin'
                onChangeText={text => setObject({...object, phone: text})}
                value={object.phone}
                leftIcon={{ name: "phone" }}
            />

            <Icon
                name='phone'
                onPress={toggle2}
            />

            <Button
                title="Tallenna"
                onPress={saveIt}
            />

            <Dialog
                isVisible={visible2}
            >
                <FlatList
                    style={{height: 500}}
                    keyExtractor={item => item.id}
                    data={contacts}
                    renderItem={renderContact}
                />

                <Dialog.Actions>
                    <Dialog.Button
                        title="Peru"
                        onPress={toggle2}
                    />
                </Dialog.Actions>
            </Dialog>
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
    input: {

    }
  });