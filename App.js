import { StatusBar } from 'expo-status-bar';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
// Using DB Reference
import { db } from './core/Config'

export default function App() {

  // Storing User Data
  const [userDoc, setUserDoc] = useState(null)
  // Update Text
  const [text, setText] = useState("")

  // MARK: CRUD Functions
  const Create = () => {
    // MARK: Creating New Doc in Firebase
    // Before that enable Firebase in Firebase Console
    const myDoc = doc(db, "koleksiyonum", "2g17hddQeRC2linDdvX8")

    // Your Document Goes Here
    const docData = {
      "name": "iJustine",
      "bio": "YouTuber"
    }

    setDoc(myDoc, docData)
      // Handling Promises
      .then(() => {
        // MARK: Success
        alert("varsayilan!")
      })
      .catch((error) => {
        // MARK: Failure
        alert(error.message)
      })
  }

  const Read = () => {
    // MARK: Reading Doc
    // You can read what ever document by changing the collection and document path here
    const myDoc = doc(db, "koleksiyonum", "2g17hddQeRC2linDdvX8")

    getDoc(myDoc)
      // Handling Promises
      .then((snapshot) => {
        // MARK: Success
        if (snapshot.exists) {
          setUserDoc(snapshot.data())
        }
        else {
          alert("Dokuman bulunamadi")
        }
      })
      .catch((error) => {
        // MARK: Failure
        alert(error.message)
      })

  }

  const Update = (value, merge) => {
    // MARK: Updating Doc
    const myDoc = doc(db, "koleksiyonum", "2g17hddQeRC2linDdvX8")

    // If you set merge true then it will merge with existing doc otherwise it will be a fresh one
    setDoc(myDoc, value, { merge: merge })
      // Handling Promises
      .then(() => {
        // MARK: Success
        alert("Guncelleme Basarili!")
        setText("")
      })
      .catch((error) => {
        // MARK: Failure
        alert(error.message)
      })
  }

  const Delete = () => {
    // MARK: Deleting Doc
    const myDoc = doc(db, "koleksiyonum", "2g17hddQeRC2linDdvX8")

    deleteDoc(myDoc)
      // Handling Promises
      .then(() => {
        // MARK: Success
        alert("Silme islemi basarili!")
      })
      .catch((error) => {
        // MARK: Failure
        alert(error.message)
      })

  }

  return (
    <View style={styles.container}>
      <Button title='Olustur' onPress={Create}></Button>
      <Button title='Dokumana bak' onPress={Read}></Button>
      {
        userDoc != null &&
        <Text>Bio: {userDoc.bio}</Text>
      }
      <TextInput style={{
        width: '95%',
        fontSize: 18,
        padding: 12,
        borderColor: 'gray',
        borderWidth: 0.2,
        borderRadius: 10,
        marginVertical: 20
      }} placeholder='Buraya yaz' onChangeText={(text) => { setText(text) }} value={text}></TextInput>

      <Button title='Guncelle' onPress={() => {
        Update({
          "bio": text
        }, true)
      }} disabled={text == ""}></Button>
      <Button title='Sil' onPress={Delete}></Button>
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
});